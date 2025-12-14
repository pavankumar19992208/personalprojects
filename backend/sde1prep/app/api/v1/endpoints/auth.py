from fastapi import APIRouter, Depends
from app.schemas.user import UserCreate, UserLogin, Token
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/register", response_model=Token)
async def register(user: UserCreate, service: AuthService = Depends()):
    return await service.register_user(user)

@router.post("/login", response_model=Token)
async def login(user: UserLogin, service: AuthService = Depends()):
    return await service.authenticate_user(user)