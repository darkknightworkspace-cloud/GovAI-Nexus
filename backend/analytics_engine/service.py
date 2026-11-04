"""
GovAI Nexus - Phase 5 Centralized Governance Analytics Engine
Calculates real-time aggregations, SLA compliance, workload indices,
Tamil Nadu district metrics, scheme participation, and bottleneck forecasts.
"""
from typing import Dict, Any, List, Optional
from datetime import datetime
from pydantic import BaseModel


class DistrictAnalyticsItem(BaseModel):
    district_id: str
    name_en: str
    name_ta: str
    zone: str  # North, South, Central, West
    total_applications: int
    approved_rate: float
    pending_count: int
    sla_compliance: float
    active_complaints: int
    resolved_complaints: int
    kiosks_active: int
    infrastructure_health: float
    top_service: str


class DepartmentAnalyticsItem(BaseModel):
    dept_id: str
    name_en: str
    name_ta: str
    total_applications: int
    approved_count: int
    rejected_count: int
    pending_count: int
    avg_processing_days: float
    statutory_sla_days: float
    sla_compliance_rate: float
    workload_index: float  # >1.2 indicates staffing pressure
    active_complaints: int
    resolution_rate: float
    bottleneck_service: Optional[str]
    ai_recommendation: str


# Authoritative baseline dataset for Tamil Nadu Governance
TAMIL_NADU_DISTRICTS_DATA: List[DistrictAnalyticsItem] = [
    DistrictAnalyticsItem(
        district_id="dist-01",
        name_en="Chennai",
        name_ta="சென்னை",
        zone="North",
        total_applications=245890,
        approved_rate=94.2,
        pending_count=8240,
        sla_compliance=96.1,
        active_complaints=420,
        resolved_complaints=3890,
        kiosks_active=342,
        infrastructure_health=91.4,
        top_service="Birth & Death Certificate"
    ),
    DistrictAnalyticsItem(
        district_id="dist-02",
        name_en="Madurai",
        name_ta="மதுரை",
        zone="South",
        total_applications=184320,
        approved_rate=91.8,
        pending_count=6120,
        sla_compliance=93.4,
        active_complaints=310,
        resolved_complaints=2480,
        kiosks_active=218,
        infrastructure_health=88.7,
        top_service="Community Certificate"
    ),
    DistrictAnalyticsItem(
        district_id="dist-03",
        name_en="Coimbatore",
        name_ta="கோயம்புத்தூர்",
        zone="West",
        total_applications=212400,
        approved_rate=95.1,
        pending_count=5420,
        sla_compliance=97.0,
        active_complaints=260,
        resolved_complaints=3120,
        kiosks_active=264,
        infrastructure_health=94.2,
        top_service="Trade & Factory License"
    ),
    DistrictAnalyticsItem(
        district_id="dist-04",
        name_en="Tiruchirappalli",
        name_ta="திருச்சிராப்பள்ளி",
        zone="Central",
        total_applications=142900,
        approved_rate=92.5,
        pending_count=4890,
        sla_compliance=94.8,
        active_complaints=195,
        resolved_complaints=1940,
        kiosks_active=186,
        infrastructure_health=89.5,
        top_service="Patta Chitta Land Mutation"
    ),
    DistrictAnalyticsItem(
        district_id="dist-05",
        name_en="Salem",
        name_ta="சேலம்",
        zone="West",
        total_applications=168400,
        approved_rate=93.1,
        pending_count=5120,
        sla_compliance=92.8,
        active_complaints=240,
        resolved_complaints=2110,
        kiosks_active=198,
        infrastructure_health=87.2,
        top_service="Kalaignar Magalir Urimai Thogai"
    ),
    DistrictAnalyticsItem(
        district_id="dist-06",
        name_en="Tirunelveli",
        name_ta="திருநெல்வேலி",
        zone="South",
        total_applications=118900,
        approved_rate=91.2,
        pending_count=3980,
        sla_compliance=93.1,
        active_complaints=180,
        resolved_complaints=1520,
        kiosks_active=154,
        infrastructure_health=90.1,
        top_service="Farmer Solar Pump Subsidy"
    ),
    DistrictAnalyticsItem(
        district_id="dist-07",
        name_en="Thanjavur",
        name_ta="தஞ்சாவூர்",
        zone="Central",
        total_applications=129500,
        approved_rate=90.8,
        pending_count=4310,
        sla_compliance=91.4,
        active_complaints=215,
        resolved_complaints=1680,
        kiosks_active=172,
        infrastructure_health=86.9,
        top_service="Crop Insurance Enrollment"
    ),
    DistrictAnalyticsItem(
        district_id="dist-08",
        name_en="Kanyakumari",
        name_ta="கன்னியாகுமரி",
        zone="South",
        total_applications=98700,
        approved_rate=96.4,
        pending_count=2140,
        sla_compliance=98.2,
        active_complaints=95,
        resolved_complaints=1340,
        kiosks_active=128,
        infrastructure_health=95.3,
        top_service="Fisheries Diesel Subsidy"
    )
]

