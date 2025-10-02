import os
import json
import requests
from typing import List, Dict
from websocket_manager import manager
import zipfile
import io
import shutil
import asyncio
import subprocess
import re
import logging

logger = logging.getLogger(__name__)

# --- Helper Functions ---

def find_package_json_path(root_dir: str) -> str | None:
    for root, _, files in os.walk(root_dir):
        if "package.json" in files:
            return os.path.join(root, "package.json")
    return None

def count_component_files(root_dir: str) -> int:
    count = 0
    file_extensions_to_check = ('.jsx', '.tsx')
    for root, _, files in os.walk(root_dir):
        if 'node_modules' in root or '.git' in root:
            continue
        for file_name in files:
            if file_name.endswith(file_extensions_to_check):
                count += 1
    return count

def run_command(command: str, cwd: str = None, capture_output: bool = True) -> Dict[str, any]:
    """
    Synchronous version of run_command for simple operations.
    Used by refactor_service.py for basic command execution.
    """
    try:
        logger.info(f"Running command: {command} in {cwd}")
        result = subprocess.run(
            command,
            shell=True,
            cwd=cwd,
            capture_output=capture_output,
            text=True,
            timeout=60  # Increased timeout
        )
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout if capture_output else "",
            "stderr": result.stderr if capture_output else "",
            "return_code": result.returncode
        }
    except subprocess.TimeoutExpired:
        logger.error("Command timed out")
        return {
            "success": False,
            "stdout": "",
            "stderr": "Command timed out",
            "return_code": -1
        }
    except Exception as e:
        logger.error(f"Command failed: {e}")
        return {
            "success": False,
            "stdout": "",
            "stderr": str(e),
            "return_code": -1
        }

async def run_command_streamed(command: list, cwd: str, exec_id: str):
    """
    Runs a shell command and streams its stdout/stderr to the client in real-time.
    Returns the full stdout, stderr, and exit code upon completion.
    """
    logger.info(f"Streaming command: {' '.join(command)} in {cwd}")
    try:
        process = await asyncio.create_subprocess_shell(
            ' '.join(command),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=cwd
        )

        stdout_lines = []
        stderr_lines = []

        async def read_stream(stream, line_list, status_type):
            while True:
                line_bytes = await stream.readline()
                if not line_bytes:
                    break
                line = line_bytes.decode('utf-8').strip()
                if line:  # Only add non-empty lines
                    line_list.append(line)
                    # Send each line to the frontend as a minor log
                    await manager.send_json(exec_id, {"type": "log", "status": status_type, "message": line})

        # Run stream readers concurrently
        await asyncio.gather(
            read_stream(process.stdout, stdout_lines, "info"),
            read_stream(process.stderr, stderr_lines, "warning")
        )

        await process.wait()
        
        full_stdout = "\n".join(stdout_lines)
        full_stderr = "\n".join(stderr_lines)
        
        if process.returncode != 0:
            logger.error(f"Command failed with exit code {process.returncode}: {full_stderr}")

        return full_stdout, full_stderr, process.returncode
    except Exception as e:
        logger.error(f"Error running streamed command: {e}")
        return "", str(e), -1

def find_project_root(temp_dir: str) -> str | None:
    """Finds the directory containing package.json."""
    for root, _, files in os.walk(temp_dir):
        if "package.json" in files:
            return root
    return None

def get_latest_version(pkg_name: str) -> str:
    try:
        url = f"https://registry.npmjs.org/{pkg_name}/latest"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return resp.json()["version"]
    except requests.RequestException as e:
        logger.error(f"Failed to get latest version for {pkg_name}: {e}")
        return "N/A"

def get_priority(current: str, latest: str) -> str:
    if latest == "N/A":
        return "Won't have"
    try:
        cur = [int(x) for x in current.lstrip("^~").split(".")]
        lat = [int(x) for x in latest.lstrip("^~").split(".")]
        while len(cur) < 3: cur.append(0)
        while len(lat) < 3: lat.append(0)
        if cur[0] < lat[0]: return "Must have"
        elif cur[1] < lat[1]: return "Should have"
        elif cur[2] < lat[2]: return "Could have"
        else: return "Won't have"
    except (ValueError, IndexError):
        return "Won't have"

def parse_superseded_warnings(stderr: str) -> dict:
    """Parses npm stderr for 'superceded by' warnings and returns a map."""
    superseded_map = {}
    pattern = re.compile(r"deprecated\s+(@[a-z0-9-~._/]+|[a-z0-9-~._]+)@[\d.-]+:\s+This package is superceded by\s+(@[a-z0-9-~._/]+|[a-z0-9-~._]+)")
    for line in stderr.splitlines():
        match = pattern.search(line)
        if match:
            old_pkg = match.group(1).strip()
            new_pkg = match.group(2).strip()
            superseded_map[old_pkg] = new_pkg
            logger.info(f"Detected superseded package: {old_pkg} -> {new_pkg}")
    return superseded_map

