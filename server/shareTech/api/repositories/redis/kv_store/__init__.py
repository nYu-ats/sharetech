from api.core.context import app_context
from api.core.context.logging import Logger
from api.repositories.redis.kv_store.entity import StoredData
from api.repositories.redis.kv_store.interface import KVStoreIF
from fastapi import Depends
from redis import Redis


class KVStore(KVStoreIF):
    def __init__(
        self,
        client: Redis = Depends(app_context.redis_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._client = client
        self.logger = logger

    def get(self, key: str):
        value = self._client.get(key)
        return StoredData(key=key, value=value)

    def set(self, key: str, value: str):
        if self._client.set(key, value):
            return StoredData(key=key, value=value)

        return
