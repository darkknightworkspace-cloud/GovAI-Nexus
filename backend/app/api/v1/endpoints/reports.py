"""
GovAI Nexus - Phase 5 Business Intelligence & Report Generation Endpoints
Provides asynchronous report scheduling, catalog listing, and secure report downloads.
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List, Dict, Any

from backend.reporting_engine.service import reporting_engine_service, ReportJobRequest

router = APIRouter(prefix="/reports", tags=["Reporting & BI Engine"])


@router.post("/generate")
def generate_report(request: ReportJobRequest):
    """Trigger on-demand background generation of department/district/governance reports."""
    return reporting_engine_service.generate_report(request)


@router.get("")
def list_reports(report_type: Optional[str] = Query(None, description="Filter by report category")):
    """List available generated reports with status and size."""
    return reporting_engine_service.list_reports(report_type)


@router.get("/{report_id}")
def get_report_status(report_id: str):
    """Get status and metadata for a specific report job."""
    report = reporting_engine_service.get_report_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/{report_id}/download")
def download_report(report_id: str):
    """Secure verified payload download endpoint for authenticated administrative roles."""
    result = reporting_engine_service.get_download_payload(report_id)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result
