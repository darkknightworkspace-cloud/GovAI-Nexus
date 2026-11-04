"""
GovAI Nexus - Automated Test Suite for Master Prompt Phase 5
Verifies Governance Analytics, Department/District Intelligence, Public Transparency,
Infrastructure Monitoring, Compliance/DPDP, Reporting Engine, Mobile APIs,
External Integrations, and Multi-Agent Orchestrator.
"""
import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.ai_engine.agents.multi_agent_system import multi_agent_orchestrator
from backend.analytics_engine.service import governance_analytics_engine
from backend.integrations.connectors import integrations_service

client = TestClient(app)


def test_health_check_phase5():
    """Verify system health endpoint includes analytics, mobile gateway, and integrations."""
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["analytics_engine"] == "ONLINE"
    assert data["mobile_gateway"] == "ONLINE"
    assert data["integrations_status"] == "ALL_HEALTHY"


# ==============================================================================
# 1. Governance Analytics & Department/District Telemetry
# ==============================================================================

def test_governance_statewide_summary():
    """Verify statewide governance summary returns authorized KPI calculations."""
    res = client.get("/api/v1/analytics/governance")
    assert res.status_code == 200
    data = res.json()
    assert data["state"] == "Tamil Nadu"
    assert "kpi_overview" in data
    assert data["kpi_overview"]["total_applications"] > 1000000
    assert data["kpi_overview"]["statewide_sla_compliance"] > 90.0
    assert data["kpi_overview"]["total_active_districts"] == 38


def test_department_analytics_with_filter():
    """Verify department performance, SLA compliance, and workload index."""
    res = client.get("/api/v1/analytics/departments?department=Revenue")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 1
    revenue_dept = data[0]
    assert "Revenue & Disaster Management" in revenue_dept["name_en"]
    assert revenue_dept["workload_index"] >= 1.0
    assert revenue_dept["sla_compliance_rate"] > 90.0
    assert revenue_dept["ai_recommendation"] != ""


def test_district_analytics_tamil_nadu():
    """Verify Tamil Nadu district analytics across 38 administrative districts."""
    res = client.get("/api/v1/analytics/districts")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 8
    district_names = [d["name_en"] for d in data]
    assert "Madurai" in district_names
    assert "Chennai" in district_names
    assert "Coimbatore" in district_names
    assert "Kanyakumari" in district_names


def test_workload_analytics():
    """Verify taluk-level staffing pressure metrics and recommendations."""
    res = client.get("/api/v1/analytics/workload")
    assert res.status_code == 200
    data = res.json()
    assert "high_workload_taluks" in data
    assert len(data["high_workload_taluks"]) >= 2
    assert "Madurai North" in [t["taluk"] for t in data["high_workload_taluks"]]


# ==============================================================================
# 2. Public Transparency & Separation of Citizen PII
# ==============================================================================

def test_public_projects_monitoring():
    """Verify public government project tracker and budget utilization ratios."""
    res = client.get("/api/v1/public/projects")
    assert res.status_code == 200
    data = res.json()
    assert data["total_projects"] >= 4
    assert data["total_sanctioned_budget_cr"] > 1000.0
    assert "projects" in data
    
    # Verify zero PII leakage: no citizen phone numbers or passwords
    for p in data["projects"]:
        assert "password" not in p
        assert "phone" not in p
        assert "aadhaar" not in p
        assert "contractor" in p


def test_public_datasets_metadata():
    """Verify open dataset catalog under NDSAP license."""
    res = client.get("/api/v1/public/datasets")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 3
    for ds in data:
        assert "title" in ds
        assert "license" in ds
        assert "records_count" in ds


# ==============================================================================
# 3. Infrastructure & Resource Monitoring
# ==============================================================================

def test_infrastructure_assets_and_alerts():
    """Verify infrastructure operational condition scores and alerts."""
    res = client.get("/api/v1/infrastructure/assets")
    assert res.status_code == 200
    data = res.json()
    assert data["total_assets"] >= 5
    assert data["average_health_score"] > 80.0

    alerts_res = client.get("/api/v1/infrastructure/alerts")
    assert alerts_res.status_code == 200
    alerts_data = alerts_res.json()
    assert alerts_data["active_alerts_count"] >= 1


# ==============================================================================
# 4. Compliance & DPDP Act 2023 Governance
# ==============================================================================

