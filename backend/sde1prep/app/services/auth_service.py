from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserLogin
from app.core.security import get_password_hash, verify_password, create_access_token

class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    async def register_user(self, user_data: UserCreate):
        existing_user = await self.user_repo.get_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        user_dict = user_data.dict()
        user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
        user_dict["progress"] = {}
        user_dict["bookmarks"] = {}  # Initialize bookmarks
        
        await self.user_repo.create(user_dict)
        
        token = create_access_token({"sub": user_data.email})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user_data.dict(exclude={"password"}),
            "progress": {},
            "bookmarks": {}  # Return empty bookmarks
        }

    async def authenticate_user(self, login_data: UserLogin):
        user = await self.user_repo.get_by_email(login_data.email)
        if not user or not verify_password(login_data.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({"sub": user["email"]})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
            "progress": user.get("progress", {}),
            "bookmarks": user.get("bookmarks", {}) # Return stored bookmarks
}