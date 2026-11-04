"""
GovAI Nexus - Phase 5 External Integrations Management Endpoints
Health checking, latency benchmarking, and connection verification for Government APIs,
SMS gateway (C-DAC MSDG), NIC Email, TNSDI GIS Maps, and Treasury Payment connectors.
"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

from backend.integrations.connectors import integrations_service

router = APIRouter(prefix="/integrations", tags=["External Integrations"])


@router.get("")
def list_integrations():
    """List all registered external system connectors and current health state."""
    return integrations_service.list_integrations()


@router.get("/{connector_id}/status")
def get_connector_status(connector_id: str):
    """Retrieve detailed compliance standard, latency telemetry, and endpoints."""
    item = integrations_service.get_integration_status(connector_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Integration '{connector_id}' not found.")
    return item


@router.post("/{connector_id}/test")
def test_connector_handshake(connector_id: str):
    """Perform real-time TLS handshake and latency ping on the external connector."""
    result = integrations_service.test_integration(connector_id)
    if result.get("status") == "ERROR":
        raise HTTPException(status_code=404, detail=result.get("message"))
    return result
