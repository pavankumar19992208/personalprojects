from pydantic import BaseModel

class ProgressUpdate(BaseModel):
    topic_id: str
    completed: bool

class BookmarkUpdate(BaseModel):
    topic_id: str
    page_index: int