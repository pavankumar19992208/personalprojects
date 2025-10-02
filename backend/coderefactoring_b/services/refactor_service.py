from websocket_manager import manager
import asyncio
import os
import json
import shutil
from services.analysis_service import find_project_root, run_command_streamed
from services.llm_service import get_package_docs, construct_refactor_prompt, call_llm_for_refactor


def count_lines_changed(original: str, refactored: str) -> int:
    """A simple line-by-line comparison to count changed lines."""
    original_lines = original.splitlines()
    refactored_lines = refactored.splitlines()
    # Using set for efficient lookup
    original_set = set(original_lines)
    # Count lines in refactored that are not in original
    return sum(1 for line in refactored_lines if line not in original_set)

async def run_package_refactoring(exec_id: str, packages: list, temp_dir: str):
    major_step_message = "Upgrading Selected Packages"
    project_root = find_project_root(temp_dir)
    if not project_root:
        raise FileNotFoundError("Could not find project root for refactoring.")

    try:
        await manager.send_json(exec_id, {"type": "major_step_start", "message": major_step_message})
        
        # --- Update package.json with all selected upgrades first ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Updating package.json with selected versions..."})
        package_json_path = os.path.join(project_root, 'package.json')
        with open(package_json_path, 'r+') as f:
            data = json.load(f)
            for package in packages:
                old_name = package['name']
                new_name = package.get('newName', old_name) # Use newName if it exists
                latest_version = package['latest']
                new_version = latest_version if str(latest_version).startswith('^') else f"^{latest_version}"

                # Remove old package from both dependency types
                if 'dependencies' in data and old_name in data['dependencies']:
                    del data['dependencies'][old_name]
                if 'devDependencies' in data and old_name in data['devDependencies']:
                    del data['devDependencies'][old_name]
                
                # Add the new (or updated) package. Assume 'dependencies' for superseded.
                if 'dependencies' not in data: data['dependencies'] = {}
                data['dependencies'][new_name] = new_version

            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()
        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": "package.json updated."})
        
        # --- Install all upgraded packages ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Installing upgraded dependencies..."})
        install_command = ["npm", "install", "--legacy-peer-deps"]
        
        # FIX: Use the async run_command_streamed which returns three values
        _, install_stderr, install_returncode = await run_command_streamed(install_command, cwd=project_root, exec_id=exec_id)
        
        if install_returncode != 0:
            await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"Failed to install upgraded dependencies: {install_stderr[:200]}..."})
            raise RuntimeError("Upgraded installation failed.")
        
        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": "Upgraded dependencies installed."})

        # --- LLM Refactoring Phase ---
        for package in packages:
            pkg_name = package.get('name')
            new_pkg_name = package.get('newName', pkg_name)
            
            log_message = f"Refactoring for {pkg_name}"
            if new_pkg_name != pkg_name:
                log_message += f" -> {new_pkg_name}"
            await manager.send_json(exec_id, {"type": "log", "status": "info", "message": log_message})
            
            relevant_files = []
            file_extensions = ('.js', '.jsx', '.ts', '.tsx')
            for root, _, files in os.walk(project_root):
                if 'node_modules' in root or '.git' in root:
                    continue
                for file in files:
                    if file.endswith(file_extensions):
                        file_path = os.path.join(root, file)
                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read()
                                # Check for old package name in content for refactoring
                                if pkg_name in content:
                                    relevant_files.append(file_path)
                        except Exception:
                            continue
            
            if not relevant_files:
                await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"No files found using {pkg_name}. Skipping refactor."})
                continue

            await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"Found {len(relevant_files)} files using {pkg_name}."})
            package_docs = get_package_docs(new_pkg_name)

            for i, file_path in enumerate(relevant_files):
                relative_path = os.path.relpath(file_path, project_root)
                await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": f"Refactoring {i+1}/{len(relevant_files)}: {relative_path}"})
                
                with open(file_path, 'r+', encoding='utf-8') as f:
                    original_content = f.read()
                    prompt = construct_refactor_prompt(relative_path, original_content, package, package_docs)
                    refactored_content = await call_llm_for_refactor(prompt, original_content)
                    if refactored_content != original_content:
                        lines_changed = count_lines_changed(original_content, refactored_content)
                        f.seek(0)
                        f.write(refactored_content)
                        f.truncate()
                        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": f"Refactored {relative_path} ({lines_changed} lines changed)."})
                    else:
                        await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"No changes needed for {relative_path}."})
                await asyncio.sleep(1) # Small delay to allow UI to update

        # --- Step 5: Automated Verification (Build Step) ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Verifying the upgrade by running the build command..."})
        build_command = ["npm", "run", "build"]
        
        # FIX: Use the async run_command_streamed for the build step as well
        _, build_stderr, build_returncode = await run_command_streamed(build_command, cwd=project_root, exec_id=exec_id)

        if build_returncode != 0:
            await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"Build failed after upgrade! Error: {build_stderr[:300]}..."})
            raise RuntimeError("Build verification failed. This is where the Repair Agent would take over.")
        
        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": "Build successful! The upgrade appears to be stable."})

        # --- Finalize and Zip ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Zipping upgraded project files..."})
        output_zip_path = f"./temp/{exec_id}-upgraded"
        shutil.make_archive(output_zip_path, 'zip', project_root)
        await manager.send_json(exec_id, {"type": "refactor_complete", "download_path": f"{output_zip_path}.zip"})

    except Exception as e:
        await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"An error occurred during refactoring: {e}"})
    finally:
        await manager.send_json(exec_id, {"type": "major_step_end", "message": major_step_message})