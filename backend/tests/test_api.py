"""
GovAI Nexus - Automated Pytest Suite for Python FastAPI REST Endpoints
Validates compliance with Phase 3 Specifications across all 6 portal domains.
"""
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_system_health():
    """Verify system health endpoint returns 200 OK and correct Tamil Nadu configuration."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["state"] == "Tamil Nadu"
    assert "ta" in data["supported_languages"]
    assert "en" in data["supported_languages"]


def test_auth_registration():
    """Verify citizen registration endpoint creates user and returns JWT token."""
    payload = {
        "email": "anandhi.m@tn.gov.in",
        "phone_number": "9842100000",
        "full_name": "M. Anandhi",
        "password": "SecurePassword123!",
        "preferred_language": "ta",
        "dpdp_consent_accepted": True
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code in [200, 201]
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert "CITIZEN" in data["roles"]


def test_auth_login():
    """Verify citizen & officer login authentication."""
    payload = {
        "username_or_email": "citizen@tn.gov.in",
        "password": "SecurePassword123!"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user_type"] == "citizen"


def test_list_services():
    """Verify retrieval of government services catalog."""
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    services = response.json()
    assert len(services) >= 1
    assert any(s["title_en"] == "Community Certificate" for s in services)


def test_scheme_eligibility():
    """Verify automated AI eligibility engine for Tamil Nadu welfare schemes."""
    payload = {
        "monthly_income": 18000,
        "district": "Madurai",
        "category": "BC",
        "is_student": False,
        "is_female_head_of_family": True
    }
    response = client.post("/api/v1/schemes/check-eligibility", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "eligible_schemes" in data
    assert len(data["eligible_schemes"]) > 0
    assert any("Kalaignar Magalir Urimai" in s["title_en"] for s in data["eligible_schemes"])


def test_application_submission_and_tracking():
    """Verify citizen can submit a new certificate application."""
    headers = {"Authorization": "Bearer mock_valid_jwt_token"}
    payload = {
        "service_id": "srv-01",
        "applicant_name": "M. Anandhi",
        "district_id": "Madurai",
        "form_data": {
            "community": "BC",
            "father_name": "R. Murugan",
            "annual_income": "120000"
        },
        "uploaded_document_ids": ["doc-aadhaar-01", "doc-ration-02"]
    }
    response = client.post("/api/v1/applications", json=payload, headers=headers)
    assert response.status_code == 201
    data = response.json()
    assert "TN-REV-2026" in data["application_number"]
    assert data["current_status"] == "SUBMITTED"


def test_grievance_complaint_redressal():
    """Verify citizen can lodge a grievance with the CM Helpline integration."""
    headers = {"Authorization": "Bearer mock_valid_jwt_token"}
    payload = {
        "department_name": "Revenue and Disaster Management",
        "district": "Madurai",
        "category": "Service Delay",
        "subject": "Delayed patta transfer for survey 41/2",
        "description": "Patta transfer application submitted 3 weeks ago without field inspection.",
        "priority": "HIGH"
    }
    response = client.post("/api/v1/complaints", json=payload, headers=headers)
    assert response.status_code == 201
    data = response.json()
    assert "TN-GRV-2026" in data["complaint_number"]
    assert data["status"] == "OPEN"


def test_dashboard_analytics_kpis():
    """Verify aggregated dashboard statistics for Citizen, Employee, and Officer views."""
    headers = {"Authorization": "Bearer mock_valid_jwt_token"}
    
    # Citizen KPIs
    res_cit = client.get("/api/v1/analytics/citizen", headers=headers)
    assert res_cit.status_code == 200
    assert "total_applications" in res_cit.json()

    # Employee KPIs
    res_emp = client.get("/api/v1/analytics/employee", headers=headers)
    assert res_emp.status_code == 200
    assert "pending_reviews" in res_emp.json()

    # Officer KPIs
    res_off = client.get("/api/v1/analytics/officer", headers=headers)
    assert res_off.status_code == 200
    assert "sla_compliance_rate" in res_off.json()


def test_ai_citizen_assistant_chat():
    """Verify bilingual RAG knowledge base answers with official citations."""
    # Test English
    res_en = client.post("/api/v1/ai/chat", json={"message": "How do I apply for Magalir Urimai Thogai?", "language": "en"})
    assert res_en.status_code == 200
    assert len(res_en.json()["citations"]) > 0
    assert "₹1,000" in res_en.json()["reply_text"]

    # Test Tamil
    res_ta = client.post("/api/v1/ai/chat", json={"message": "வருமானச் சான்றிதழ் பெற என்ன செய்ய வேண்டும்?", "language": "ta"})
    assert res_ta.status_code == 200
    assert "வருவாய்" in res_ta.json()["reply_text"]


def test_fraud_alerts_monitoring():
    """Verify fraud and anomaly alert retrieval for supervisory officers."""
    response = client.get("/api/v1/fraud/alerts")
    assert response.status_code == 200
    alerts = response.json()
    assert len(alerts) >= 1
    assert alerts[0]["risk_score"] > 0.7
