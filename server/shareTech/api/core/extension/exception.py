class ShareTechCustomException(Exception):
    err_code = 0
    message = ""
    detail = ""

    def __init__(self, message: str = None, detail=None):
        if message:
            self.message = message
        if detail:
            self.detail = detail

    def as_content(self):
        return {"message": self.message, "error_code": self.err_code}


class AutheException(ShareTechCustomException):
    err_code = 4000
    message = "ユーザーIDもしくはパスワードが正しくありません"
    detail = ""

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class ActivateTokenException(ShareTechCustomException):
    err_code = 4011
    message = "ユーザーアクティベートトークンが不正です"
    detail = ""

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class UserDuplicateException(ShareTechCustomException):
    err_code = 4090
    message = "ユーザーが既に存在します"

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class InternalServerException(ShareTechCustomException):
    err_code = 5000
    message = "サーバーで処理不可能な例外が発生しました"
    detail = ""

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class TokenCacheException(InternalServerException):
    err_code = 5010
    message = "トークンのキャッシュに失敗しました"

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class DatabaseException(InternalServerException):
    err_code = 5020

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class StorageUsableException(ShareTechCustomException):
    err_code = 4090
    message = "指定のStorage操作は不可能です"

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)


class SalesContentDoesNotExist(ShareTechCustomException):
    err_code = 2040
    message = "指定のセールスコンテンツが存在しません"

    def __init__(self, message: str = None, detail=None):
        super().__init__(message, detail)
