import logging
from functools import cache
from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    logging_level: int = logging.INFO
    media_dir: str

    image_suffixes: list[str] = ["jpeg", "jpg", "png"]
    video_suffixes: list[str] = ["mov", "mp4"]

    model_config = ConfigDict(
        extra="ignore",
        env_file=".env",
    )

    thumbnail_cache_dir: str = "thumbnail_cache"


@cache
def get_settings(env_name: str | None = None) -> Settings:
    env_file = ".env" if env_name is None else f".{env_name}.env"
    settings = Settings(_env_file=env_file)  # type: ignore[call-arg]
    logging.basicConfig(
        level=settings.logging_level, handlers=[logging.StreamHandler()]
    )
    logging.info("Loading settings from %s", env_file)
    return settings
