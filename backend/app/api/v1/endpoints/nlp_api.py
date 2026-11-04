"""
GovAI Nexus - NLP Engine REST Endpoints
Provides text classification, citizen sentiment analysis, administrative entity extraction, and summarization.
"""
from fastapi import APIRouter
from typing import Dict, Any, List

from backend.app.schemas.gov_schemas import (
    NLPClassifyRequest, NLPClassifyResponse,
    NLPSentimentRequest, NLPSentimentResponse,
    NLPEntitiesRequest, NLPEntitiesResponse,
    NLPSummarizeRequest, NLPSummarizeResponse
)
from backend.ai_engine.nlp.indic_processor import indic_processor
from backend.ai_engine.nlp.sentiment import sentiment_analyzer
from backend.ai_engine.ml_engine.classification.complaint_classifier import complaint_classifier

router = APIRouter(prefix="/ai/nlp", tags=["NLP Engine"])


@router.post("/classify", response_model=NLPClassifyResponse)
async def classify_text(payload: NLPClassifyRequest):
    """Classifies citizen complaints or requests into categories with feature explanations."""
    pred = complaint_classifier.predict(payload.text)
    return NLPClassifyResponse(
        category=pred.predicted_category,
        department=pred.recommended_department,
        priority=pred.estimated_priority,
        confidence=pred.confidence,
        explanations=[e.model_dump() for e in pred.explanations]
    )


@router.post("/sentiment", response_model=NLPSentimentResponse)
async def analyze_sentiment(payload: NLPSentimentRequest):
    """Analyzes citizen feedback for sentiment polarity and departmental aspect opinions."""
    res = sentiment_analyzer.analyze(payload.text)
    return NLPSentimentResponse(
        sentiment=res.sentiment,
        confidence=res.confidence,
        polarity_score=res.polarity_score,
        aspects_identified=res.aspects_identified,
        highlight_phrases=res.highlight_phrases
    )


@router.post("/entities", response_model=NLPEntitiesResponse)
async def extract_entities(payload: NLPEntitiesRequest):
    """Extracts Tamil Nadu administrative entities (Districts, G.O. numbers, Schemes)."""
    entities = indic_processor.extract_entities(payload.text)
    return NLPEntitiesResponse(entities=entities)


@router.post("/summarize", response_model=NLPSummarizeResponse)
async def summarize_text(payload: NLPSummarizeRequest):
    """Summarizes lengthy policy documents, citizen petitions, or legal orders."""
    clean = indic_processor.normalize_text(payload.text)
    sentences = [s.strip() for s in clean.split(".") if len(s.strip()) > 10]
    summary_sentences = sentences[:payload.max_sentences]
    summary_text = ". ".join(summary_sentences) + ("." if summary_sentences else "")

    return NLPSummarizeResponse(
        summary=summary_text or clean[:200],
        original_word_count=len(payload.text.split()),
        summary_word_count=len(summary_text.split())
    )
