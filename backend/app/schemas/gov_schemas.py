"""
GovAI Nexus - Typed Pydantic Request & Response Schemas
Provides strict validation, serialization, and OpenAPI documentation schemas for all Phase 3 modules.
"""
from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


# ==============================================================================
# Auth & IAM Schemas
# ==============================================================================

class UserRegisterRequest(BaseModel):
    email: EmailStr
    phone_number: str = Field(..., pattern=r"^\+?[0-9]{10,12}$")
    password: str = Field(..., min_length=8)
    full_name: str
    preferred_language: str = Field("en", pattern=r"^(en|ta)$")
    consent_accepted: bool = Field(..., description="DPDP Act 2023 Consent")


class UserLoginRequest(BaseModel):
    username_or_email: str
    password: str
    otp_code: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: str
    user_type: str
    roles: List[str]
    preferred_language: str


class UserProfileResponse(BaseModel):
    id: str
    email: str
    phone_number: str
    user_type: str
    full_name: str
    district: Optional[str] = None
    preferred_language: str
    is_active: bool
    created_at: datetime


class UserRoleAssignmentRequest(BaseModel):
    user_id: str
    role_code: str


# ==============================================================================
# Geography & Departments Schemas
# ==============================================================================

class DistrictResponse(BaseModel):
    id: str
    name_en: str
    name_ta: str
    headquarters: str
    active_applications_count: int = 0


class DepartmentResponse(BaseModel):
    id: str
    name_en: str
    name_ta: str
    code: str
    hod_name: str
    contact_email: str
    services_count: int = 0


# ==============================================================================
# Services & Schemes Schemas
# ==============================================================================

class GovernmentServiceResponse(BaseModel):
    id: str
    department_id: str
    department_name: str
    title_en: str
    title_ta: str
    category: str
    description_en: str
    description_ta: str
    processing_time_days: int
    service_fee: float
    required_documents: List[str]
    is_active: bool = True


class GovernmentSchemeResponse(BaseModel):
    id: str
    department_name: str
    title_en: str
    title_ta: str
    category: str
    benefit_summary_en: str
    benefit_summary_ta: str
    eligibility_criteria: List[Dict[str, Any]]
    deadline: Optional[str] = None
    target_group: str = "All eligible residents"


class EligibilityCheckRequest(BaseModel):
    age: int
    annual_income_inr: float
    gender: str
    community: str
    district: str


class EligibilityCheckResponse(BaseModel):
    eligible_schemes: List[Dict[str, Any]]
    preliminary_note: str = "Eligibility results are preliminary and subject to official verification."


# ==============================================================================
# Application & Document Schemas
# ==============================================================================

class ApplicationCreateRequest(BaseModel):
    service_id: str
    district_id: str
    applicant_name: str
    form_data: Dict[str, Any]
    uploaded_document_ids: List[str]


class ApplicationDecisionRequest(BaseModel):
    decision: str = Field(..., pattern=r"^(APPROVED|REJECTED|REQUEST_INFO)$")
    remarks: str
    digital_signature_hash: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: str
    application_number: str
    service_title: str
    applicant_name: str
    district: str
    department_name: str
    current_status: str  # SUBMITTED, UNDER_REVIEW, VERIFIED, APPROVED, REJECTED
    submitted_at: datetime
    last_updated_at: datetime
    documents_count: int
    risk_score: float = 0.0
    assigned_officer: Optional[str] = None


class DocumentUploadResponse(BaseModel):
    document_id: str
    file_name: str
    file_size_bytes: int
    mime_type: str
    verification_status: str
    created_at: datetime


class DocumentExtractionResponse(BaseModel):
    document_id: str
    document_type: str
    extracted_text: str
    extracted_fields: Dict[str, Any]
    confidence_score: float
    ocr_engine: str
    verification_status: str


class DocumentVerifyActionRequest(BaseModel):
    is_approved: bool
    remarks: Optional[str] = None


# ==============================================================================
# Complaints & Grievances Schemas
# ==============================================================================

class ComplaintCreateRequest(BaseModel):
    department_id: str
    district_id: str
    category: str
    subject: str
    description: str
    priority: str = Field("MEDIUM", pattern=r"^(LOW|MEDIUM|HIGH|URGENT)$")


class ComplaintResponse(BaseModel):
    id: str
    complaint_number: str
    department_name: str
    district: str
    category: str
    subject: str
    description: str
    priority: str
    status: str  # SUBMITTED, ASSIGNED, IN_PROGRESS, ESCALATED, RESOLVED, CLOSED
    created_at: datetime
    resolved_at: Optional[datetime] = None


class ComplaintUpdateRequest(BaseModel):
    new_status: str
    action_taken: str
    internal_notes: Optional[str] = None


# ==============================================================================
# Tasks & Workflow Schemas
# ==============================================================================

class TaskCreateRequest(BaseModel):
    title: str
    description: str
    assigned_to_user_id: str
    due_date: str
    priority: str = "MEDIUM"


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    assigned_to_name: str
    status: str  # TODO, IN_PROGRESS, REVIEW, COMPLETED
    priority: str
    due_date: str
    created_at: datetime


# ==============================================================================
# Dashboard KPIs Schemas
# ==============================================================================

class CitizenDashboardKPIs(BaseModel):
    total_applications: int
    under_review: int
    approved: int
    active_complaints: int


class EmployeeDashboardKPIs(BaseModel):
    assigned_tasks_count: int
    pending_verifications: int
    urgent_sla_count: int
    completed_today: int
    avg_turnaround_days: float


