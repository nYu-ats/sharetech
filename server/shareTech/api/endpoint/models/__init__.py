from typing import Generic, Optional, TypeVar

from api.core.extension.option import UserIconKey
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


class AuthenticateInfo(BaseModel):
    user_unique_id: str
    password: str


class UserDB(BaseModel):
    id: int
    icon: UserIconKey
    last_name: str
    first_name: str
    user_unique_id: str
    role: str
    organization: str


class Token(BaseModel):
    token: str


class ErrorMessage(BaseModel):
    message: str
