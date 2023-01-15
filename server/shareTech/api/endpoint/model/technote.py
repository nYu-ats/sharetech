from datetime import datetime
from typing import List, Optional

from api.core.extension.option import TechnoteIconKey
from api.endpoint.model.account import User
from pydantic import BaseModel


class TechNoteTag(BaseModel):
    id: int
    name: str


class FlowChartNode(BaseModel):
    id: int
    text: Optional[str]


class FlowChartEdge(BaseModel):
    id: str
    node_from: int
    node_to: int


class FlowChart(BaseModel):
    nodes: List[FlowChartNode]
    edges: Optional[List[FlowChartEdge]]


class Table(BaseModel):
    head: Optional[List[str]]
    data: List[List[str]]


class DataBar(BaseModel):
    label: str
    value: List[int]


class TechnoteChapter(BaseModel):
    memo: str
    reference: Optional[List[str]]
    flow_chart: Optional[FlowChart]
    table: Optional[Table]
    data_bar: Optional[List[DataBar]]


class TechnoteContents(BaseModel):
    business_flow: TechnoteChapter
    goal: TechnoteChapter
    issue: TechnoteChapter
    solution: TechnoteChapter
    result: TechnoteChapter


class Technote(BaseModel):
    id: int
    created_at: datetime
    updated_at: datetime
    author: User
    expose: bool
    technote_icon: TechnoteIconKey
    title: str
    tags: List[TechNoteTag]
    contents: Optional[TechnoteContents]