class OfficerDashboardKPIs(BaseModel):
    statewide_applications: int
    sla_compliance_rate: float
    open_complaints_count: int
    active_fraud_alerts: int
    district_breakdown: List[Dict[str, Any]]


class AdminDashboardKPIs(BaseModel):
    total_users: int
    active_citizens: int
    active_employees: int
    active_services: int
    system_health: str = "OPTIMAL"
    database_status: str = "CONNECTED"


# ==============================================================================
# Audit Logs & Notifications Schemas
# ==============================================================================

class AuditLogResponse(BaseModel):
    id: str
    actor_email: str
    action: str
    resource: str
    resource_id: Optional[str]
    ip_address: Optional[str]
    timestamp: datetime


class NotificationResponse(BaseModel):
    id: str
    title_en: str
    title_ta: str
    message_en: str
    message_ta: str
    notification_type: str
    is_read: bool
    created_at: datetime


# ==============================================================================
# AI & ML Schemas (Phase 3 Foundation)
# ==============================================================================

class AIChatRequest(BaseModel):
    query: str = Field(..., min_length=2)
    conversation_id: Optional[str] = None
    language: str = Field("en", pattern=r"^(en|ta)$")


class AICitation(BaseModel):
    document_title: str
    department: str
    source_url: Optional[str] = None
    verification_status: str = "Authoritative / Official"


class AIChatResponse(BaseModel):
    conversation_id: str
    reply_text: str
    detected_intent: str
    citations: List[AICitation]
    confidence_score: float
    suggested_actions: List[str]


class MLDelayPredictionRequest(BaseModel):
    service_id: str
    district_id: str
    current_workload_score: float


class MLDelayPredictionResponse(BaseModel):
    predicted_delay_days: float
    estimated_completion_date: datetime
    risk_level: str
    confidence: float


class FraudAlertResponse(BaseModel):
    id: str
    alert_number: str
    related_entity_type: str
    related_entity_id: str
    risk_score: float
    risk_category: str
    evidence_summary: str
    investigation_status: str
    created_at: datetime


# ==============================================================================
# Phase 4 AI & Intelligence Schemas
# ==============================================================================

class AIFeedbackRequest(BaseModel):
    message_id: str
    conversation_id: str
    rating: int = Field(..., ge=-1, le=1)  # 1 for positive, -1 for negative
    feedback_text: Optional[str] = None


class KnowledgeDocumentCreate(BaseModel):
    title: str
    department: str
    category: str
    content: str
    source_url: Optional[str] = None
    language: str = "en"
    version: str = "1.0"


class KnowledgeSearchRequest(BaseModel):
    query: str
    department_filter: Optional[str] = None
    language_filter: Optional[str] = None
    top_k: int = 4


class KnowledgeSearchHitSchema(BaseModel):
    chunk_id: str
    title: str
    department: str
    content: str
    score: float
    source_url: str
    match_type: str


class OCRProcessRequest(BaseModel):
    raw_text: str
    document_type_hint: Optional[str] = None


class ExtractedFieldSchema(BaseModel):
    field_name: str
    field_value: str
    confidence: float
    bounding_box: List[int]
    is_valid: bool = True


class OCRProcessResponse(BaseModel):
    document_id: str
    document_type: str
    overall_confidence: float
    fields: List[ExtractedFieldSchema]
    flags: List[str]
    missing_mandatory_fields: List[str]
    requires_officer_review: bool


class NLPClassifyRequest(BaseModel):
    text: str


class NLPClassifyResponse(BaseModel):
    category: str
    department: str
    priority: str
    confidence: float
    explanations: List[Dict[str, Any]]


class NLPSentimentRequest(BaseModel):
    text: str


class NLPSentimentResponse(BaseModel):
    sentiment: str
    confidence: float
    polarity_score: float
    aspects_identified: Dict[str, str]
    highlight_phrases: List[str]


class NLPEntitiesRequest(BaseModel):
    text: str


class NLPEntitiesResponse(BaseModel):
    entities: Dict[str, List[str]]


class NLPSummarizeRequest(BaseModel):
    text: str
    max_sentences: int = 3


class NLPSummarizeResponse(BaseModel):
    summary: str
    original_word_count: int
    summary_word_count: int


class VoiceSynthesizeRequest(BaseModel):
    text: str
    language: str = "en"


class VoiceSynthesizeResponse(BaseModel):
    audio_format: str
    language: str
    sample_rate: int
    duration_estimate_sec: float
    audio_base64: str


class MLDemandPredictRequest(BaseModel):
    district: str
    department: str
    days_ahead: int = 7


class MLDemandPoint(BaseModel):
    date: str
    predicted_intake: int
    confidence_interval_low: int
    confidence_interval_high: int
    surge_risk: str


class MLDemandPredictResponse(BaseModel):
    district: str
    department: str
    forecast: List[MLDemandPoint]


class MLModelInfoResponse(BaseModel):
    model_name: str
    version: str
    algorithm: str
    status: str
    metrics: Dict[str, Any]
    last_trained: str


class FraudInvestigationRequest(BaseModel):
    status: str = Field(..., pattern=r"^(CLEARED|ESCALATED|CONFIRMED_FRAUD)$")
    officer_notes: str


class AgentExecuteRequest(BaseModel):
    agent_code: Optional[str] = None
    intent: Optional[str] = None
    payload: Dict[str, Any]


class AgentExecuteResponse(BaseModel):
    agent_code: str
    status: str
    result: Dict[str, Any]
    tools_called: List[str]
    latency_ms: float
    explanation: str

