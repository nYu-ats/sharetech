from typing import Dict

from motor.motor_asyncio import AsyncIOMotorClient


class MongoDb:
    def __init__(self, config: Dict):
        self.user = config["user"]
        self.password = config["password"]
        self.host = config["host"]
        self.port = config["port"]
        self.db_name = config["db_name"]
        self._connection = None

    def _connect(self) -> None:
        if not self._connection:
            client = AsyncIOMotorClient(
                f"mongodb://{self.user}:{self.password}"
                f"@{self.host}:{self.port}/{self.db_name}"
            )
            self._connection = client[self.db_name]

    def get_connection(self) -> AsyncIOMotorClient:
        if not self._connection:
            self._connect()

        return self._connection
