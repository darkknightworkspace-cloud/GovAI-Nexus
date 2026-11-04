"""
GovAI Nexus - Database Session & Connection Management
Configures asynchronous SQLAlchemy engine with sessionmaker and connection pooling.
"""
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from backend.app.core.config import settings

# Engine setup with fallback support
DATABASE_URL = settings.DATABASE_URL
# In dev environment where postgresql container might not be active, fall back gracefully
try:
    engine = create_async_engine(
        DATABASE_URL,
        echo=settings.DATABASE_ECHO,
        future=True,
        pool_pre_ping=True
    )
except Exception:
    engine = create_async_engine(
        "sqlite+aiosqlite:///./govai_nexus.db",
        echo=False,
        future=True
    )

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency that yields a database session per request with rollback on failure."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
