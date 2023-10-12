import traceback
from datetime import datetime
from typing import Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.activation_token_repository.entity import (
    ActivationTokenEntity,
)
from api.repositories.mongo.activation_token_repository.interface import (
    ActivationTokenRepositoryIF,
)
from api.repositories.mongo.repository_mixin import RepositoryMixin
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient


class ActivationTokenRepository(ActivationTokenRepositoryIF, RepositoryMixin):
    _COLLECTION_NAME = "activation_tokens"

    def __init__(
        self,
        db: AsyncIOMotorClient = Depends(app_context.mongo_db_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._collection = db[self._COLLECTION_NAME]
        self.logger = logger

    async def find_by_token(self, token: str) -> Union[ActivationTokenEntity, None]:
        try:
            document = await self._collection.find_one({"token": token})
            if document:
                return ActivationTokenEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return

    async def create(
        self,
        token: str,
        user_id: str,
        organization_id: str,
        expiration_datetime: datetime,
    ) -> ActivationTokenEntity:
        document = {
            "token": token,
            "user_id": user_id,
            "organization_id": organization_id,
            "expiration_datetime": expiration_datetime,
            **self.generate_initial_state(),
        }
        try:
            result = await self._collection.insert_one(document)
            document["_id"] = result.inserted_id
            return ActivationTokenEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def delete(self, token: str) -> None:
        try:
            await self._collection.delete_one({"token": token})
            return
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
