from api.core.extension.option import UserIconKey
from pydantic import BaseModel


class User(BaseModel):
    id: int
    icon: UserIconKey
    name: str