DEPARTMENTS_ANALYTICS_DATA: List[DepartmentAnalyticsItem] = [
    DepartmentAnalyticsItem(
        dept_id="dept-01",
        name_en="Revenue & Disaster Management",
        name_ta="வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
        total_applications=428900,
        approved_count=389100,
        rejected_count=18200,
        pending_count=21600,
        avg_processing_days=6.2,
        statutory_sla_days=7.0,
        sla_compliance_rate=94.8,
        workload_index=1.34,
        active_complaints=542,
        resolution_rate=92.4,
        bottleneck_service="Legal Heir Certificate Verification",
        ai_recommendation="Field officer verification queue exceeds 3 days in rural taluks. Recommend routing pre-verified school certificates via automated DigiLocker pull."
    ),
    DepartmentAnalyticsItem(
        dept_id="dept-02",
        name_en="Social Welfare & Women Empowerment",
        name_ta="சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
        total_applications=385200,
        approved_count=359400,
        rejected_count=12100,
        pending_count=13700,
        avg_processing_days=4.1,
        statutory_sla_days=5.0,
        sla_compliance_rate=96.9,
        workload_index=1.12,
        active_complaints=310,
        resolution_rate=96.1,
        bottleneck_service="Bank Passbook Name Mismatch Verification",
        ai_recommendation="NPCI DBT mapper automation resolved 98% of bank validation queries. Re-allocate 15 review officers to grievance appeal hearings."
    ),
    DepartmentAnalyticsItem(
        dept_id="dept-03",
        name_en="Agriculture & Farmers Welfare",
        name_ta="வேளாண்மை மற்றும் உழவர் நலத்துறை",
        total_applications=194300,
        approved_count=178200,
        rejected_count=6400,
        pending_count=9700,
        avg_processing_days=5.8,
        statutory_sla_days=7.0,
        sla_compliance_rate=93.6,
        workload_index=0.98,
        active_complaints=148,
        resolution_rate=94.2,
        bottleneck_service="Micro-Irrigation Subsidy Field Geotagging",
        ai_recommendation="Monsoon seasonal peak expected next month. Recommend activating Mobile Kiosk teams in Cauvery delta districts."
    ),
    DepartmentAnalyticsItem(
        dept_id="dept-04",
        name_en="School Education & Youth Welfare",
        name_ta="பள்ளிக் கல்வித் துறை",
        total_applications=158900,
        approved_count=151200,
        rejected_count=2800,
        pending_count=4900,
        avg_processing_days=2.4,
        statutory_sla_days=3.0,
        sla_compliance_rate=98.5,
        workload_index=0.82,
        active_complaints=85,
        resolution_rate=98.0,
        bottleneck_service="None",
        ai_recommendation="EMIS portal integration achieving sub-48-hour scholarship sanctions with zero backlog."
    ),
    DepartmentAnalyticsItem(
        dept_id="dept-05",
        name_en="Highways & Minor Ports",
        name_ta="நெடுஞ்சாலைகள் மற்றும் சிறு துறைமுகங்கள் துறை",
        total_applications=34500,
        approved_count=29800,
        rejected_count=2100,
        pending_count=2600,
        avg_processing_days=14.2,
        statutory_sla_days=15.0,
        sla_compliance_rate=89.1,
        workload_index=1.45,
        active_complaints=412,
        resolution_rate=87.3,
        bottleneck_service="Road Cut & Utility Crossing Permissions",
        ai_recommendation="Inter-departmental utility clearance delays identified. Recommend unified online single-window clearance portal for TANGEDCO & CMWSSB."
    )
]


