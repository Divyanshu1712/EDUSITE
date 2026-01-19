import os
from dotenv import load_dotenv
load_dotenv()
class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "EduSite")
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
    )
settings = Settings()