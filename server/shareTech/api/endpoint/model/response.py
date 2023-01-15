from typing import Generic, Optional, TypeVar

from pydantic import BaseModel
from pydantic.generics import GenericModel

Model = TypeVar("Model", bound=BaseModel)


class Pagnation(BaseModel):
    size: int
    previous_cursor: int
    next_cursor: Optional[int]


class PagnatedResponse(GenericModel, Generic[Model]):
    data: Model
    pagnation: Optional[Pagnation]
