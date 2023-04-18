class ShareTechCustomException(Exception):
    ...


class AuthenticationFailed(ShareTechCustomException):
    message = "ユーザーIDもしくはパスワードが誤っています"


class KVStoreFailed(ShareTechCustomException):
    message = "トークンのキャッシュに失敗しました"
