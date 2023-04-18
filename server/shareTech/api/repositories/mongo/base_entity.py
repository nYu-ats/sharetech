from abc import ABCMeta
from dataclasses import dataclass
from datetime import datetime


@dataclass
class BaseEntity(metaclass=ABCMeta):

    created_at: datetime
    created_by: str
    updated_at: datetime
    updated_by: str
    deleted_at: datetime
    daleted_by: str

    def __new__(cls, *args, **kwargs):
        dataclass(cls)
        return super().__new__(cls)
