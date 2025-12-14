from typing import Generic, TypeVar, List, Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorCollection
from bson import ObjectId

T = TypeVar('T')

class BaseRepository(Generic[T]):
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        result = await self.collection.insert_one(data)
        data["_id"] = result.inserted_id
        return data

    async def get_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        return await self.collection.find_one({"_id": ObjectId(id)})

    async def get_all(self) -> List[Dict[str, Any]]:
        return await self.collection.find().to_list(1000)

    async def update(self, id: str, data: Dict[str, Any]) -> bool:
        result = await self.collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        return result.modified_count > 0