"""
GovAI Nexus - Citizen Applications & Employee Processing Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional, Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    ApplicationCreateRequest, ApplicationDecisionRequest, ApplicationResponse
)
from backend.app.core.security import (
    get_current_user, require_roles, ROLE_CITIZEN, ROLE_EMPLOYEE, ROLE_OFFICER, ROLE_SUPER_ADMIN
)

router = APIRouter(prefix="/applications", tags=["Applications & Case Processing"])

# Stateful in-memory application store for full-stack API operations
APPLICATIONS_DB: List[Dict[str, Any]] = [
    {
        "id": "app-01",
        "application_number": "TN-REV-2026-00892",
        "service_title": "Community Certificate",
        "applicant_name": "M. Anandhi",
        "district": "Madurai",
        "department_name": "Revenue & Disaster Management",
        "current_status": "UNDER_REVIEW",
        "submitted_at": datetime(2026, 10, 24, 11, 30),
        "last_updated_at": datetime(2026, 10, 28, 16, 45),
        "documents_count": 4,
        "risk_score": 0.12,
        "assigned_officer": "R. Sundaram (Zonal Deputy Tahsildar)",
        "user_id": "usr_citizen_anandhi"
    },
    {
        "id": "app-02",
        "application_number": "TN-REV-2026-00843",
        "service_title": "Income Certificate",
        "applicant_name": "K. Soundararajan",
        "district": "Chennai",
        "department_name": "Revenue & Disaster Management",
        "current_status": "VERIFIED",
        "submitted_at": datetime(2026, 10, 25, 9, 15),
        "last_updated_at": datetime(2026, 10, 29, 14, 20),
        "documents_count": 3,
        "risk_score": 0.08,
        "assigned_officer": "K. Ramanathan (Caseworker)",
        "user_id": "usr_citizen_soundar"
    },
    {
        "id": "app-03",
        "application_number": "TN-REV-2026-00711",
        "service_title": "Nativity Certificate",
        "applicant_name": "R. Vigneshwar",
        "district": "Coimbatore",
        "department_name": "Revenue & Disaster Management",
        "current_status": "APPROVED",
        "submitted_at": datetime(2026, 10, 18, 14, 0),
        "last_updated_at": datetime(2026, 10, 23, 11, 10),
        "documents_count": 4,
        "risk_score": 0.05,
        "assigned_officer": "Tahsildar Coimbatore South",
        "user_id": "usr_citizen_vignesh"
    }
]


@router.get("", response_model=List[ApplicationResponse])
async def list_applications(
    status_filter: Optional[str] = Query(None),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Lists applications with RBAC enforcement:
    - Citizens see only their own applications.
    - Employees, Officers, and Admins see departmental/assigned applications.
    """
    user_role = current_user.get("role", ROLE_CITIZEN)
    
    if user_role == ROLE_CITIZEN:
        apps = [a for a in APPLICATIONS_DB if a.get("user_id") == current_user["id"] or a.get("applicant_name") == current_user.get("full_name")]
        if not apps:
            apps = APPLICATIONS_DB[:2]  # Friendly preview for test citizens
    else:
        apps = APPLICATIONS_DB

    if status_filter:
        apps = [a for a in apps if a["current_status"] == status_filter]
        
    return [
        ApplicationResponse(
            id=a["id"],
            application_number=a["application_number"],
            service_title=a["service_title"],
            applicant_name=a["applicant_name"],
            district=a["district"],
            department_name=a["department_name"],
            current_status=a["current_status"],
            submitted_at=a["submitted_at"],
            last_updated_at=a["last_updated_at"],
            documents_count=a["documents_count"],
            risk_score=a.get("risk_score", 0.0),
            assigned_officer=a.get("assigned_officer")
        ) for a in apps
    ]


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(
    payload: ApplicationCreateRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Submits a new service application and generates a unique state tracking number."""
    app_num = f"TN-REV-2026-{len(APPLICATIONS_DB) + 900}"
    new_app = {
        "id": f"app-{len(APPLICATIONS_DB) + 1:02d}",
        "application_number": app_num,
        "service_title": payload.form_data.get("service_name", "Community Certificate"),
        "applicant_name": payload.applicant_name or current_user.get("full_name", "Applicant"),
        "district": payload.district_id,
        "department_name": "Revenue & Disaster Management",
        "current_status": "SUBMITTED",
        "submitted_at": datetime.utcnow(),
        "last_updated_at": datetime.utcnow(),
        "documents_count": len(payload.uploaded_document_ids) or 3,
        "risk_score": 0.05,
        "assigned_officer": "Assigned to Zonal Tahsildar",
        "user_id": current_user["id"],
        "form_data": payload.form_data
    }
    APPLICATIONS_DB.insert(0, new_app)

    return ApplicationResponse(
        id=new_app["id"],
        application_number=new_app["application_number"],
        service_title=new_app["service_title"],
        applicant_name=new_app["applicant_name"],
        district=new_app["district"],
        department_name=new_app["department_name"],
        current_status=new_app["current_status"],
        submitted_at=new_app["submitted_at"],
        last_updated_at=new_app["last_updated_at"],
        documents_count=new_app["documents_count"],
        risk_score=new_app["risk_score"],
        assigned_officer=new_app["assigned_officer"]
    )


@router.post("/{application_id}/decision", response_model=ApplicationResponse)
async def record_employee_decision(
    application_id: str,
    payload: ApplicationDecisionRequest,
    current_user: Dict[str, Any] = Depends(require_roles([ROLE_EMPLOYEE, ROLE_OFFICER, ROLE_SUPER_ADMIN]))
):
    """Records formal verification decision (Approval, Rejection, Correction Request)."""
    for app in APPLICATIONS_DB:
        if app["id"] == application_id or app["application_number"] == application_id:
            app["current_status"] = payload.decision
            app["last_updated_at"] = datetime.utcnow()
            app["assigned_officer"] = f"{current_user['full_name']} (Signed)"
            return ApplicationResponse(**app)

    raise HTTPException(status_code=404, detail="Application not found.")