def analyze_dependencies(project_root: str) -> Dict[str, any]:
    """
    Analyzes project dependencies and returns outdated packages.
    This is a simplified version for use without WebSocket streaming.
    """
    try:
        package_json_path = os.path.join(project_root, "package.json")
        if not os.path.exists(package_json_path):
            return {"error": "No package.json found"}
        
        with open(package_json_path, 'r', encoding='utf-8') as f:
            package_info = json.load(f)
        
        # Run npm outdated to get outdated packages
        result = run_command("npm outdated --json", cwd=project_root)
        
        outdated_packages = {}
        if result["success"] and result["stdout"]:
            try:
                outdated_packages = json.loads(result["stdout"])
            except json.JSONDecodeError:
                pass
        
        return {
            "current_dependencies": package_info.get("dependencies", {}),
            "dev_dependencies": package_info.get("devDependencies", {}),
            "outdated_packages": outdated_packages
        }
    except Exception as e:
        logger.error(f"Error analyzing dependencies: {e}")
        return {"error": str(e)}

# --- Main Analysis Service (Improved Error Handling) ---

async def run_project_analysis(exec_id: str, zip_bytes: bytes, temp_dir: str):
    major_step_message = "Project Analysis & Upgrade Plan"
    
    try:
        await manager.send_json(exec_id, {"type": "major_step_start", "message": major_step_message})
        logger.info(f"Starting project analysis for exec_id: {exec_id}")
        
        # --- Unzip Project ---
        if os.path.exists(temp_dir): 
            shutil.rmtree(temp_dir)
        os.makedirs(temp_dir, exist_ok=True)
        
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Unzipping project..."})
        
        with zipfile.ZipFile(io.BytesIO(zip_bytes)) as z:
            z.extractall(temp_dir)
        
        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": "Project unzipped successfully."})

        project_root = find_project_root(temp_dir)
        if not project_root:
            raise FileNotFoundError("No package.json found in the project.")

        logger.info(f"Found project root: {project_root}")

        # --- Check if Node.js and npm are available ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Checking Node.js and npm availability..."})
        
        # Check Node.js
        node_check = run_command("node --version", cwd=project_root)
        if not node_check["success"]:
            await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": "Node.js not found. Installing dependencies may not work properly."})
        else:
            await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"Node.js version: {node_check['stdout'].strip()}"})

        # Check npm
        npm_check = run_command("npm --version", cwd=project_root)
        if not npm_check["success"]:
            await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": "npm not found. Using fallback analysis method."})
            # Use fallback method
            await fallback_analysis(exec_id, project_root)
            return
        else:
            await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"npm version: {npm_check['stdout'].strip()}"})

        # --- Step 1: Try npm-check-updates with better error handling ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Analyzing dependencies with npm-check-updates..."})
        
        upgraded_deps = {}
        try:
            # Try npx first
            ncu_command = ["npx", "--yes", "npm-check-updates", "--jsonUpgraded"]
            ncu_proc = await asyncio.create_subprocess_shell(
                ' '.join(ncu_command), 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                cwd=project_root
            )
            stdout_bytes, stderr_bytes = await ncu_proc.communicate()
            stdout, stderr = stdout_bytes.decode(), stderr_bytes.decode()
            
            if ncu_proc.returncode != 0:
                logger.warning(f"npm-check-updates failed: {stderr}")
                await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": f"npm-check-updates failed: {stderr[:200]}..."})
                
                # Try alternative: npm outdated
                await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Trying alternative method with npm outdated..."})
                outdated_result = run_command("npm outdated --json", cwd=project_root)
                
                if outdated_result["success"] and outdated_result["stdout"]:
                    try:
                        outdated_data = json.loads(outdated_result["stdout"])
                        for pkg, info in outdated_data.items():
                            if isinstance(info, dict) and "wanted" in info:
                                upgraded_deps[pkg] = info["wanted"]
                    except json.JSONDecodeError:
                        pass
            else:
                try:
                    upgraded_deps = json.loads(stdout) if stdout.strip() else {}
                except json.JSONDecodeError:
                    await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": "Could not parse npm-check-updates output."})
                    
        except Exception as e:
            logger.error(f"Error running npm-check-updates: {e}")
            await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": f"npm-check-updates error: {str(e)}"})

        # --- Read package.json for current dependencies ---
        deprecated_deps = []
        try:
            with open(os.path.join(project_root, "package.json"), "r") as f:
                pkg_data = json.load(f)
                all_deps = {**(pkg_data.get("dependencies", {})), **(pkg_data.get("devDependencies", {}))}

            # If we got upgrade info, process it
            if upgraded_deps:
                for name, latest_version in upgraded_deps.items():
                    current_version = all_deps.get(name, "N/A")
                    priority = get_priority(current_version, latest_version)
                    deprecated_deps.append({
                        "name": name, 
                        "current": current_version, 
                        "latest": latest_version, 
                        "priority": priority
                    })
            else:
                # Fallback: check each dependency individually
                await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Checking individual packages for updates..."})
                for name, current_version in list(all_deps.items())[:10]:  # Limit to first 10 for speed
                    latest_version = get_latest_version(name)
                    if latest_version != "N/A":
                        priority = get_priority(current_version, latest_version)
                        if priority != "Won't have":
                            deprecated_deps.append({
                                "name": name,
                                "current": current_version,
                                "latest": latest_version,
                                "priority": priority
                            })

        except Exception as e:
            logger.error(f"Error reading package.json: {e}")
            await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"Error reading package.json: {str(e)}"})

        await manager.send_json(exec_id, {"type": "log", "status": "success", "message": f"Upgrade plan created. Found {len(deprecated_deps)} packages to upgrade."})

        # --- Step 2: Install Dependencies (simplified) ---
        await manager.send_json(exec_id, {"type": "log", "status": "loading", "message": "Installing original dependencies..."})
        
        # Clean install
        node_modules_path = os.path.join(project_root, 'node_modules')
        package_lock_path = os.path.join(project_root, 'package-lock.json')
        
        if os.path.exists(node_modules_path): 
            shutil.rmtree(node_modules_path)
        if os.path.exists(package_lock_path): 
            os.remove(package_lock_path)
        
        install_command = ["npm", "install", "--legacy-peer-deps"]
        try:
            _, install_stderr, install_returncode = await run_command_streamed(install_command, cwd=project_root, exec_id=exec_id)
            
            superseded_map = parse_superseded_warnings(install_stderr)
            if superseded_map:
                await manager.send_json(exec_id, {"type": "log", "status": "info", "message": f"Detected {len(superseded_map)} superseded packages."})
                # Add superseded packages to deprecated_deps
                for old_name, new_name in superseded_map.items():
                    existing_dep = next((dep for dep in deprecated_deps if dep["name"] == old_name), None)
                    new_pkg_latest_version = get_latest_version(new_name)

                    if existing_dep:
                        existing_dep["newName"] = new_name
                        existing_dep["latest"] = new_pkg_latest_version
                        existing_dep["priority"] = "Must have"
                    else:
                        current_version = all_deps.get(old_name, "N/A")
                        deprecated_deps.append({
                            "name": old_name, 
                            "current": current_version, 
                            "latest": new_pkg_latest_version,
                            "priority": "Must have", 
                            "newName": new_name,
                        })

            if install_returncode == 0:
                await manager.send_json(exec_id, {"type": "log", "status": "success", "message": "Dependencies installed successfully."})
            else:
                await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": "Some dependencies failed to install, but continuing..."})
                
        except Exception as e:
            logger.error(f"Error during npm install: {e}")
            await manager.send_json(exec_id, {"type": "log", "status": "warning", "message": f"Install failed: {str(e)}, but continuing with analysis..."})

        # --- Final Result ---
        component_file_count = count_component_files(project_root)
        dependency_count = len(all_deps) if 'all_deps' in locals() else 0

        await manager.send_json(exec_id, {
            "type": "phase_one_complete",
            "payload": {
                "componentFileCount": component_file_count,
                "dependencyCount": dependency_count,
                "deprecatedDependencies": sorted(
                    deprecated_deps, 
                    key=lambda x: ({"Must have": 1, "Should have": 2, "Could have": 3}.get(x['priority'], 99))
                )
            }
        })

        logger.info(f"Analysis complete for exec_id: {exec_id}")

    except Exception as e:
        logger.error(f"Error in project analysis: {e}")
        await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"An error occurred: {str(e)}"})
    finally:
        await manager.send_json(exec_id, {"type": "major_step_end", "message": major_step_message})

