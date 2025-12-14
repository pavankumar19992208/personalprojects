from app.repositories.base_repository import BaseRepository
from app.db.mongodb import db

class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(db.get_db().users)

    async def get_by_email(self, email: str):
        return await self.collection.find_one({"email": email})

    async def update_progress(self, user_id: str, topic_id: str, status: bool):
        key = f"progress.{topic_id}"
        await self.collection.update_one(
            {"_id": user_id},
            {"$set": {key: status}}
        )

    # --- ADD THIS METHOD ---
    async def update_bookmark(self, user_id: str, topic_id: str, page_index: int):
        key = f"bookmarks.{topic_id}"
        await self.collection.update_one(
            {"_id": user_id},
            {"$set": {key: page_index}}
        )