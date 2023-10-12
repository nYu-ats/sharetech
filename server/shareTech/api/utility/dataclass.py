from dataclasses import asdict


class DataclassMixin:
    def as_dict(self):
        return asdict(self)
