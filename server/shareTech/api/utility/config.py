import os
from pathlib import Path

import yaml


class Config:
    config_path = Path("./api/config/")

    @classmethod
    def load(cls):
        try:
            env = os.environ["ENV"]
        except KeyError:
            raise Exception("You should set environment variable as 'ENV'.")

        conf = None
        try:
            with (cls.config_path / Path(f"{env}.yml")).open(
                "r", encoding="utf-8"
            ) as f:
                conf = yaml.safe_load(f)
        except Exception:
            raise Exception(
                f"You should put {env} config file in {str(cls.config_path.absolute())}"
            )

        return conf