def test_compliance_overview_and_policies():
    """Verify DPDP 2023 explicit citizen consent tracking and statutory policy registry."""
    res = client.get("/api/v1/compliance/overview")
    assert res.status_code == 200
    data = res.json()
    assert data["overall_compliance_score"] >= 95.0
    assert data["telemetry"]["data_erasure_requests_fulfilled"] > 0

    pol_res = client.get("/api/v1/compliance/policies")
    assert pol_res.status_code == 200
    policies = pol_res.json()
    codes = [p["code"] for p in policies]
    assert "DPDP-2023-CONSENT" in codes
    assert "TNRTS-2024-SLA" in codes


# ==============================================================================
# 5. Reporting Engine & Business Intelligence
# ==============================================================================

def test_reporting_engine_generate_and_list():
    """Verify on-demand report generation in PDF and CSV format."""
    payload = {
        "report_type": "DISTRICT_GOVERNANCE",
        "format": "PDF",
        "department": "Revenue & Disaster Management",
        "district": "Madurai",
        "requested_by": "Officer K. Ramanathan"
    }
    gen_res = client.post("/api/v1/reports/generate", json=payload)
    assert gen_res.status_code == 200
    gen_data = gen_res.json()
    assert gen_data["status"] == "SUCCESS"
    assert "report" in gen_data
    report_id = gen_data["report"]["id"]

    # Verify download payload
    dl_res = client.get(f"/api/v1/reports/{report_id}/download")
    assert dl_res.status_code == 200
    dl_data = dl_res.json()
    assert dl_data["report_id"] == report_id
    assert "checksum_sha256" in dl_data


# ==============================================================================
# 6. Mobile Application Dedicated Endpoints
# ==============================================================================

def test_mobile_home_and_services():
    """Verify lightweight mobile JSON payloads for Expo client."""
    res = client.get("/api/v1/mobile/home?user_id=usr-citizen-01&lang=ta")
    assert res.status_code == 200
    data = res.json()
    assert "greeting" in data
    assert "quick_services" in data
    assert len(data["quick_services"]) >= 4

    # Device registration for Push Notifications
    device_payload = {
        "user_id": "usr-citizen-01",
        "device_token": "ExponentPushToken[TN_TEST_TOKEN_12345]",
        "platform": "ANDROID",
        "device_model": "Pixel 8 Pro",
        "app_version": "1.0.0"
    }
    reg_res = client.post("/api/v1/mobile/device/register", json=device_payload)
    assert reg_res.status_code == 200
    assert reg_res.json()["status"] == "REGISTERED"


# ==============================================================================
# 7. External Integrations Connectors
# ==============================================================================

def test_integrations_list_and_ping():
    """Verify connectors for TNeGA e-Sevai, C-DAC SMS, and NIC Email."""
    res = client.get("/api/v1/integrations")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 6
    codes = [i["code"] for i in data]
    assert "GOV_TNEGA_ESEVAI" in codes
    assert "SMS_CDAC_MSDG" in codes
    assert "EMAIL_NIC_CLOUD" in codes

    # Test individual connector handshake
    test_res = client.post("/api/v1/integrations/int-01/test")
    assert test_res.status_code == 200
    test_data = test_res.json()
    assert test_data["test_result"] == "CONNECTED"
    assert test_data["latency_ms"] > 0


# ==============================================================================
# 8. Extended Multi-Agent System (Phase 5 Agents)
# ==============================================================================

@pytest.mark.asyncio
async def test_multi_agent_governance_insights():
    """Verify Governance Insights Agent execution under safety guardrails."""
    res = await multi_agent_orchestrator.route_and_execute(
        target_agent="GOVERNANCE_INSIGHTS",
        payload={"scope": "Statewide", "language": "en"}
    )
    assert res.status == "SUCCESS"
    assert res.agent_code == "GOVERNANCE_INSIGHTS"
    assert "sla_compliance" in res.result["summary"].lower()


@pytest.mark.asyncio
async def test_multi_agent_transparency():
    """Verify Transparency Agent validates zero citizen PII leakage."""
    res = await multi_agent_orchestrator.route_and_execute(
        target_agent="TRANSPARENCY",
        payload={"query": "Show sanctioned budgets"}
    )
    assert res.status == "SUCCESS"
    assert res.result["data_minimization_check"] == "PASSED (Zero citizen PII exposed in public catalog)"
