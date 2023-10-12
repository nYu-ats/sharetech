from dataclasses import dataclass, field
from typing import List, Union

from api.core.extension.option import SalesContentType
from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


@dataclass
class BaseContentEntity:
    index: int
    title: str
    content_type: SalesContentType

    def __new__(cls, *args, **kwargs):
        dataclass(cls)
        return super().__new__(cls)


@dataclass
class StepEntity:
    index: int
    text: str
    is_proceeded: bool


class PdfContentEntity(BaseContentEntity):
    name: str
    image_list: List[str] = field(default_factory=list)


class TextContentEntity(BaseContentEntity):
    text: str


class MovieContentEntity(BaseContentEntity):
    name: str


class StepContentEntity(BaseContentEntity):
    steps: List[StepEntity]


@dataclass(init=False)
class SalesContentEntity(DataclassMixin, BaseEntity):
    owner_id: str
    title: str
    tags: List[str] = field(default_factory=list)
    contents: List[
        Union[
            PdfContentEntity, TextContentEntity, MovieContentEntity, StepContentEntity
        ]
    ] = field(default_factory=list)

    def __init__(self, *args, **kwargs):
        self.owner_id = kwargs.pop("owner_id")
        self.tags = kwargs.pop("tags")
        self.title = kwargs.pop("title")
        contents = []
        for content in kwargs.pop("contents"):
            if content.get("content_type", "") == SalesContentType.PDF.value:
                contents.append(PdfContentEntity(**content))
            elif content.get("content_type", "") == SalesContentType.TEXT.value:
                contents.append(TextContentEntity(**content))
            elif content.get("content_type", "") == SalesContentType.MOVIE.value:
                contents.append(MovieContentEntity(**content))
            elif content.get("content_type", "") == SalesContentType.STEP.value:
                contents.append(StepContentEntity(**content))

        self.contents = contents
        super().__init__(*args, **kwargs)
