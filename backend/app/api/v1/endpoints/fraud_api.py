"""
GovAI Nexus - Fraud Intelligence & Anomaly Review Endpoints
Integrates with Officer Portal to enable human investigation of flagged alerts.
"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta

from backend.app.schemas.gov_schemas import (
    FraudAlertResponse, FraudInvestigationRequest
)

router = APIRouter(prefix="/fraud", tags=["Fraud Intelligence"])

_FRAUD_ALERTS_DB = [
    {
        "id": "frd_alt_01",
        "alert_number": "ALT-2026-0891",
        "related_entity_type": "service_application",
        "related_entity_id": "app_tn_88921",
        "risk_score": 0.89,
        "risk_category": "DUPLICATE_DOCUMENT_HASH",
        "evidence_summary": "Identical income certificate binary hash uploaded across two distinct applicant identity numbers in Tiruchirappalli district.",
        "investigation_status": "UNDER_INVESTIGATION",
        "created_at": datetime.utcnow() - timedelta(hours=3)
    },
    {
        "id": "frd_alt_02",
        "alert_number": "ALT-2026-0942",
        "related_entity_type": "scheme_benefit",
        "related_entity_id": "app_kmut_77189",
        "risk_score": 0.76,
        "risk_category": "ANOMALOUS_BANK_ACCOUNT",
        "evidence_summary": "Bank account IFSC indicates commercial corporate account instead of personal savings account for DBT disbursement in Salem district.",
        "investigation_status": "UNDER_INVESTIGATION",
        "created_at": datetime.utcnow() - timedelta(hours=8)
    },
    {
        "id": "frd_alt_03",
        "alert_number": "ALT-2026-1004",
        "related_entity_type": "service_application",
        "related_entity_id": "app_tn_91402",
        "risk_score": 0.68,
        "risk_category": "VELOCITY_SURGE",
        "evidence_summary": "28 certificates submitted from identical IP within 90 minutes. Intermediary operator suspected in Madurai South.",
        "investigation_status": "NEW",
        "created_at": datetime.utcnow() - timedelta(hours=14)
    }
]


@router.get("/alerts", response_model=List[FraudAlertResponse])
async def list_fraud_alerts():
    """Retrieves anomaly detection flags and risk indicators for officer investigation."""
    return [
        FraudAlertResponse(
            id=a["id"],
            alert_number=a["alert_number"],
            related_entity_type=a["related_entity_type"],
            related_entity_id=a["related_entity_id"],
            risk_score=a["risk_score"],
            risk_category=a["risk_category"],
            evidence_summary=a["evidence_summary"],
            investigation_status=a["investigation_status"],
            created_at=a["created_at"]
        )
        for a in _FRAUD_ALERTS_DB
    ]


@router.get("/alerts/{alert_id}", response_model=FraudAlertResponse)
async def get_fraud_alert(alert_id: str):
    """Retrieves full forensic details of a specific anomaly alert."""
    match = next((a for a in _FRAUD_ALERTS_DB if a["id"] == alert_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Fraud alert not found")
    return FraudAlertResponse(**match)


@router.post("/alerts/{alert_id}/investigate")
async def investigate_fraud_alert(alert_id: str, payload: FraudInvestigationRequest):
    """
    Records an authorized human officer's adjudication and formal notes.
    Prevents autonomous AI sanction without human review.
    """
    match = next((a for a in _FRAUD_ALERTS_DB if a["id"] == alert_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Fraud alert not found")

    match["investigation_status"] = payload.status
    match["officer_notes"] = payload.officer_notes
    match["adjudicated_at"] = datetime.utcnow().isoformat()

    return {
        "status": "ADJUDICATED",
        "alert_id": alert_id,
        "new_status": payload.status,
        "officer_notes": payload.officer_notes,
        "timestamp": datetime.utcnow().isoformat()
    }
