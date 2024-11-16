from pydantic_settings import BaseSettings
import os 

class Settings(BaseSettings):
    jwt_access_secret: str = os.getenv('JWT_ACCESS_SECRET')
    jwt_algorithm: str = os.getenv('JWT_ALGORITHM')
	
settings = Settings()
