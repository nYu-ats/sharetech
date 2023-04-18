from abc import ABCMeta, abstractmethod
from typing import Union

from api.repositories.redis.kv_store.entity import StoredData


class KVStoreIF(metaclass=ABCMeta):
    @abstractmethod
    def get(self, key: str) -> Union[StoredData, None]:
        ...

    @abstractmethod
    def set(self, key: str) -> Union[StoredData, None]:
        ...
