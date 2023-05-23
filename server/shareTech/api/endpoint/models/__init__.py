from typing import Generic, Optional, TypeVar

from api.core.extension.option import Roles
from pydantic import BaseModel
from pydantic.generics import GenericModel

Model = TypeVar("Model", bound=BaseModel)


class Pagnation(BaseModel):
    size: int
    previous_cursor: int
    next_cursor: Optional[int]


class Envelope(GenericModel, Generic[Model]):
    data: Model
    pagnation: Optional[Pagnation]


class User(BaseModel):
    email: str
    password: str


class UserDB(BaseModel):
    id: str
    email: str
    role: Roles
    organization: str


class Token(BaseModel):
    token: str


class Error(BaseModel):
    message: str
    error_code: int
