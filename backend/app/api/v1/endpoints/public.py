"""
GovAI Nexus - Public Government Website API
Phase 6: Unauthenticated public endpoints for the homepage and public portal.
Only returns approved, non-sensitive public information.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from typing import Optional

from backend.app.database.session import get_db
from backend.app.database.models import (
    Department,
    GovernmentService,
    GovernmentScheme,
)

router = APIRouter(prefix="/public", tags=["Public Website"])


# ---------------------------------------------------------------------------
# Homepage aggregated data
# ---------------------------------------------------------------------------
@router.get("/home")
async def get_home(db: AsyncSession = Depends(get_db)):
    depts_q = await db.execute(select(Department).limit(6))
    schemes_q = await db.execute(select(GovernmentScheme).where(GovernmentScheme.is_active == True).limit(3))
    services_q = await db.execute(select(GovernmentService).where(GovernmentService.is_active == True).limit(6))

    depts = depts_q.scalars().all()
    schemes = schemes_q.scalars().all()
    services = services_q.scalars().all()

    return {
        "departments": [_dept_out(d) for d in depts],
        "featured_schemes": [_scheme_out(s) for s in schemes],
        "services": [_service_out(s) for s in services],
    }


# ---------------------------------------------------------------------------
# Departments
# ---------------------------------------------------------------------------
@router.get("/departments")
async def get_departments(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Department).limit(limit).offset(offset))
    items = result.scalars().all()
    return {"departments": [_dept_out(d) for d in items]}


# ---------------------------------------------------------------------------
# Services
# ---------------------------------------------------------------------------
@router.get("/services")
async def get_services(
    category: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    q = select(GovernmentService).where(GovernmentService.is_active == True)
    if category:
        q = q.where(GovernmentService.category == category)
    result = await db.execute(q.limit(limit).offset(offset))
    items = result.scalars().all()
    return {"services": [_service_out(s) for s in items]}


# ---------------------------------------------------------------------------
# Schemes
# ---------------------------------------------------------------------------
@router.get("/schemes/featured")
async def get_featured_schemes(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(GovernmentScheme).where(GovernmentScheme.is_active == True).limit(5)
    )
    items = result.scalars().all()
    return {"schemes": [_scheme_out(s) for s in items]}


@router.get("/schemes")
async def get_schemes(
    category: Optional[str] = None,
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    q = select(GovernmentScheme)
    if category:
        q = q.where(GovernmentScheme.category == category)
    result = await db.execute(q.limit(limit))
    items = result.scalars().all()
    return {"schemes": [_scheme_out(s) for s in items]}


# ---------------------------------------------------------------------------
# Announcements (static until a dedicated Announcement model is added)
# ---------------------------------------------------------------------------
@router.get("/announcements")
async def get_announcements(limit: int = Query(10, ge=1, le=50)):
    return {
        "announcements": [
            {"id": 1, "title": "G.O. Ms. No. 214 – Revised guidelines for Income Certificate issuance.", "category": "Government Order", "date": "03 Nov 2026", "is_new": True},
            {"id": 2, "title": "Special camp for Community Certificate – Nov 10–15 in all Districts.", "category": "Service Announcement", "date": "01 Nov 2026", "is_new": True},
            {"id": 3, "title": "Extension of working hours at e-Sevai Centres for public convenience.", "category": "Service Update", "date": "30 Oct 2026", "is_new": False},
            {"id": 4, "title": "Online submission now available for Nativity Certificate applications.", "category": "Digital Initiative", "date": "28 Oct 2026", "is_new": False},
        ][:limit]
    }


# ---------------------------------------------------------------------------
# Statistics (aggregate counts from real tables)
# ---------------------------------------------------------------------------
@router.get("/statistics")
async def get_statistics(db: AsyncSession = Depends(get_db)):
    dept_count = (await db.execute(select(func.count()).select_from(Department))).scalar()
    service_count = (await db.execute(select(func.count()).select_from(GovernmentService).where(GovernmentService.is_active == True))).scalar()
    scheme_count = (await db.execute(select(func.count()).select_from(GovernmentScheme).where(GovernmentScheme.is_active == True))).scalar()
    return {
        "departments": str(dept_count) if dept_count else "—",
        "services": str(service_count) if service_count else "—",
        "schemes": str(scheme_count) if scheme_count else "—",
        "citizens": "—",
        "applications": "—",
        "sla_compliance": "—",
        "esevai_centres": "—",
    }


# ---------------------------------------------------------------------------
# FAQs
# ---------------------------------------------------------------------------
@router.get("/faqs")
async def get_faqs():
    return {
        "faqs": [
            {"q": "How do I apply for an Income Certificate?", "a": "Visit the nearest e-Sevai centre or apply online through the GovAI Nexus Citizen Portal."},
            {"q": "What documents are required for a Community Certificate?", "a": "You need proof of residence, school leaving certificate, and ration card copy."},
            {"q": "How can I track my application status?", "a": "Use the Track Application feature on the homepage or the Citizen Portal dashboard."},
        ]
    }


# ---------------------------------------------------------------------------
# Unified search
# ---------------------------------------------------------------------------
@router.get("/search")
async def search(
    q: str = Query(..., min_length=1),
    db: AsyncSession = Depends(get_db),
):
    term = f"%{q}%"
    services = (await db.execute(
        select(GovernmentService).where(
            or_(GovernmentService.title_en.ilike(term), GovernmentService.description_en.ilike(term))
        ).limit(5)
    )).scalars().all()
    schemes = (await db.execute(
        select(GovernmentScheme).where(
            or_(GovernmentScheme.title_en.ilike(term), GovernmentScheme.benefit_summary_en.ilike(term))
        ).limit(5)
    )).scalars().all()
    depts = (await db.execute(
        select(Department).where(Department.name_en.ilike(term)).limit(3)
    )).scalars().all()

    results = (
        [{"type": "service", "title": s.title_en, "description": s.description_en, "href": f"/services/{s.id}"} for s in services] +
        [{"type": "scheme", "title": s.title_en, "description": s.benefit_summary_en, "href": f"/schemes/{s.id}"} for s in schemes] +
        [{"type": "department", "title": d.name_en, "description": d.description, "href": f"/departments/{d.id}"} for d in depts]
    )
    return {"results": results, "total": len(results), "query": q}


# ---------------------------------------------------------------------------
# Private helpers
# ---------------------------------------------------------------------------
def _dept_out(d: Department) -> dict:
    return {
        "id": d.id,
        "name": d.name_en,
        "name_ta": d.name_ta,
        "description": d.description,
        "icon": "🏛️",
        "services_count": 0,
    }


def _service_out(s: GovernmentService) -> dict:
    return {
        "id": s.id,
        "name": s.title_en,
        "name_ta": s.title_ta,
        "description": s.description_en,
        "category": s.category,
    }


def _scheme_out(s: GovernmentScheme) -> dict:
    return {
        "id": s.id,
        "name": s.title_en,
        "name_ta": s.title_ta,
        "description": s.benefit_summary_en,
        "category": s.category,
        "status": "active" if s.is_active else "inactive",
    }
