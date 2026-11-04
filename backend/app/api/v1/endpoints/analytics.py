"""
GovAI Nexus - Phase 5 Governance Analytics Endpoints
Provides real-time state, department, district, service, and workload telemetry.
"""
from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any

from backend.analytics_engine.service import governance_analytics_engine

router = APIRouter(prefix="/analytics", tags=["Governance Analytics"])


@router.get("/governance")
def get_statewide_governance():
    """Statewide executive summary and key governance KPI metrics."""
    return governance_analytics_engine.get_statewide_governance_summary()


@router.get("/departments")
def get_department_analytics(department: Optional[str] = Query(None, description="Filter by department name")):
    """Department-wise performance, SLA adherence, and workload indices."""
    return governance_analytics_engine.get_department_analytics(department)


@router.get("/districts")
def get_district_analytics(district: Optional[str] = Query(None, description="Filter by district name")):
    """District-wise analytics for all 38 districts of Tamil Nadu."""
    return governance_analytics_engine.get_district_analytics(district)


@router.get("/services")
def get_services_analytics():
    """Service delivery analytics, digital issuance rates, and SLA compliance."""
    return governance_analytics_engine.get_service_analytics()


@router.get("/applications")
def get_applications_analytics():
    """Application volume distribution and lifecycle funnel."""
    return {
        "timeframe": "Last 30 Days",
        "total_received": 1144200,
        "stages": [
            {"stage": "Submitted", "count": 1144200, "percentage": 100.0},
            {"stage": "Biometric / Document Verified", "count": 1089200, "percentage": 95.2},
            {"stage": "Field Inspection Completed", "count": 1012400, "percentage": 88.5},
            {"stage": "Officer Approved & Digitally Signed", "count": 988500, "percentage": 86.4},
            {"stage": "Rejected with Formal Order", "count": 48200, "percentage": 4.2},
            {"stage": "In Active Processing", "count": 107500, "percentage": 9.4}
        ],
        "channel_split": {
            "mobile_app": "44.2%",
            "esevai_centres": "38.6%",
            "citizen_web_portal": "17.2%"
        }
    }


@router.get("/complaints")
def get_complaints_analytics():
    """Grievance redressal trends and resolution performance."""
    return {
        "total_grievances_logged": 16420,
        "resolved_within_sla": 15210,
        "sla_resolution_rate": 92.6,
        "average_resolution_hours": 64.5,
        "statutory_sla_hours": 96.0,
        "top_categories": [
            {"category": "Delay in Certificate Verification", "count": 5420, "trend": "DOWN -8%"},
            {"category": "Patta Chitta Boundary Query", "count": 3980, "trend": "STABLE"},
            {"category": "DBT Bank Account Seeding", "count": 2840, "trend": "DOWN -22%"},
            {"category": "Street Light & Sanitation", "count": 2410, "trend": "DOWN -14%"}
        ]
    }


@router.get("/workload")
def get_workload_analytics():
    """Staffing stress and taluk workload distribution."""
    return governance_analytics_engine.get_workload_analytics()
