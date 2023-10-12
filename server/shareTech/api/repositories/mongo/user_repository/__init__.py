import traceback
from typing import Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.repository_mixin import RepositoryMixin
from api.repositories.mongo.user_repository.entity import UserEntity
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection


class UserRepository(UserRepositoryIF, RepositoryMixin):
    _BASE_COLLECTION_NAME = "{}_users"

    def __init__(
        self,
        db: AsyncIOMotorClient = Depends(app_context.mongo_db_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._db = db
        self.logger = logger

    def _collection(self, organization: str) -> AsyncIOMotorCollection:
        return self._db[
            self._BASE_COLLECTION_NAME.format(organization.replace(".", "_"))
        ]

    async def find_by_email(
        self, organization: str, email: str
    ) -> Union[UserEntity, None]:
        try:
            document = await self._collection(organization).find_one({"email": email})
            if document:
                return UserEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return

    async def create(
        self,
        organization: str,
        organization_id: str,
        email: str,
        hashed_password: str,
        role: str,
        is_active: bool,
    ) -> UserEntity:
        document = {
            "email": email,
            "organization_id": organization_id,
            "password": hashed_password,
            "role": role,
            "is_active": is_active,
            **self.generate_initial_state(),
        }

        try:
            result = await self._collection(organization).insert_one(document)
            document["_id"] = result.inserted_id
            return UserEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def set_active(self, organization: str, id: str) -> UserEntity:
        try:
            result = await self._collection(organization).update_one(
                {"_id": ObjectId(id)}, {"$set": {"is_active": True}}
            )
            if result.modified_count == 1:
                modified_document = await self._collection(organization).find_one(
                    {"_id": ObjectId(id)}
                )
                return UserEntity(**modified_document)
            else:
                raise DatabaseException(detail="Target data does not exist.")
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
