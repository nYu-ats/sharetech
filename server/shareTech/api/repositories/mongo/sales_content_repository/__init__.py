import traceback
from typing import List, Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.repository_mixin import RepositoryMixin
from api.repositories.mongo.sales_content_repository.dto import SalesContentDto
from api.repositories.mongo.sales_content_repository.entity import SalesContentEntity
from api.repositories.mongo.sales_content_repository.filter import SalesContentFilter
from api.repositories.mongo.sales_content_repository.interface import (
    SalesContentsRepositoryIF,
)
from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection


class SalesContentsRepository(SalesContentsRepositoryIF, RepositoryMixin):
    _BASE_COLLECTION_NAME = "{}_sales_contents"

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

    async def find_by_id(
        self, organization: str, id: str
    ) -> Union[SalesContentEntity, None]:
        try:
            document = await self._collection(organization).find_one(
                {"_id": ObjectId(id)}
            )
            if document:
                return SalesContentEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return

    async def filter(
        self, organization: str, filter: SalesContentFilter
    ) -> List[Union[SalesContentEntity, None]]:
        try:
            documents = (
                await self._collection(organization)
                .find(filter.to_query())
                .to_list(length=filter._limit)
            )
            if documents:
                return [SalesContentEntity(**document) for document in documents]
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

        return []

    async def create(
        self,
        organization: str,
        sales_content: SalesContentDto,
    ) -> SalesContentEntity:
        document = {
            **sales_content.as_dict(),
            **self.generate_initial_state(created_by=sales_content.owner_id),
        }
        try:
            result = await self._collection(organization).insert_one(document)
            document["_id"] = result.inserted_id
            return SalesContentEntity(**document)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def update_one(
        self, organization: str, content_id: str, sales_content: SalesContentDto
    ) -> SalesContentEntity:
        document = {
            **sales_content.as_dict(),
            **self.generate_initial_state(created_by=sales_content.owner_id),
        }
        try:
            result = await self._collection(organization).replace_one(
                {"_id": ObjectId(content_id)}, document
            )
            if result.modified_count == 1:
                document["_id"] = content_id
                return SalesContentEntity(**document)

            raise DatabaseException(message="SalesContent data conflict")
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
