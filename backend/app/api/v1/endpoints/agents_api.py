"""
GovAI Nexus - Multi-Agent System REST Endpoints
Coordinates multi-agent execution, retrieves agent registry status, and maintains execution audit logs.
"""
from fastapi import APIRouter
from typing import List, Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    AgentExecuteRequest, AgentExecuteResponse
)
from backend.ai_engine.agents.multi_agent_system import (
    multi_agent_orchestrator
)

router = APIRouter(prefix="/agents", tags=["Multi-Agent Architecture"])

_EXECUTIONS_LOG: List[Dict[str, Any]] = []


@router.get("")
async def list_registered_agents():
    """Lists the 9 authorized government AI agents and their operational status."""
    return [
        {
            "code": code,
            "name": agent.name,
            "description": agent.description,
            "requires_human_approval": agent.requires_approval,
            "status": "ONLINE"
        }
        for code, agent in multi_agent_orchestrator.agents.items()
    ]


@router.post("/execute", response_model=AgentExecuteResponse)
async def execute_agent(payload: AgentExecuteRequest):
    """
    Executes a task through the master Orchestrator or a designated specialized agent.
    Enforces security, auditing, and human approval constraints.
    """
    result = await multi_agent_orchestrator.route_and_execute(
        target_agent=payload.agent_code,
        payload=payload.payload
    )

    log_entry = {
        "execution_id": f"exec_{datetime.utcnow().strftime('%Y%m%d%H%M%S%f')}",
        "agent_code": result.agent_code,
        "status": result.status,
        "tools_called": result.tools_called,
        "latency_ms": result.latency_ms,
        "timestamp": datetime.utcnow().isoformat()
    }
    _EXECUTIONS_LOG.append(log_entry)

    return AgentExecuteResponse(
        agent_code=result.agent_code,
        status=result.status,
        result=result.result,
        tools_called=result.tools_called,
        latency_ms=result.latency_ms,
        explanation=result.explanation
    )


@router.get("/executions")
async def list_agent_executions():
    """Retrieves full audit log of all autonomous agent operations and tool calls."""
    return _EXECUTIONS_LOG[-50:]  # Last 50 executions
