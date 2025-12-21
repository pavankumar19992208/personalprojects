from fastapi import APIRouter
from app.api.v1.endpoints import auth, progress, chat  # <--- Import chat

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"]) # <--- Add this# filepath: 