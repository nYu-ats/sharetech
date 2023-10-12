from dataclasses import dataclass, field
from typing import List

from api.core.extension.option import SalesContentType
from api.utility.dataclass import DataclassMixin


@dataclass
class ContentCommonProperty(DataclassMixin):
    index: int
    title: str
    content_type: str

    def __new__(cls, *args, **kwargs):
        dataclass(cls)
        return super().__new__(cls)


@dataclass
class StepDto(DataclassMixin):
    index: int
    text: str
    is_proceeded: bool


class PdfContentDto(ContentCommonProperty):
    name: str
    image_list: List[str]


class TextContentDto(ContentCommonProperty):
    text: str


class MovieContentDto(ContentCommonProperty):
    name: str


class StepContentDto(ContentCommonProperty):
    steps: List[StepDto]

    def __init__(
        self, index: int, content_type: SalesContentType, steps: List[StepDto]
    ):
        self.steps = steps
        super().__init__(index, content_type)


@dataclass
class SalesContentDto(DataclassMixin):
    owner_id: str
    title: str
    tags: List[str] = field(default_factory=list)
    contents: List[ContentCommonProperty] = field(default_factory=list)
