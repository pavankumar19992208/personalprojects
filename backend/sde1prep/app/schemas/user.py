from pydantic import BaseModel, EmailStr
from typing import Dict

class UserBase(BaseModel):
    email: EmailStr
    name: str
    target_date: str
    experience_level: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(UserBase):
    hashed_password: str
    progress: Dict[str, bool] = {}
    bookmarks: Dict[str, int] = {}  # <--- ADD THIS

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserBase
    progress: Dict[str, bool]
    bookmarks: Dict[str, int] = {}  # <--- ADD THIS