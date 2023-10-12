from typing import Generic, List, Optional, TypeVar, Union

from api.core.extension.option import AllowedStorageMethod, Roles, SalesContentType
from api.services.sales_content_service.dto import (
    MovieContentDto,
    PdfContentDto,
    StepContentDto,
    TextContentDto,
)
from pydantic import BaseModel, Field
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


class ContentCommonProperty(BaseModel):
    index: int
    title: str
    content_type: SalesContentType

    def to_dto(self):
        ...


class Step(BaseModel):
    index: int
    text: str
    is_proceeded: str = False


class PdfContent(ContentCommonProperty):
    name: str
    image_list: List[str]

    def to_dto(self):
        return PdfContentDto(**self.dict())


class TextContent(ContentCommonProperty):
    text: str

    def to_dto(self):
        return TextContentDto(**self.dict())


class MovieContent(ContentCommonProperty):
    name: str

    def to_dto(self):
        return MovieContentDto(**self.dict())


class StepContent(ContentCommonProperty):
    steps: List[Step]

    def to_dto(self):
        return StepContentDto(**self.dict())


class SalesContent(BaseModel):
    owner_id: str
    title: str
    tags: List[str] = Field(default_factory=list)
    contents: List[Union[PdfContent, TextContent, MovieContent, StepContent]] = Field(
        default_factory=list
    )


class SalesContentDB(BaseModel):
    id: str
    title: str
    tags: List[str] = Field(default_factory=list)
    contents: List[Union[PdfContent, TextContent, MovieContent, StepContent]] = Field(
        default_factory=list
    )


class SalesContentSharedUser(BaseModel):
    user_id: str
    is_active: bool


class SalesContentSharedUsers(BaseModel):
    users: List[SalesContentSharedUser] = Field(default_factory=list)


class SalesContentSharingPassword(BaseModel):
    password: str


class SignedUrlPath(BaseModel):
    key: str
    value: str


class StorageSignedUrl(BaseModel):
    allowd_method: AllowedStorageMethod
    urls: List[SignedUrlPath]
    expiration: str


class FileExist(BaseModel):
    exist: bool


class Error(BaseModel):
    message: str
    error_code: int
