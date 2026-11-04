"""
GovAI Nexus - Grievance & Complaint Redressal Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    ComplaintCreateRequest, ComplaintResponse, ComplaintUpdateRequest
)
from backend.app.core.security import get_current_user

router = APIRouter(prefix="/complaints", tags=["Grievances & CM Helpline"])

COMPLAINTS_DB: List[Dict[str, Any]] = [
    {
        "id": "cmp-01",
        "complaint_number": "TN-GRV-2026-10492",
        "department_name": "Revenue and Disaster Management",
        "district": "Madurai",
        "category": "Service Delay",
        "subject": "Delay in issuing legal heir certificate beyond 15-day SLA",
        "description": "Application submitted on 01 Oct 2026 at Madurai North Taluk office. Field verification by VAO pending.",
        "priority": "HIGH",
        "status": "IN_PROGRESS",
        "created_at": datetime(2026, 10, 16, 10, 30),
        "resolved_at": None,
        "user_id": "usr_citizen_anandhi"
    },
    {
        "id": "cmp-02",
        "complaint_number": "TN-GRV-2026-10411",
        "department_name": "Municipal Administration and Water Supply",
        "district": "Chennai",
        "category": "Infrastructure Issue",
        "subject": "Drinking water pipeline leak on North Usman Road",
        "description": "Substantial water wastage near bus stop since Monday morning.",
        "priority": "URGENT",
        "status": "RESOLVED",
        "created_at": datetime(2026, 10, 20, 8, 45),
        "resolved_at": datetime(2026, 10, 21, 14, 0),
        "user_id": "usr_citizen_soundar"
    }
]


@router.get("", response_model=List[ComplaintResponse])
async def list_complaints(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Retrieves complaints accessible to the authenticated citizen or officer."""
    return [ComplaintResponse(**c) for c in COMPLAINTS_DB]


@router.post("", response_model=ComplaintResponse, status_code=status.HTTP_201_CREATED)
async def lodge_complaint(
    payload: ComplaintCreateRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Submits a new grievance and allocates a state CM Helpline tracking reference."""
    cmp_num = f"TN-GRV-2026-{len(COMPLAINTS_DB) + 10500}"
    new_cmp = {
        "id": f"cmp-{len(COMPLAINTS_DB) + 1:02d}",
        "complaint_number": cmp_num,
        "department_name": payload.department_id,
        "district": payload.district_id,
        "category": payload.category,
        "subject": payload.subject,
        "description": payload.description,
        "priority": payload.priority,
        "status": "SUBMITTED",
        "created_at": datetime.utcnow(),
        "resolved_at": None,
        "user_id": current_user["id"]
    }
    COMPLAINTS_DB.insert(0, new_cmp)
    return ComplaintResponse(**new_cmp)


@router.patch("/{complaint_id}/update", response_model=ComplaintResponse)
async def update_complaint_status(complaint_id: str, payload: ComplaintUpdateRequest):
    """Updates complaint resolution timeline and internal notes."""
    for c in COMPLAINTS_DB:
        if c["id"] == complaint_id or c["complaint_number"] == complaint_id:
            c["status"] = payload.new_status
            if payload.new_status in ["RESOLVED", "CLOSED"]:
                c["resolved_at"] = datetime.utcnow()
            return ComplaintResponse(**c)

    raise HTTPException(status_code=404, detail="Complaint not found.")
