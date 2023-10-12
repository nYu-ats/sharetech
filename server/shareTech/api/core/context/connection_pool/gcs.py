from typing import Dict

from google.cloud.storage import Client
from google.oauth2.service_account import Credentials


class Gcs:
    def __init__(self, config: Dict):
        self.project = config["project"]
        self.sa_path = config["sa_path"]
        self._connection = None

    def _connect(self) -> None:
        if not self._connection:
            client = Client(
                project=self.project,
                credentials=Credentials.from_service_account_file(self.sa_path),
            )
            self._connection = client

    def get_connection(self):
        if not self._connection:
            self._connect()

        return self._connection
