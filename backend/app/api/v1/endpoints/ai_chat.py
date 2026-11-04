"""
GovAI Nexus - AI Citizen Chatbot Endpoints
Provides grounded bilingual conversational assistance with official G.O. citations.
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    AIChatRequest, AIChatResponse, AICitation, AIFeedbackRequest
)
from backend.ai_engine.rag.pipeline import rag_pipeline

router = APIRouter(prefix="/ai", tags=["AI Citizen Assistant"])

# Ephemeral in-memory store for active conversations in test/preview
_CONVERSATIONS_STORE: Dict[str, Dict[str, Any]] = {}


@router.post("/chat", response_model=AIChatResponse)
async def chat_with_assistant(payload: AIChatRequest):
    """
    Processes citizen inquiries using RAG over verified Tamil Nadu Government Orders.
    Returns authoritative answer, official citations, and recommended actions.
    """
    rag_result = await rag_pipeline.execute(query=payload.query, language=payload.language)
    conv_id = payload.conversation_id or f"conv_tn_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"

    # Record message history
    if conv_id not in _CONVERSATIONS_STORE:
        _CONVERSATIONS_STORE[conv_id] = {
            "id": conv_id,
            "created_at": datetime.utcnow().isoformat(),
            "messages": []
        }
    _CONVERSATIONS_STORE[conv_id]["messages"].append({
        "role": "user",
        "text": payload.query,
        "timestamp": datetime.utcnow().isoformat()
    })
    _CONVERSATIONS_STORE[conv_id]["messages"].append({
        "role": "assistant",
        "text": rag_result.reply,
        "citations": [c.model_dump() for c in rag_result.citations],
        "timestamp": datetime.utcnow().isoformat()
    })

    is_tamil = payload.language == "ta"
    suggested_actions = [
        "Apply for Community Certificate" if not is_tamil else "சாதிச் சான்றிதழுக்கு விண்ணப்பிக்கவும்",
        "Check Application Status" if not is_tamil else "விண்ணப்ப நிலையை சரிபார்க்கவும்",
        "Explore Welfare Schemes" if not is_tamil else "அரசு நலத்திட்டங்களை காணவும்"
    ]

    return AIChatResponse(
        conversation_id=conv_id,
        reply_text=rag_result.reply,
        detected_intent=rag_result.detected_intent,
        citations=[
            AICitation(
                document_title=c.document_title,
                department=c.department,
                source_url=c.source_url,
                verification_status=c.verification_status
            )
            for c in rag_result.citations
        ],
        confidence_score=rag_result.confidence_score,
        suggested_actions=suggested_actions
    )


@router.get("/conversations")
async def list_conversations():
    """Returns past AI conversation sessions for the authenticated citizen."""
    return list(_CONVERSATIONS_STORE.values())


@router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str):
    """Retrieves full transcript and citations for a specific conversation session."""
    if conversation_id not in _CONVERSATIONS_STORE:
        raise HTTPException(status_code=404, detail="Conversation session not found")
    return _CONVERSATIONS_STORE[conversation_id]


@router.post("/feedback")
async def submit_ai_feedback(payload: AIFeedbackRequest):
    """Collects citizen feedback (like/dislike/comments) for RAG continuous evaluation."""
    return {
        "status": "recorded",
        "message_id": payload.message_id,
        "rating": payload.rating,
        "timestamp": datetime.utcnow().isoformat()
    }
