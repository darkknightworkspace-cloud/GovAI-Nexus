"""
GovAI Nexus - Phase 5 Transparency & Open Government Data Endpoints
Public government project tracker, sanctioned vs expenditure budgets,
and open dataset metadata strictly separated from authenticated citizen PII.
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel

router = APIRouter(tags=["Transparency & Open Government"])


class PublicProjectRecord(BaseModel):
    id: str
    project_code: str
    title_en: str
    title_ta: str
    department: str
    district: str
    description: str
    sanctioned_budget_cr: float
    expenditure_cr: float
    completion_percentage: float
    status: str  # PLANNING, SANCTIONED, IN_PROGRESS, COMPLETED, AUDITED
    start_date: str
    target_completion_date: str
    contractor: str
    milestones_total: int
    milestones_completed: int


PUBLIC_PROJECTS_CATALOG: List[PublicProjectRecord] = [
    PublicProjectRecord(
        id="proj-01",
        project_code="TN-INFRA-2024-009",
        title_en="Madurai High-Tech Smart Mobility Ring Corridor",
        title_ta="மதுரை அதிநவீன ஸ்மார்ட் போக்குவரத்து சுற்றுவட்ட சாலை",
        department="Highways & Minor Ports",
        district="Madurai",
        description="Four-lane intelligent bypass road reducing airport-to-industrial corridor transit by 35 minutes with smart CCTV and solar streetlighting.",
        sanctioned_budget_cr=485.50,
        expenditure_cr=382.10,
        completion_percentage=78.7,
        status="IN_PROGRESS",
        start_date="2024-03-15",
        target_completion_date="2026-12-31",
        contractor="Tamil Nadu Road Infrastructure Development Corp (TNRIDC)",
        milestones_total=8,
        milestones_completed=6
    ),
    PublicProjectRecord(
        id="proj-02",
        project_code="TN-WATER-2025-014",
        title_en="Cauvery Delta Underground Drainage & Desalination Augmentation",
        title_ta="காவிரி டெல்டா நிலத்தடி வடிகால் மற்றும் குடிநீர் மேம்பாட்டு திட்டம்",
        department="Municipal Administration & Water Supply",
        district="Thanjavur",
        description="Modernization of municipal water treatment plants and flood surge protection channels across 14 rural local bodies.",
        sanctioned_budget_cr=265.00,
        expenditure_cr=212.40,
        completion_percentage=80.1,
        status="IN_PROGRESS",
        start_date="2025-01-10",
        target_completion_date="2026-08-30",
        contractor="TWAD Board (Tamil Nadu Water Supply & Drainage Board)",
        milestones_total=6,
        milestones_completed=5
    ),
    PublicProjectRecord(
        id="proj-03",
        project_code="TN-EDU-2024-032",
        title_en="Perunthalaivar Kamarajar Model Schools & High-Tech Labs",
        title_ta="பெருந்தலைவர் காமராஜர் மாதிரி பள்ளிகள் மற்றும் உயர்தொழில்நுட்ப ஆய்வகங்கள்",
        department="School Education",
        district="Coimbatore",
        description="Establishment of 24 fully equipped STEM model schools with interactive smart classrooms and solar power backup.",
        sanctioned_budget_cr=120.00,
        expenditure_cr=118.50,
        completion_percentage=98.8,
        status="COMPLETED",
        start_date="2024-06-01",
        target_completion_date="2026-04-15",
        contractor="Public Works Department (Buildings Wing)",
        milestones_total=10,
        milestones_completed=10
    ),
    PublicProjectRecord(
        id="proj-04",
        project_code="TN-HLTH-2025-088",
        title_en="Kalaignar Memorial Multi-Super Speciality Oncology Facility",
        title_ta="கலைஞர் நினைவு உயர் சிறப்பு புற்றுநோய் மருத்துவ மையம்",
        department="Health & Family Welfare",
        district="Tiruchirappalli",
        description="350-bed modern cancer diagnostics, linear accelerator radiotherapy, and free DBT patient welfare complex.",
        sanctioned_budget_cr=340.00,
        expenditure_cr=245.80,
        completion_percentage=72.3,
        status="IN_PROGRESS",
        start_date="2025-02-01",
        target_completion_date="2027-03-31",
        contractor="TN Medical Services Corporation (TNMSC)",
        milestones_total=7,
        milestones_completed=5
    )
]

PUBLIC_DATASETS = [
    {
        "id": "ds-01",
        "title": "Tamil Nadu e-Sevai Service Transaction Volumes 2026",
        "department": "Information Technology and Digital Services",
        "category": "E-Governance",
        "format": "CSV",
        "records_count": 2845000,
        "file_size": "48.2 MB",
        "download_url": "/api/v1/public/datasets/ds-01/download",
        "last_updated": "2026-10-31",
        "license": "NDSAP Open Government Data (OGD) India"
    },
    {
        "id": "ds-02",
        "title": "District-wise Revenue Certificate Issuance & SLA Times",
        "department": "Revenue & Disaster Management",
        "category": "Revenue Administration",
        "format": "JSON",
        "records_count": 940200,
        "file_size": "18.5 MB",
        "download_url": "/api/v1/public/datasets/ds-02/download",
        "last_updated": "2026-10-30",
        "license": "NDSAP Open Government Data (OGD) India"
    },
    {
        "id": "ds-03",
        "title": "Statewide Highway Network Geo-tagged Asset Registry",
        "department": "Highways & Minor Ports",
        "category": "Infrastructure",
        "format": "GeoJSON",
        "records_count": 42100,
        "file_size": "12.4 MB",
        "download_url": "/api/v1/public/datasets/ds-03/download",
        "last_updated": "2026-10-28",
        "license": "Open Data Commons Open Database License (ODbL)"
    }
]


# Public Endpoints (Accessible without citizen authentication)
@router.get("/public/projects")
def list_public_projects(
    department: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """Public government project registry showing sanctioned budget vs expenditure."""
    results = []
    for p in PUBLIC_PROJECTS_CATALOG:
        if department and department.lower() not in p.department.lower():
            continue
        if district and district.lower() not in p.district.lower():
            continue
        if status and status.upper() != p.status.upper():
            continue
        results.append(p.model_dump())
    
    total_sanctioned = sum(p["sanctioned_budget_cr"] for p in results)
    total_spent = sum(p["expenditure_cr"] for p in results)
    
    return {
        "total_projects": len(results),
        "total_sanctioned_budget_cr": round(total_sanctioned, 2),
        "total_expenditure_recorded_cr": round(total_spent, 2),
        "state_expenditure_ratio": f"{round((total_spent / total_sanctioned) * 100, 1)}%" if total_sanctioned else "0%",
        "projects": results
    }


@router.get("/public/projects/{project_id}")
def get_public_project_details(project_id: str):
    """Detailed milestone timeline and expenditure audit for a specific public project."""
    for p in PUBLIC_PROJECTS_CATALOG:
        if p.id == project_id or p.project_code.lower() == project_id.lower():
            data = p.model_dump()
            data["milestones"] = [
                {"title": "Detailed Project Report (DPR) & Administrative Sanction", "status": "COMPLETED", "date": "2024-03-20"},
                {"title": "Competitive E-Tendering & Work Order Award", "status": "COMPLETED", "date": "2024-05-15"},
                {"title": "Phase 1 Civil Substructure & Groundwork", "status": "COMPLETED", "date": "2025-01-30"},
                {"title": "Phase 2 Structural Superstructure & Smart Sensors", "status": "IN_PROGRESS", "date": "2026-10-15"},
                {"title": "Statutory Quality Inspection & Commissioning", "status": "PENDING", "date": data["target_completion_date"]}
            ]
            return data
    raise HTTPException(status_code=404, detail="Project not found.")


@router.get("/public/datasets")
def list_public_datasets(category: Optional[str] = Query(None)):
    """Open Government Data (OGD) Catalog. Only anonymized public aggregate datasets."""
    if category:
        return [ds for ds in PUBLIC_DATASETS if ds["category"].lower() == category.lower()]
    return PUBLIC_DATASETS


@router.get("/public/reports")
def list_public_transparency_reports():
    """Published official government transparency and social audit reports."""
    return [
        {
            "id": "pub-rep-01",
            "title": "Tamil Nadu Digital Services Social Audit Annual Report 2025-26",
            "published_date": "2026-10-15",
            "authority": "Social Audit Society of Tamil Nadu (SASTN)",
            "format": "PDF",
            "size": "3.1 MB",
            "file_url": "/api/v1/public/reports/pub-rep-01/download"
        },
        {
            "id": "pub-rep-02",
            "title": "Kalaignar Magalir Urimai Thogai Transparent DBT Disbursement Registry",
            "published_date": "2026-10-20",
            "authority": "Special Programme Implementation Dept",
            "format": "PDF",
            "size": "4.8 MB",
            "file_url": "/api/v1/public/reports/pub-rep-02/download"
        }
    ]


@router.get("/transparency/departments")
def get_transparency_by_departments():
    """Departmental transparency index and budget utilization rates."""
    return [
        {
            "department": "Revenue & Disaster Management",
            "sanctioned_budget_cr": 8420.0,
            "expenditure_cr": 7910.4,
            "utilization_pct": 93.9,
            "active_infrastructure_projects": 4,
            "published_datasets_count": 8,
            "social_audit_score": 96.2
        },
        {
            "department": "Highways & Minor Ports",
            "sanctioned_budget_cr": 14200.0,
            "expenditure_cr": 11840.5,
            "utilization_pct": 83.4,
            "active_infrastructure_projects": 12,
            "published_datasets_count": 6,
            "social_audit_score": 91.8
        },
        {
            "department": "Municipal Administration & Water Supply",
            "sanctioned_budget_cr": 9850.0,
            "expenditure_cr": 8640.2,
            "utilization_pct": 87.7,
            "active_infrastructure_projects": 9,
            "published_datasets_count": 7,
            "social_audit_score": 94.0
        }
    ]


@router.get("/transparency/districts")
def get_transparency_by_districts():
    """District-level public project distribution and expenditure transparency."""
    return [
        {"district": "Chennai", "ongoing_projects": 8, "total_sanctioned_cr": 1840.0, "completion_avg": 81.2},
        {"district": "Madurai", "ongoing_projects": 6, "total_sanctioned_cr": 920.5, "completion_avg": 76.5},
        {"district": "Coimbatore", "ongoing_projects": 7, "total_sanctioned_cr": 1140.0, "completion_avg": 84.8},
        {"district": "Tiruchirappalli", "ongoing_projects": 5, "total_sanctioned_cr": 680.0, "completion_avg": 79.4},
        {"district": "Salem", "ongoing_projects": 4, "total_sanctioned_cr": 540.2, "completion_avg": 82.0}
    ]
