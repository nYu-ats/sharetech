import traceback
from datetime import datetime
from typing import Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.repository_mixin import RepositoryMixin
from api.repositories.mongo.sales_content_access_report_repository.dto import (
    AccessHistory,
    SalesContentAccessReport,
)
from api.repositories.mongo.sales_content_access_report_repository.interface import (
    SalesContentsAccessReportRepositoryIF,
)
from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection


class SalesContentAccessReportRepository(
    SalesContentsAccessReportRepositoryIF, RepositoryMixin
):
    _BASE_COLLECTION_NAME = "{}_sales_contents_access_reports"

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

    async def initialize(self, organization: str, sales_content_id: str) -> bool:
        initial_document = {
            "sales_content_id": ObjectId(sales_content_id),
            "access_histories": [],
            **self.generate_initial_state(),
        }
        try:
            document = await self._collection(organization).insert_one(initial_document)
            if document.inserted_id:
                return True
            else:
                return False
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def add_history(
        self,
        organization: str,
        sales_content_id: str,
        user_id: str,
        access_datetime: datetime,
    ) -> Union[SalesContentAccessReport, None]:
        history = {"user_id": user_id, "access_datetime": str(access_datetime)}
        try:
            result = await self._collection(organization).update_one(
                {"sales_content_id": ObjectId(sales_content_id)},
                {"$push": {"access_histories": {"$each": [history]}}},
            )
            if result.modified_count == 1:
                access_report = await self._collection(organization).find_one(
                    {"sales_content_id": ObjectId(sales_content_id)}
                )
                return SalesContentAccessReport(
                    organization=organization,
                    content_id=sales_content_id,
                    access_historis=[
                        AccessHistory(
                            user_id=history.get("user_id"),
                            access_datetime=history.get("access_datetime"),
                        )
                        for history in access_report.get("access_histories", [])
                    ],
                )
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
