"""
GovAI Nexus - Phase 5 Infrastructure & Resource Monitoring Endpoints
Tracks roads, water treatment, power transformers, e-Sevai kiosks, and sanitation facilities.
Clearly labels demonstration telemetry without fabricating false live sensor connections.
"""
from fastapi import APIRouter, Query
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel

router = APIRouter(prefix="/infrastructure", tags=["Infrastructure & Resource Monitoring"])


class AssetRecord(BaseModel):
    id: str
    asset_code: str
    name: str
    category: str  # ROADS, WATER_SUPPLY, ELECTRICITY, PUBLIC_BUILDINGS, SANITATION
    district: str
    location: str
    latitude: float
    longitude: float
    health_score: float  # 0 to 100
    status: str  # OPERATIONAL, DEGRADED, MAINTENANCE_REQUIRED, CRITICAL
    last_inspected: str
    next_maintenance: str
    managed_by: str


INFRA_ASSETS: List[AssetRecord] = [
    AssetRecord(
        id="asset-01",
        asset_code="INFRA-RD-MAD-01",
        name="Madurai-Dindigul NH-7 Flyover Sector 4",
        category="ROADS",
        district="Madurai",
        location="Samayanallur Junction",
        latitude=9.9822,
        longitude=78.0725,
        health_score=88.5,
        status="OPERATIONAL",
        last_inspected="2026-10-18",
        next_maintenance="2027-04-15",
        managed_by="Highways Department (Madurai Circle)"
    ),
    AssetRecord(
        id="asset-02",
        asset_code="INFRA-WT-VAI-02",
        name="Vaigai Dam Raw Water Pumping Station B",
        category="WATER_SUPPLY",
        district="Madurai",
        location="Vaigai Pumping Main, Sholavandan",
        latitude=10.0240,
        longitude=77.9620,
        health_score=74.2,
        status="MAINTENANCE_REQUIRED",
        last_inspected="2026-10-25",
        next_maintenance="2026-11-08",
        managed_by="TWAD Board"
    ),
    AssetRecord(
        id="asset-03",
        asset_code="INFRA-EL-CHE-09",
        name="Guindy Industrial Substation 230/110 kV Transformer #3",
        category="ELECTRICITY",
        district="Chennai",
        location="Guindy Industrial Estate",
        latitude=13.0067,
        longitude=80.2025,
        health_score=95.0,
        status="OPERATIONAL",
        last_inspected="2026-10-22",
        next_maintenance="2027-01-20",
        managed_by="TANGEDCO (Tamil Nadu Generation and Distribution Corp)"
    ),
    AssetRecord(
        id="asset-04",
        asset_code="INFRA-BLD-CBE-04",
        name="Coimbatore District Integrated Collectorate & e-Sevai Mega Center",
        category="PUBLIC_BUILDINGS",
        district="Coimbatore",
        location="State Bank Road, Gopalapuram",
        latitude=11.0016,
        longitude=76.9628,
        health_score=98.0,
        status="OPERATIONAL",
        last_inspected="2026-10-12",
        next_maintenance="2027-06-30",
        managed_by="Public Works Department (Buildings)"
    ),
    AssetRecord(
        id="asset-05",
        asset_code="INFRA-SAN-TRC-01",
        name="Tiruchirappalli Corporation Biological Wastewater Treatment Plant",
        category="SANITATION",
        district="Tiruchirappalli",
        location="Panjapur, Trichy",
        latitude=10.7650,
        longitude=78.6820,
        health_score=68.4,
        status="DEGRADED",
        last_inspected="2026-10-29",
        next_maintenance="2026-11-04",
        managed_by="Tiruchirappalli City Corporation"
    )
]

INFRA_ALERTS = [
    {
        "id": "alt-01",
        "asset_code": "INFRA-SAN-TRC-01",
        "asset_name": "Tiruchirappalli Biological Wastewater Treatment Plant",
        "severity": "WARNING",
        "issue": "Aeration Basin 2 Dissolved Oxygen below threshold (1.4 mg/L)",
        "reported_at": "2026-10-31 06:15:00 UTC",
        "suggested_action": "Engage secondary blower unit and schedule sensor calibration crew.",
        "assigned_to": "Executive Engineer (Public Health, Trichy)",
        "status": "IN_PROGRESS"
    },
    {
        "id": "alt-02",
        "asset_code": "INFRA-WT-VAI-02",
        "asset_name": "Vaigai Dam Raw Water Pumping Station B",
        "severity": "CRITICAL",
        "issue": "Bearing vibration frequency on Pump 3 exceeds ISO limit (4.8 mm/s)",
        "reported_at": "2026-10-30 14:20:00 UTC",
        "suggested_action": "Switch load to Standby Pump 4; dismount impeller assembly for dynamic balancing.",
        "assigned_to": "TWAD Mechanical Division Madurai",
        "status": "OPEN"
    }
]


@router.get("/assets")
def list_infrastructure_assets(
    category: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """List physical and digital infrastructure assets with operational scores."""
    results = []
    for a in INFRA_ASSETS:
        if category and a.category != category.upper():
            continue
        if district and district.lower() not in a.district.lower():
            continue
        if status and a.status != status.upper():
            continue
        results.append(a.model_dump())
    
    avg_health = round(sum(a["health_score"] for a in results) / len(results), 1) if results else 100.0
    return {
        "total_assets": len(results),
        "average_health_score": avg_health,
        "assets": results,
        "data_provenance": "Authorized Department Asset Registers & IoT Gateway Simulators"
    }


@router.get("/locations")
def get_asset_geographic_coordinates():
    """GIS spatial coordinates for interactive map rendering."""
    return [
        {
            "id": a.id,
            "code": a.asset_code,
            "name": a.name,
            "category": a.category,
            "lat": a.latitude,
            "lng": a.longitude,
            "district": a.district,
            "status": a.status,
            "health": a.health_score
        }
        for a in INFRA_ASSETS
    ]


@router.get("/alerts")
def get_infrastructure_alerts():
    """Active maintenance alerts and AI priority suggestions."""
    return {
        "active_alerts_count": len(INFRA_ALERTS),
        "alerts": INFRA_ALERTS
    }


@router.get("/maintenance")
def get_maintenance_schedules():
    """Upcoming preventive and corrective maintenance jobs."""
    return [
        {
            "job_id": "maint-104",
            "asset_code": "INFRA-WT-VAI-02",
            "task": "Impeller bearing replacement & valve overhaul",
            "scheduled_date": "2026-11-04",
            "estimated_cost_inr": 185000,
            "status": "SCHEDULED",
            "priority": "HIGH"
        },
        {
            "job_id": "maint-105",
            "asset_code": "INFRA-RD-MAD-01",
            "task": "Bridge expansion joint sealant application",
            "scheduled_date": "2026-11-15",
            "estimated_cost_inr": 420000,
            "status": "TENDERED",
            "priority": "MEDIUM"
        }
    ]
