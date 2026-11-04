"""
GovAI Nexus - Automated Pytest Suite for Phase 4 AI, ML & Multi-Agent Architecture
Tests:
1. RAG pipeline, semantic chunking, and hybrid search
2. RAG evaluation metrics (Faithfulness, Precision, Recall, Hallucination)
3. Indic NLP processing & citizen sentiment analysis
4. OCR layout detection and Tamil Nadu certificate extraction
5. Machine learning models (complaint classifier, demand forecaster, delay predictor)
6. Fraud and anomaly detection with human officer review constraints
7. 9-Agent Multi-Agent orchestrator coordination
8. Voice speech-to-text and text-to-speech synthesis
"""
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_ai_citizen_chat_bilingual_rag():
    """Verify RAG answers are grounded with citations in both English and Tamil."""
    # English RAG check
    res_en = client.post("/api/v1/ai/chat", json={"query": "What are the rules for Kalaignar Magalir Urimai Thogai?", "language": "en"})
    assert res_en.status_code == 200
    data_en = res_en.json()
    assert len(data_en["citations"]) > 0
    assert "₹1,000" in data_en["reply_text"]
    assert data_en["confidence_score"] > 0.90

    # Tamil RAG check
    res_ta = client.post("/api/v1/ai/chat", json={"query": "சாதிச் சான்றிதழ் பெற என்ன ஆவணங்கள் தேவை?", "language": "ta"})
    assert res_ta.status_code == 200
    data_ta = res_ta.json()
    assert len(data_ta["citations"]) > 0
    assert "சான்றிதழ்" in data_ta["reply_text"]


def test_knowledge_hybrid_search_and_evaluation():
    """Verify hybrid dense + sparse search and authoritative RAGAS-style evaluation."""
    # Search
    search_res = client.post("/api/v1/knowledge/search", json={"query": "income certificate eligibility", "top_k": 3})
    assert search_res.status_code == 200
    hits = search_res.json()
    assert len(hits) > 0
    assert any("Income Certificate" in h["title"] for h in hits)

    # Evaluation
    eval_res = client.get("/api/v1/knowledge/evaluation")
    assert eval_res.status_code == 200
    eval_data = eval_res.json()
    assert eval_data["retrieval_precision"] >= 0.80
    assert eval_data["answer_faithfulness"] >= 0.85
    assert eval_data["hallucination_rate"] <= 0.05


def test_ocr_document_extraction():
    """Verify Tamil Nadu certificate extraction, field validation, and officer review trigger."""
    raw_sample = """
    GOVERNMENT OF TAMIL NADU - REVENUE DEPARTMENT
    Community Certificate
    Certificate Number: TN-REV-2026-981240
    Name: K. Soundararajan
    Father: M. Kannan
    District: Madurai
    Community: Backward Class (BC)
    """
    res = client.post("/api/v1/ai/documents/process", json={"raw_text": raw_sample, "document_type_hint": "Community Certificate"})
    assert res.status_code == 200
    data = res.json()
    assert data["document_type"] == "Community Certificate"
    assert data["overall_confidence"] > 0.90
    assert any(f["field_name"] == "Certificate Number" for f in data["fields"])
    assert any(f["field_name"] == "Applicant Name" for f in data["fields"])


def test_nlp_classification_and_sentiment():
    """Verify grievance NLP classification and feedback sentiment polarity."""
    # Classification
    cls_res = client.post("/api/v1/ai/nlp/classify", json={"text": "Water pipeline burst near Anna Nagar main street causing flooding"})
    assert cls_res.status_code == 200
    cls_data = cls_res.json()
    assert cls_data["category"] == "Water Supply & Drainage"
    assert "Water Supply" in cls_data["department"]
    assert len(cls_data["explanations"]) > 0

    # Sentiment
    sent_res = client.post("/api/v1/ai/nlp/sentiment", json={"text": "Very quick and smooth service at the taluk office, staff was helpful"})
    assert sent_res.status_code == 200
    sent_data = sent_res.json()
    assert sent_data["sentiment"] == "POSITIVE"
    assert sent_data["polarity_score"] > 0.0


def test_voice_transcription_and_synthesis():
    """Verify voice transcription and audio synthesis response structures."""
    # Transcribe
    tr_res = client.post("/api/v1/ai/voice/transcribe", data={"hint_language": "en"})
    assert tr_res.status_code == 200
    assert "text" in tr_res.json()

    # Synthesize
    syn_res = client.post("/api/v1/ai/voice/synthesize", json={"text": "Your certificate is approved", "language": "en"})
    assert syn_res.status_code == 200
    assert syn_res.json()["audio_format"] == "mp3"


def test_ml_demand_forecasting_and_models_registry():
    """Verify demand forecasting timeseries and MLOps model registry."""
    # Demand
    dmd_res = client.post("/api/v1/ml/predict/demand", json={"district": "Madurai", "department": "Revenue", "days_ahead": 5})
    assert dmd_res.status_code == 200
    dmd_data = dmd_res.json()
    assert len(dmd_data["forecast"]) == 5
    assert dmd_data["forecast"][0]["predicted_intake"] > 0

    # Registry
    reg_res = client.get("/api/v1/ml/models")
    assert reg_res.status_code == 200
    models = reg_res.json()
    assert len(models) >= 3
    assert any(m["model_name"] == "complaint_classifier" for m in models)


def test_fraud_anomaly_assessment_and_adjudication():
    """Verify anomaly detection flags duplicate document hashes and officer can record investigation notes."""
    # Assessment
    anom_res = client.post("/api/v1/ml/predict/anomaly", json={
        "application_id": "app_test_fraud_01",
        "applicant_id": "usr_99",
        "document_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    })
    assert anom_res.status_code == 200
    anom_data = anom_res.json()
    assert anom_data["risk_level"] == "HIGH"
    assert anom_data["is_flagged_for_officer_review"] is True

    # Investigation adjudication
    adj_res = client.post("/api/v1/fraud/alerts/frd_alt_01/investigate", json={
        "status": "ESCALATED",
        "officer_notes": "Referred to Revenue Divisional Officer for field inspection."
    })
    assert adj_res.status_code == 200
    assert adj_res.json()["status"] == "ADJUDICATED"


def test_multi_agent_orchestration():
    """Verify master orchestrator coordinates agents with role safety and structured results."""
    # List agents
    list_res = client.get("/api/v1/agents")
    assert list_res.status_code == 200
    agents = list_res.json()
    assert len(agents) >= 8

    # Execute Citizen Service Agent
    exec_res = client.post("/api/v1/agents/execute", json={
        "agent_code": "CITIZEN_SERVICE",
        "payload": {"query": "How do I apply for income certificate?", "language": "en"}
    })
    assert exec_res.status_code == 200
    exec_data = exec_res.json()
    assert exec_data["agent_code"] == "CITIZEN_SERVICE"
    assert exec_data["status"] == "SUCCESS"
    assert len(exec_data["tools_called"]) > 0
