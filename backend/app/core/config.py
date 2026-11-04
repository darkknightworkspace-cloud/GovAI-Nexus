"""
GovAI Nexus - Backend Configuration
Defines application settings and environment configurations using Pydantic Settings.
"""
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "GovAI Nexus"
    PROJECT_TITLE: str = "AI-Powered GovTech & Digital Governance Platform"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "dev-secret-key-change-in-production-vault"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    ALGORITHM: str = "HS256"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/govai_nexus"
    DATABASE_ECHO: bool = False
    
    # Redis Cache & Broker
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Vector Search & Embeddings
    EMBEDDING_MODEL_NAME: str = "BAAI/bge-m3"  # Multilingual support including Tamil
    VECTOR_DIMENSION: int = 1024
    
    # LLM & AI Providers
    GEMINI_API_KEY: str = ""
    DEFAULT_LLM_MODEL: str = "gemini-2.5-flash"
    
    # Server Ports (Frontend: 4000, Backend API: 8080)
    FRONTEND_PORT: int = 4000
    SERVER_PORT: int = 8080

    # Security & CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:4000",
        "http://127.0.0.1:4000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "https://ais-dev-dvh5k4jnlhe7b35pfttg7c-16986016494.asia-southeast1.run.app",
        "https://ais-pre-dvh5k4jnlhe7b35pfttg7c-16986016494.asia-southeast1.run.app",
    ]
    
    # Primary Geographical Scope
    DEFAULT_STATE: str = "Tamil Nadu"
    SUPPORTED_LANGUAGES: List[str] = ["en", "ta"]

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
