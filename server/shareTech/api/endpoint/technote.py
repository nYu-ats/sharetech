from typing import List, Optional

from api.endpoint.model.response import PagnatedResponse
from api.endpoint.model.technote import Technote
from api.service.factory import technote_service_factory
from api.service.interface import TechnoteServiceIF
from api.utility.logging import LoggerWrapper as Logger
from fastapi import APIRouter, Depends, HTTPException, Query

router = APIRouter(prefix="/technote", tags=["technote"])
logger = Logger


@router.get("", response_model=PagnatedResponse[List[Technote]])
def list_technote(
    tag: Optional[List[str]] = Query(None, alias="tag[]"),
    author: Optional[List[str]] = Query(None, alias="author[]"),
    keyword: Optional[List[str]] = Query(None, alias="keyword[]"),
    _fields: Optional[str] = None,
    _order_by: Optional[str] = None,
    _cursor: Optional[int] = None,
    _limit: Optional[int] = 50,
    service: TechnoteServiceIF = Depends(technote_service_factory),
):
    try:
        result = service.list(
            tag=tag,
            author=author,
            keyword=keyword,
            _fields=_fields,
            _order_by=_order_by,
            _cursor=_cursor,
            _limit=_limit,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=[{"message": str(e)}])

    from datetime import datetime

    return {
        "data": [
            {
                "id": 1,
                "created_at": datetime(2022, 12, 12, 1, 1, 1),
                "updated_at": datetime(2022, 12, 12, 1, 1, 1),
                "author": {"id": 1, "icon": "USERICON", "name": "test"},
                "expose": False,
                "technote_icon": "TECHNOTEICON",
                "title": "test",
                "tags": [{"id": 1, "name": "test"}],
            }
        ]
    }
