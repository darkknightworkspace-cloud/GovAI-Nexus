"""
GovAI Nexus - Government Services & Schemes Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from backend.app.schemas.gov_schemas import (
    GovernmentServiceResponse, GovernmentSchemeResponse,
    EligibilityCheckRequest, EligibilityCheckResponse
)

router = APIRouter(tags=["Services & Schemes"])

SAMPLE_SERVICES = [
    GovernmentServiceResponse(
        id="srv-01",
        department_id="dept-rev-01",
        department_name="Revenue & Disaster Management",
        category="Certificates & Records",
        title_en="Community Certificate",
        title_ta="சாதிச் சான்றிதழ்",
        description_en="Official permanent community verification certificate for educational reservations and government benefits.",
        description_ta="கல்வி இடஒதுக்கீடு மற்றும் அரசு நலத்திட்டங்களுக்கான அதிகாரப்பூர்வ நிரந்தர சாதிச் சான்றிதழ்.",
        processing_time_days=7,
        service_fee=60.0,
        required_documents=["Aadhaar Card", "Ration Card", "Parent School TC", "Applicant Photograph"],
        is_active=True
    ),
    GovernmentServiceResponse(
        id="srv-02",
        department_id="dept-rev-01",
        department_name="Revenue & Disaster Management",
        category="Certificates & Records",
        title_en="Income Certificate",
        title_ta="வருமானச் சான்றிதழ்",
        description_en="Annual family income certificate required for scholarships and economic welfare schemes.",
        description_ta="கல்வி உதவித்தொகை மற்றும் பொருளாதார நலத்திட்டங்களுக்கான குடும்ப ஆண்டு வருமானச் சான்றிதழ்.",
        processing_time_days=5,
        service_fee=60.0,
        required_documents=["Salary Slip / Tax Return", "Ration Card", "Self Declaration", "Land Holdings Proof"],
        is_active=True
    ),
    GovernmentServiceResponse(
        id="srv-03",
        department_id="dept-rev-01",
        department_name="Revenue & Disaster Management",
        category="Certificates & Records",
        title_en="Nativity Certificate",
        title_ta="இருப்பிடச் சான்றிதழ்",
        description_en="Proof of continuous residence in Tamil Nadu for state quota admissions.",
        description_ta="மாநில ஒதுக்கீட்டு சேர்க்கைகளுக்கான தமிழ்நாட்டில் தொடர் வசிப்பிடச் சான்று.",
        processing_time_days=5,
        service_fee=60.0,
        required_documents=["Birth Certificate", "School Study Certificate", "Ration Card", "EB Card"],
        is_active=True
    ),
    GovernmentServiceResponse(
        id="srv-05",
        department_id="dept-surv-01",
        department_name="Survey & Settlement",
        category="Land & Property",
        title_en="Patta Chitta & FMB Transfer",
        title_ta="பட்டா சிட்டா மற்றும் புல வரைபடம் மாற்றம்",
        description_en="Online mutation and transfer of land ownership records and field measurement books.",
        description_ta="நில உரிமை பதிவுகள் மற்றும் புல வரைபடங்களின் இணையவழி பெயர் மாற்றம்.",
        processing_time_days=15,
        service_fee=100.0,
        required_documents=["Registered Sale Deed", "Encumbrance Certificate", "Previous Patta Copy", "Tax Receipt"],
        is_active=True
    ),
    GovernmentServiceResponse(
        id="srv-09",
        department_id="dept-agr-01",
        department_name="Agriculture & Farmers Welfare",
        category="Agriculture & Rural",
        title_en="Chief Minister Solar Pump Scheme",
        title_ta="முதல்வர் சூரியசக்தி பம்புசெட் திட்டம்",
        description_en="70% subsidy for off-grid standalone solar agriculture irrigation pumps.",
        description_ta="விவசாயிகளுக்கு 70% மானியத்தில் மின்சார வலைப்பின்னல் இல்லாத சூரியசக்தி பம்புசெட்.",
        processing_time_days=21,
        service_fee=0.0,
        required_documents=["Patta Copy", "Adangal", "Small Farmer Certificate", "Borewell Feasibility Report"],
        is_active=True
    )
]

SAMPLE_SCHEMES = [
    GovernmentSchemeResponse(
        id="sch-01",
        department_name="Social Welfare & Women Empowerment",
        category="Women Welfare",
        title_en="Kalaignar Magalir Urimai Thogai",
        title_ta="கலைஞர் மகளிர் உரிமைத் திட்டம்",
        benefit_summary_en="₹1,000 per month direct benefit transfer to women heads of eligible households.",
        benefit_summary_ta="தகுதிவாய்ந்த குடும்ப தலைவிகளுக்கு மாதம் ₹1,000 நேரடி வங்கிப் பரிமாற்றம்.",
        eligibility_criteria=[{"key": "gender", "value": "Female"}, {"key": "max_annual_income", "value": 250000}],
        deadline="Ongoing Open Enrollment",
        target_group="Women Heads of Families (Income < ₹2.5 Lakhs)"
    ),
    GovernmentSchemeResponse(
        id="sch-02",
        department_name="Higher Education Department",
        category="Student Welfare",
        title_en="Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar)",
        title_ta="புதுமைப் பெண் திட்டம்",
        benefit_summary_en="₹1,000 per month financial aid for girls who studied in govt schools through graduation.",
        benefit_summary_ta="அரசுப் பள்ளிகளில் பயின்று உயர்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 நிதியுதவி.",
        eligibility_criteria=[{"key": "gender", "value": "Female"}, {"key": "school_type", "value": "Government"}],
        deadline="Academic Year 2026-27",
        target_group="Girl Students in Higher Education"
    )
]


@router.get("/services", response_model=List[GovernmentServiceResponse])
async def list_services(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    """Retrieves and filters services by category and search keyword."""
    results = SAMPLE_SERVICES
    if category and category != "All":
        results = [s for s in results if s.category == category]
    if search:
        s_lower = search.lower()
        results = [
            s for s in results 
            if s_lower in s.title_en.lower() or s_lower in s.title_ta or s_lower in s.description_en.lower()
        ]
    return results


@router.get("/services/{service_id}", response_model=GovernmentServiceResponse)
async def get_service(service_id: str):
    """Retrieves a single service by ID with required document checklist."""
    for s in SAMPLE_SERVICES:
        if s.id == service_id:
            return s
    raise HTTPException(status_code=404, detail="Service not found.")


@router.get("/schemes", response_model=List[GovernmentSchemeResponse])
async def list_schemes(category: Optional[str] = Query(None)):
    """Retrieves active state welfare schemes."""
    if category and category != "All":
        return [sch for sch in SAMPLE_SCHEMES if sch.category == category]
    return SAMPLE_SCHEMES


@router.post("/schemes/check-eligibility", response_model=EligibilityCheckResponse)
async def check_eligibility(payload: EligibilityCheckRequest):
    """Checks demographic and financial criteria against welfare rules."""
    eligible = []
    if payload.gender.lower() == "female" and payload.annual_income_inr <= 250000:
        eligible.append({
            "scheme_id": "sch-01",
            "title_en": "Kalaignar Magalir Urimai Thogai",
            "title_ta": "கலைஞர் மகளிர் உரிமைத் திட்டம்",
            "benefit": "₹1,000 / month direct bank transfer",
            "department": "Social Welfare & Women Empowerment",
            "match_confidence": 0.96
        })
    if payload.age <= 25 and payload.gender.lower() == "female":
        eligible.append({
            "scheme_id": "sch-02",
            "title_en": "Pudhumai Penn Scheme",
            "title_ta": "புதுமைப் பெண் திட்டம்",
            "benefit": "₹1,000 / month higher education assistance",
            "department": "Higher Education",
            "match_confidence": 0.92
        })
    return EligibilityCheckResponse(eligible_schemes=eligible)
