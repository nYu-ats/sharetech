import traceback
from typing import Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.organization_repository.entity import OrganizationEntity
from api.repositories.mongo.organization_repository.interface import (
    OrganizationRepositoryIF,
)
from api.repositories.mongo.repository_mixin import RepositoryMixin
from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient


class OrganizationRepository(OrganizationRepositoryIF, RepositoryMixin):
    _COLLECTION_NAME = "organizations"

    def __init__(
        self,
        db: AsyncIOMotorClient = Depends(app_context.mongo_db_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._collection = db[self._COLLECTION_NAME]
        self.logger = logger

    async def find_by_id(self, id: str) -> Union[OrganizationEntity, None]:
        try:
            document = await self._collection.find_one({"_id": id})
            if document:
                return OrganizationEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return

    async def find_by_name(self, name: str) -> Union[OrganizationEntity, None]:
        try:
            document = await self._collection.find_one({"name": name})
            if document:
                return OrganizationEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return

    async def create(self, name: str, is_active: bool) -> OrganizationEntity:
        document = {
            "name": name,
            "is_active": is_active,
            **self.generate_initial_state(),
        }
        try:
            result = await self._collection.insert_one(document)
            document["_id"] = result.inserted_id
            return OrganizationEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def set_active(self, id: str) -> OrganizationEntity:
        try:
            result = await self._collection.update_one(
                {"_id": ObjectId(id)}, {"$set": {"is_active": True}}
            )
            if result.modified_count == 1:
                modified_document = await self._collection.find_one(
                    {"_id": ObjectId(id)}
                )
                return OrganizationEntity(**modified_document)
            else:
                raise DatabaseException(detail="Target data does not exist.")
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
