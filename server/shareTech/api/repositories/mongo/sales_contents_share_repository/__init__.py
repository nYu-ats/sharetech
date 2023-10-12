import traceback
from typing import List, Union

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException
from api.repositories.mongo.repository_mixin import RepositoryMixin
from api.repositories.mongo.sales_contents_share_repository.dto import (
    SalesContentSharedUser,
)
from api.repositories.mongo.sales_contents_share_repository.interface import (
    SalesContentsSahreRepositoryIF,
)
from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection


class SalesContentShareRepository(SalesContentsSahreRepositoryIF, RepositoryMixin):
    _BASE_COLLECTION_NAME = "{}_sales_contents_share"

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

    async def initialize(
        self, organization: str, sales_content_id: str, password: str
    ) -> bool:
        initial_document = {
            "sales_content_id": ObjectId(sales_content_id),
            "password": password,
            "users": [],
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

    async def get_users(
        self, organization: str, sales_content_id: str, is_active: bool
    ) -> List[Union[SalesContentSharedUser, None]]:
        try:
            document = await self._collection(organization).find_one(
                {"sales_content_id": ObjectId(sales_content_id)},
            )
            if document and document.get("users"):
                return [
                    SalesContentSharedUser(
                        organization=user.get("organization"),
                        user_id=user.get("user_id"),
                        is_active=user.get("is_active"),
                    )
                    for user in document.get("users")
                    if user.get("is_active") or not is_active
                ]
            else:
                return
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def add_users(
        self,
        organization: str,
        sales_content_id: str,
        users: List[SalesContentSharedUser],
    ) -> List[Union[SalesContentSharedUser, None]]:
        shared_users_all = await self.get_users(organization, sales_content_id, False)
        current_users = []
        current_deactivated_users = []
        if shared_users_all:
            current_users = [user.user_id for user in shared_users_all]
            current_deactivated_users = [
                user.user_id for user in shared_users_all if not user.is_active
            ]
        new_in_users = [
            user.as_dict() for user in users if user.user_id not in current_users
        ]
        reactivate_users = [
            user.as_dict()
            for user in users
            if user.user_id in current_deactivated_users
        ]

        try:
            new_in_result = await self._collection(organization).update_one(
                {"sales_content_id": ObjectId(sales_content_id)},
                {"$push": {"users": {"$each": new_in_users}}},
            )
            reactivate_result = await self._collection(organization).update_one(
                {
                    "sales_content_id": ObjectId(sales_content_id),
                },
                {"$set": {"users.$[elem].is_active": True}},
                array_filters=[
                    {
                        "elem.user_id": {
                            "$in": [user.get("user_id") for user in reactivate_users]
                        }
                    }
                ],
            )
            if (
                new_in_result.modified_count == 1
                or reactivate_result.modified_count == 1
            ):
                result = new_in_users + reactivate_users
                return [
                    SalesContentSharedUser(
                        organization=user.get("organization"),
                        user_id=user.get("user_id"),
                        is_active=user.get("is_active"),
                    )
                    for user in result
                ]
            raise DatabaseException(message="SalesContent share data conflict")
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def delete_users(
        self,
        organization: str,
        sales_content_id: str,
        users: List[SalesContentSharedUser],
    ) -> List[Union[SalesContentSharedUser, None]]:
        delete_target_users = [user.user_id for user in users]
        try:
            result = await self._collection(organization).update_one(
                {
                    "sales_content_id": ObjectId(sales_content_id),
                },
                {"$set": {"users.$[elem].is_active": False}},
                array_filters=[{"elem.user_id": {"$in": delete_target_users}}],
            )
            if result.modified_count == 1:
                return [
                    SalesContentSharedUser(
                        organization=user.organization,
                        user_id=user.user_id,
                        is_active=user.is_active,
                    )
                    for user in users
                ]
            raise DatabaseException(message="SalesContent share data conflict")
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def get_password(
        self, organization: str, sales_content_id: str
    ) -> Union[str, None]:
        try:
            document = await self._collection(organization).find_one(
                {"sales_content_id": ObjectId(sales_content_id)}
            )
            if document:
                return document.get("password")
            else:
                return
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)

    async def update_password(
        self, organization: str, sales_content_id: str, password: str
    ) -> Union[str, None]:
        try:
            result = await self._collection(organization).update_one(
                {"sales_content_id": ObjectId(sales_content_id)},
                {"$set": {"password": password}},
            )
            if result.modified_count == 1:
                return password
            raise DatabaseException(message="SalesContent share data conflict")
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise DatabaseException(detail=stack_trace)
