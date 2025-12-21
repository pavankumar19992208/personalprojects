import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Amazon SDE Prep API"
    # These will now be read from your .env file
    MONGODB_URL: str
    DATABASE_NAME: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 1 week
    GOOGLE_API_KEY: Optional[str] = None 

    class Config:
        case_sensitive = True
        env_file = ".env"  # <--- Add this line to load the .env file
        extra = "ignore"
settings = Settings()