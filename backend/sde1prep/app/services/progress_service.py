from app.repositories.user_repository import UserRepository

class ProgressService:
    def __init__(self):
        self.user_repo = UserRepository()

    async def update_user_progress(self, user_email: str, topic_id: str, completed: bool):
        user = await self.user_repo.get_by_email(user_email)
        if user:
            await self.user_repo.update_progress(user["_id"], topic_id, completed)
            return True
        return False

    # --- ADD THIS METHOD ---
    async def update_user_bookmark(self, user_email: str, topic_id: str, page_index: int):
        user = await self.user_repo.get_by_email(user_email)
        if user:
            await self.user_repo.update_bookmark(user["_id"], topic_id, page_index)
            return True
        return False