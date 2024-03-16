import logging
from functools import cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    logging_level: int = logging.DEBUG
    media_dir: str

    class Config:
        env_file = ".env"


@cache
def get_settings(env_name: str | None = None) -> Settings:
    env_file = ".env" if env_name is None else f".{env_name}.env"
    settings = Settings(_env_file=env_file)  # type: ignore[call-arg]
    logging.basicConfig(level=settings.logging_level, handlers=[logging.StreamHandler()])
    logging.info("Loading settings from %s", env_file)
    return settings
