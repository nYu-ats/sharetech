from api.core.context import app_context
from api.core.context.logging import Logger
from api.repositories.mongo.user_repository.entity import UserEntity
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient


class UserRepository(UserRepositoryIF):
    _COLLECTION_NAME = "user"

    def __init__(
        self,
        db: AsyncIOMotorClient = Depends(app_context.mongo_db_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._collection = db[self._COLLECTION_NAME]
        self.logger = logger

    async def find_by_user_unique_id(self, id: str):
        document = await self._collection.find_one({"user_unique_id": id})
        if document:
            return UserEntity(**document)

        return
