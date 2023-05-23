from abc import ABCMeta
from dataclasses import dataclass
from datetime import datetime
from typing import Union


@dataclass
class BaseEntity(metaclass=ABCMeta):
    _id: str
    created_at: datetime
    created_by: str
    updated_at: Union[datetime, None]
    updated_by: Union[str, None]
    deleted_at: Union[datetime, None]
    deleted_by: Union[str, None]

    def __new__(cls, *args, **kwargs):
        dataclass(cls)
        return super().__new__(cls)

    def __post_init__(self):
        self._id = str(self._id)