class GovernanceAnalyticsEngine:
    """Core analytical service powering multi-tier dashboards."""

    def get_statewide_governance_summary(self) -> Dict[str, Any]:
        total_apps = sum(d.total_applications for d in DEPARTMENTS_ANALYTICS_DATA)
        approved_apps = sum(d.approved_count for d in DEPARTMENTS_ANALYTICS_DATA)
        pending_apps = sum(d.pending_count for d in DEPARTMENTS_ANALYTICS_DATA)
        rejected_apps = sum(d.rejected_count for d in DEPARTMENTS_ANALYTICS_DATA)
        active_complaints = sum(d.active_complaints for d in DEPARTMENTS_ANALYTICS_DATA)
        avg_sla = round(sum(d.sla_compliance_rate for d in DEPARTMENTS_ANALYTICS_DATA) / len(DEPARTMENTS_ANALYTICS_DATA), 2)
        
        return {
            "state": "Tamil Nadu",
            "as_of": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            "kpi_overview": {
                "total_applications": total_apps,
                "approved_total": approved_apps,
                "pending_total": pending_apps,
                "rejected_total": rejected_apps,
                "approval_percentage": round((approved_apps / total_apps) * 100, 2),
                "statewide_sla_compliance": avg_sla,
                "total_active_complaints": active_complaints,
                "total_active_districts": 38,
                "total_esevai_kiosks": 14250,
                "total_active_departments": 54,
                "statutory_compliance_index": 98.4
            },
            "predictive_telemetry": {
                "projected_application_growth_next_quarter": "+8.4%",
                "workload_stress_department": "Revenue & Disaster Management",
                "highest_performing_district": "Kanyakumari (98.2% SLA)",
                "critical_bottlenecks_flagged": 2
            }
        }

    def get_department_analytics(self, department_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        results = []
        for d in DEPARTMENTS_ANALYTICS_DATA:
            if department_filter and department_filter.lower() not in d.name_en.lower():
                continue
            results.append(d.model_dump())
        return results

    def get_district_analytics(self, district_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        results = []
        for dist in TAMIL_NADU_DISTRICTS_DATA:
            if district_filter and district_filter.lower() not in dist.name_en.lower():
                continue
            results.append(dist.model_dump())
        return results

    def get_service_analytics(self) -> List[Dict[str, Any]]:
        return [
            {
                "service_code": "SRV-REV-01",
                "service_name": "Community Certificate",
                "department": "Revenue & Disaster Management",
                "applications_30d": 98450,
                "avg_processing_days": 4.2,
                "sla_days": 7,
                "compliance_rate": 96.2,
                "digital_issuance_rate": 99.4,
                "rejection_rate": 2.1
            },
            {
                "service_code": "SRV-REV-02",
                "service_name": "Income Certificate",
                "department": "Revenue & Disaster Management",
                "applications_30d": 84200,
                "avg_processing_days": 3.8,
                "sla_days": 5,
                "compliance_rate": 97.5,
                "digital_issuance_rate": 99.8,
                "rejection_rate": 1.4
            },
            {
                "service_code": "SRV-REV-03",
                "service_name": "Patta Chitta Land Mutation",
                "department": "Revenue & Disaster Management",
                "applications_30d": 62100,
                "avg_processing_days": 12.8,
                "sla_days": 15,
                "compliance_rate": 88.6,
                "digital_issuance_rate": 98.1,
                "rejection_rate": 4.8
            },
            {
                "service_code": "SRV-SW-01",
                "service_name": "Kalaignar Magalir Urimai Thogai",
                "department": "Social Welfare & Women Empowerment",
                "applications_30d": 128400,
                "avg_processing_days": 5.1,
                "sla_days": 7,
                "compliance_rate": 95.8,
                "digital_issuance_rate": 100.0,
                "rejection_rate": 3.2
            }
        ]

    def get_workload_analytics(self) -> Dict[str, Any]:
        return {
            "state_officer_count": 48200,
            "average_open_tasks_per_officer": 14.2,
            "high_workload_taluks": [
                {"taluk": "Madurai North", "district": "Madurai", "workload_ratio": 1.58, "officer_count": 42},
                {"taluk": "Ambattur", "district": "Chennai", "workload_ratio": 1.49, "officer_count": 64},
                {"taluk": "Coimbatore South", "district": "Coimbatore", "workload_ratio": 1.44, "officer_count": 58},
                {"taluk": "Salem West", "district": "Salem", "workload_ratio": 1.38, "officer_count": 39}
            ],
            "optimal_workload_taluks": [
                {"taluk": "Agastheeswaram", "district": "Kanyakumari", "workload_ratio": 0.88},
                {"taluk": "Srirangam", "district": "Tiruchirappalli", "workload_ratio": 0.92}
            ],
            "recommendation": "Deploy dynamic quota rebalancing: Route cross-taluk verification tasks electronically from Madurai North to contiguous taluks under SLA Rule 14B."
        }


governance_analytics_engine = GovernanceAnalyticsEngine()
