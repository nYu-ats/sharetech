import os
from time import time
from typing import Dict

import jwt


class JwtUtil:
    _secret = os.environ["JWTSECRET"]
    token_age = 60 * 60

    @classmethod
    def generate_token(cls, **kwargs) -> str:
        timestamp = int(time()) + cls.token_age
        kwargs["exp"] = timestamp

        return jwt.encode(kwargs, cls._secret, algorithm="HS256")

    @classmethod
    def decode(cls, token: str) -> Dict:
        return jwt.decode(token, cls._secret, algorithms=["HS256"])
