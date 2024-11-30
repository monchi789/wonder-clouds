from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    SMTP_HOST: str = os.getenv('SMTP_HOST')
    SMTP_PORT: int = os.getenv('SMTP_PORT')
    SMTP_USERNAME: str = os.getenv('SMTP_USER')
    SMTP_PASSWORD: str = os.getenv('SMTP_PASSWORD')
    COMPANY_EMAIL: str = os.getenv('COMPANY_EMAIL')

settings = Settings()
