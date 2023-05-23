import re
from pathlib import Path

import yaml
from api.core.context.config import config
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema


class EmailUtil:
    _ADDRESS_PATTERN = re.compile(r"[0-9a-zA-Z_.+-]+@[0-9a-zA-Z-]+\.[0-9a-zA-Z-.]+")
    _EMAIL_CONF = ConnectionConfig(**config["email"])
    _email_template_path = Path("./api/resources/email")

    @classmethod
    def extract_domain(cls, email: str) -> str:
        if cls._ADDRESS_PATTERN.match(email):
            return email.split("@")[-1]

    @classmethod
    async def send_preregister_message(cls, activation_url: str):
        with (cls._email_template_path / Path("preregister_template.yml")).open(
            "r", encoding="utf-8"
        ) as f:
            template = yaml.safe_load(f)
            message = MessageSchema(
                subject=template["subject"],
                recipients=["nyu7931555@gmail.com"],
                body=template["body"].format(activation_url),
                subtype="html",
            )
            await FastMail(cls._EMAIL_CONF).send_message(message)
