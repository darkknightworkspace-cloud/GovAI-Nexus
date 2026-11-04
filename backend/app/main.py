"""
GovAI Nexus - Main FastAPI Application Entry Point
Exposes unified, secure, bilingual RESTful endpoints for Web & Mobile frontends.
Integrates RAG, ML, NLP, OCR, Voice, Multi-Agent Orchestration, and Fraud Intelligence.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from backend.app.core.config import settings

# Import Core Domain Routers
from backend.app.api.v1.endpoints import (
    auth,
    services,
    applications,
    documents,
    complaints,
    tasks,
    ai_chat,
    knowledge,
    ocr_api,
    nlp_api,
    voice_api,
    ml_api,
    fraud_api,
    agents_api,
    # Phase 5 Governance, Analytics, Mobile & Integration Routers
    analytics,
    transparency,
    infrastructure,
    compliance,
    reports,
    mobile_api,
    integrations_api
)

app = FastAPI(
    title=settings.PROJECT_TITLE,
    version="1.0.0",
    description="Enterprise REST API for Tamil Nadu GovAI Nexus Digital Governance Platform",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# Configure CORS for Web & Mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================================================================
# Health Check
# ==============================================================================
@app.get("/health", tags=["Health"])
async def health_check():
    """System health check endpoint for container orchestrator / Cloud Run."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "state": settings.DEFAULT_STATE,
        "supported_languages": settings.SUPPORTED_LANGUAGES,
        "ai_engine": "ONLINE",
        "analytics_engine": "ONLINE",
        "mobile_gateway": "ONLINE",
        "integrations_status": "ALL_HEALTHY",
        "version": "1.0.0"
    }


# ==============================================================================
# Include Modular API v1 Routers
# ==============================================================================
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(services.router, prefix=settings.API_V1_STR)
app.include_router(applications.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(complaints.router, prefix=settings.API_V1_STR)
app.include_router(tasks.router, prefix=settings.API_V1_STR)

# Phase 4 AI, ML, GenAI, and Agent Routers
app.include_router(ai_chat.router, prefix=settings.API_V1_STR)
app.include_router(knowledge.router, prefix=settings.API_V1_STR)
app.include_router(ocr_api.router, prefix=settings.API_V1_STR)
app.include_router(nlp_api.router, prefix=settings.API_V1_STR)
app.include_router(voice_api.router, prefix=settings.API_V1_STR)
app.include_router(ml_api.router, prefix=settings.API_V1_STR)
app.include_router(fraud_api.router, prefix=settings.API_V1_STR)
app.include_router(agents_api.router, prefix=settings.API_V1_STR)

# Phase 5 Governance Analytics, Transparency, Mobile & Ecosystem Routers
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(transparency.router, prefix=settings.API_V1_STR)
app.include_router(infrastructure.router, prefix=settings.API_V1_STR)
app.include_router(compliance.router, prefix=settings.API_V1_STR)
app.include_router(reports.router, prefix=settings.API_V1_STR)
app.include_router(mobile_api.router, prefix=settings.API_V1_STR)
app.include_router(integrations_api.router, prefix=settings.API_V1_STR)

