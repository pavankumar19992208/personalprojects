from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from websocket_manager import manager
from services.analysis_service import run_project_analysis
from services.refactor_service import run_package_refactoring
import asyncio
import json
import shutil
import os
router = APIRouter()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    temp_dir = f"./temp/{client_id}"
    try:
        # --- Phase 1: Analysis ---
        await websocket.send_json({"type": "connection_ready"})
        zip_bytes = await websocket.receive_bytes()
        print("INFO:     File received, starting analysis task...")
        await run_project_analysis(client_id, zip_bytes, temp_dir)
        print("INFO:     Analysis phase complete. Waiting for upgrade instructions.")

        # --- Phase 2: Refactoring ---
        upgrade_data = await websocket.receive_text()
        payload = json.loads(upgrade_data)
        if payload.get("type") == "start_upgrade":
            packages_to_upgrade = payload.get("packages", [])
            print(f"INFO:     Received request to upgrade {len(packages_to_upgrade)} packages.")
            await run_package_refactoring(client_id, packages_to_upgrade, temp_dir)
            print("INFO:     Refactoring phase complete.")

    except WebSocketDisconnect:
        print(f"INFO:     Client {client_id} disconnected.")
    except Exception as e:
        print(f"ERROR:    An unexpected error occurred: {e}")
        await manager.send_json(client_id, {"type": "log", "status": "error", "message": str(e)})
    finally:
        manager.disconnect(client_id)
        # Final cleanup of the temporary directory
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
            print(f"INFO:     Cleaned up temp directory: {temp_dir}")
        print(f"INFO:     Connection closed for client {client_id}.")