async def fallback_analysis(exec_id: str, project_root: str):
    """Fallback analysis method when npm tools are not available"""
    await manager.send_json(exec_id, {"type": "log", "status": "info", "message": "Using fallback analysis method..."})
    
    try:
        with open(os.path.join(project_root, "package.json"), "r") as f:
            pkg_data = json.load(f)
            all_deps = {**(pkg_data.get("dependencies", {})), **(pkg_data.get("devDependencies", {}))}
        
        deprecated_deps = []
        # Check first 5 packages to avoid timeout
        for name, current_version in list(all_deps.items())[:5]:
            latest_version = get_latest_version(name)
            if latest_version != "N/A":
                priority = get_priority(current_version, latest_version)
                if priority != "Won't have":
                    deprecated_deps.append({
                        "name": name,
                        "current": current_version,
                        "latest": latest_version,
                        "priority": priority
                    })
        
        component_file_count = count_component_files(project_root)
        
        await manager.send_json(exec_id, {
            "type": "phase_one_complete",
            "payload": {
                "componentFileCount": component_file_count,
                "dependencyCount": len(all_deps),
                "deprecatedDependencies": deprecated_deps
            }
        })
        
    except Exception as e:
        logger.error(f"Fallback analysis failed: {e}")
        await manager.send_json(exec_id, {"type": "log", "status": "error", "message": f"Fallback analysis failed: {str(e)}"})