from passlib.context import CryptContext


class Hasher:
    _context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def get_hash(cls, value: str) -> str:
        return cls._context.hash(value)

    @classmethod
    def verify(cls, plain: str, hashed: str) -> bool:
        return cls._context.verify(plain, hashed)
