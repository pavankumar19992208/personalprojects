from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.chat_service import chat_service
import json

router = APIRouter()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """
    WebSocket endpoint for real-time chat.
    """
    await websocket.accept()
    try:
        while True:
            # 1. Receive message
            data = await websocket.receive_text()
            
            # 2. Parse (handle JSON or raw text)
            user_message = data
            try:
                json_data = json.loads(data)
                if isinstance(json_data, dict) and "message" in json_data:
                    user_message = json_data["message"]
            except json.JSONDecodeError:
                pass 

            if user_message:
                # 3. Stream response from Service
                async for chunk in chat_service.send_message_stream(client_id, user_message):
                    await websocket.send_json({
                        "type": "chunk",
                        "content": chunk
                    })
                
                # 4. Signal completion
                await websocket.send_json({
                    "type": "done",
                    "content": ""
                })
                
    except WebSocketDisconnect:
        print(f"Client #{client_id} disconnected")