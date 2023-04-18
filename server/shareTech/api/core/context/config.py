import os
from pathlib import Path

import yaml


class Config:
    config_path = Path("./api/config/")
    conf = None

    def load(self):
        try:
            env = os.environ["ENV"]
        except KeyError:
            raise Exception("You should set environment variable as 'ENV'.")

        try:
            with (self.config_path / Path(f"{env}.yml")).open(
                "r", encoding="utf-8"
            ) as f:
                self.conf = yaml.safe_load(f)
        except Exception:
            raise Exception(
                f"You should put {env} conf file in {str(self.config_path.absolute())}"
            )

        return self


config = Config().load().conf
