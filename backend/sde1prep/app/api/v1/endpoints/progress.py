from fastapi import APIRouter, Depends, HTTPException
from app.schemas.progress import ProgressUpdate, BookmarkUpdate
from app.services.progress_service import ProgressService
from app.core.security import settings
from jose import jwt
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user_email(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/sync")
async def sync_progress(
    update: ProgressUpdate, 
    email: str = Depends(get_current_user_email),
    service: ProgressService = Depends()
):
    await service.update_user_progress(email, update.topic_id, update.completed)
    return {"status": "success"}

# --- ADD THIS ENDPOINT ---
@router.post("/bookmark")
async def sync_bookmark(
    update: BookmarkUpdate,
    email: str = Depends(get_current_user_email),
    service: ProgressService = Depends()
):
    await service.update_user_bookmark(email, update.topic_id, update.page_index)
    return {"status": "success"}