from dataclasses import dataclass, field
from typing import List, Union

from api.core.extension.option import SalesContentType
from api.repositories.mongo.sales_content_repository.dto import (
    MovieContentDto as MovieContentDtoRepo,
)
from api.repositories.mongo.sales_content_repository.dto import (
    PdfContentDto as PdfContentDtoRepo,
)
from api.repositories.mongo.sales_content_repository.dto import (
    StepContentDto as StepContentDtoRepo,
)
from api.repositories.mongo.sales_content_repository.dto import (
    TextContentDto as TextContentDtoRepo,
)
from api.repositories.mongo.sales_content_repository.entity import (
    BaseContentEntity,
    MovieContentEntity,
    PdfContentEntity,
    StepContentEntity,
    TextContentEntity,
)
from api.utility.dataclass import DataclassMixin


@dataclass
class ContentCommonProperty(DataclassMixin):
    index: int
    title: str
    content_type: SalesContentType

    def __new__(cls, *args, **kwargs):
        dataclass(cls)
        return super().__new__(cls)

    def to_repository_dto(self):
        ...


@dataclass
class Step(DataclassMixin):
    index: int
    text: str
    is_proceeded: bool


class PdfContentDto(ContentCommonProperty):
    name: str
    image_list: List[str]

    def to_repository_dto(self):
        return PdfContentDtoRepo(
            index=self.index,
            title=self.title,
            content_type=self.content_type.value,
            name=self.name,
            image_list=self.image_list,
        )


class TextContentDto(ContentCommonProperty):
    text: str

    def to_repository_dto(self):
        return TextContentDtoRepo(
            index=self.index,
            title=self.title,
            content_type=self.content_type.value,
            text=self.text,
        )


class MovieContentDto(ContentCommonProperty):
    name: str

    def to_repository_dto(self):
        return MovieContentDtoRepo(
            index=self.index,
            title=self.title,
            content_type=self.content_type.value,
            name=self.name,
        )


class StepContentDto(ContentCommonProperty):
    steps: List[Step]

    def to_repository_dto(self):
        return StepContentDtoRepo(
            index=self.index,
            title=self.title,
            content_type=self.content_type.value,
            steps=self.steps,
        )


@dataclass
class SalesContentDto(DataclassMixin):
    owner_id: str
    title: str
    tags: List[str] = field(default_factory=list)
    contents: List[
        Union[PdfContentDto, TextContentDto, MovieContentDto, StepContentDto]
    ] = field(default_factory=list)


@dataclass(init=False)
class SalesContentDbDto(DataclassMixin):
    id: str
    owner_id: str
    title: str
    tags: List[str] = field(default_factory=list)
    contents: List[
        Union[PdfContentDto, TextContentDto, MovieContentDto, StepContentDto]
    ] = field(default_factory=list)

    def __init__(
        self,
        id: str,
        owner_id: str,
        title: str,
        tags: List[str],
        contents: List[BaseContentEntity],
    ):
        self.id = id
        self.owner_id = owner_id
        self.title = title
        self.tags = tags
        _contents = []
        for content in contents:
            if isinstance(content, PdfContentEntity):
                _contents.append(
                    PdfContentDto(
                        index=content.index,
                        title=content.title,
                        content_type=SalesContentType.PDF,
                        name=content.name,
                        image_list=content.image_list,
                    )
                )
            elif isinstance(content, TextContentEntity):
                _contents.append(
                    TextContentDto(
                        index=content.index,
                        title=content.title,
                        content_type=SalesContentType.TEXT,
                        text=content.text,
                    )
                )
            elif isinstance(content, MovieContentEntity):
                _contents.append(
                    MovieContentDto(
                        index=content.index,
                        title=content.title,
                        content_type=SalesContentType.MOVIE,
                        name=content.name,
                    )
                )
            elif isinstance(content, StepContentEntity):
                _contents.append(
                    StepContentDto(
                        index=content.index,
                        title=content.title,
                        content_type=SalesContentType.STEP,
                        steps=content.steps,
                    )
                )

        self.contents = _contents
        super().__init__()


@dataclass
class SalesContentSharedUserDto(DataclassMixin):
    organization: str
    user_id: str
    is_active: bool
