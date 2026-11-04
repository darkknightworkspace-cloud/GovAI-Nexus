"""
GovAI Nexus - Complete Relational Database Architecture (PostgreSQL + pgvector)
Defines 43+ normalized entities across Identity, Geography, Services, Applications,
Documents, Complaints, AI/Knowledge, Analytics/Fraud, and System Auditing.
"""
from datetime import datetime
from typing import Optional
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, ForeignKey, 
    Text, JSON, UniqueConstraint, Index
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


# ==============================================================================
# GROUP A: Identity & Access Management (IAM)
# ==============================================================================

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone_number = Column(String(20), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    user_type = Column(String(50), nullable=False, default="citizen")  # citizen, employee, officer, admin
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    preferred_language = Column(String(10), default="en", nullable=False)  # en, ta
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    citizen_profile = relationship("CitizenProfile", back_populates="user", uselist=False)
    employee_profile = relationship("EmployeeProfile", back_populates="user", uselist=False)
    user_roles = relationship("UserRole", back_populates="user")
    sessions = relationship("UserSession", back_populates="user")
    consents = relationship("ConsentRecord", back_populates="user")


class CitizenProfile(Base):
    __tablename__ = "citizen_profiles"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    full_name_en = Column(String(200), nullable=False)
    full_name_ta = Column(String(200), nullable=True)
    date_of_birth = Column(String(20), nullable=True)
    gender = Column(String(20), nullable=True)
    address_line = Column(Text, nullable=True)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=True)
    pincode = Column(String(10), nullable=True)
    income_slab = Column(String(50), nullable=True)
    community = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="citizen_profile")


class EmployeeProfile(Base):
    __tablename__ = "employee_profiles"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    employee_code = Column(String(50), unique=True, nullable=False, index=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    designation = Column(String(100), nullable=False)
    office_location = Column(String(200), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="employee_profile")


class Role(Base):
    __tablename__ = "roles"

    id = Column(String(36), primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user_roles = relationship("UserRole", back_populates="role")
    role_permissions = relationship("RolePermission", back_populates="role")


class Permission(Base):
    __tablename__ = "permissions"

    id = Column(String(36), primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    code = Column(String(100), unique=True, nullable=False)
    module = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)

    role_permissions = relationship("RolePermission", back_populates="permission")


class UserRole(Base):
    __tablename__ = "user_roles"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(String(36), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="user_roles")
    role = relationship("Role", back_populates="user_roles")


class RolePermission(Base):
    __tablename__ = "role_permissions"

    id = Column(String(36), primary_key=True)
    role_id = Column(String(36), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    permission_id = Column(String(36), ForeignKey("permissions.id", ondelete="CASCADE"), nullable=False)

    role = relationship("Role", back_populates="role_permissions")
    permission = relationship("Permission", back_populates="role_permissions")


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    refresh_token = Column(String(500), nullable=False, unique=True)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="sessions")


class ConsentRecord(Base):
    __tablename__ = "consent_records"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    purpose = Column(String(200), nullable=False)
    consented = Column(Boolean, default=True, nullable=False)
    consent_version = Column(String(20), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="consents")


# ==============================================================================
# GROUP B: Government Organization & Geography (Tamil Nadu Hierarchy)
# ==============================================================================

class State(Base):
    __tablename__ = "states"

    id = Column(String(36), primary_key=True)
    name_en = Column(String(100), unique=True, nullable=False)
    name_ta = Column(String(100), nullable=False)
    code = Column(String(10), unique=True, nullable=False)

    districts = relationship("District", back_populates="state")


class District(Base):
    __tablename__ = "districts"

    id = Column(String(36), primary_key=True)
    state_id = Column(String(36), ForeignKey("states.id"), nullable=False)
    name_en = Column(String(100), nullable=False)
    name_ta = Column(String(100), nullable=False)
    headquarters = Column(String(100), nullable=False)

    state = relationship("State", back_populates="districts")
    local_bodies = relationship("LocalBody", back_populates="district")


class LocalBody(Base):
    __tablename__ = "local_bodies"

    id = Column(String(36), primary_key=True)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=False)
    name_en = Column(String(150), nullable=False)
    name_ta = Column(String(150), nullable=False)
    body_type = Column(String(50), nullable=False)  # Corporation, Municipality, Town Panchayat, Village Panchayat

    district = relationship("District", back_populates="local_bodies")


class Department(Base):
    __tablename__ = "departments"

    id = Column(String(36), primary_key=True)
    name_en = Column(String(200), unique=True, nullable=False)
    name_ta = Column(String(200), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    hod_name = Column(String(150), nullable=True)
    contact_email = Column(String(255), nullable=True)

    services = relationship("GovernmentService", back_populates="department")
    schemes = relationship("GovernmentScheme", back_populates="department")


class DepartmentEmployee(Base):
    __tablename__ = "department_employees"

    id = Column(String(36), primary_key=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    role_in_department = Column(String(100), nullable=False)
    is_active = Column(Boolean, default=True)


# ==============================================================================
# GROUP C: Services & Schemes
# ==============================================================================

class GovernmentService(Base):
    __tablename__ = "government_services"

    id = Column(String(36), primary_key=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Certificates, Land, Licenses, Welfare, etc.
    description_en = Column(Text, nullable=False)
    description_ta = Column(Text, nullable=False)
    processing_time_days = Column(Integer, default=7)
    service_fee = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)

    department = relationship("Department", back_populates="services")
    requirements = relationship("ServiceRequirement", back_populates="service")
    applications = relationship("ServiceApplication", back_populates="service")


class ServiceRequirement(Base):
    __tablename__ = "service_requirements"

    id = Column(String(36), primary_key=True)
    service_id = Column(String(36), ForeignKey("government_services.id", ondelete="CASCADE"), nullable=False)
    document_name_en = Column(String(200), nullable=False)
    document_name_ta = Column(String(200), nullable=False)
    is_mandatory = Column(Boolean, default=True)
    allowed_formats = Column(String(100), default="pdf,jpg,png")

    service = relationship("GovernmentService", back_populates="requirements")


class GovernmentScheme(Base):
    __tablename__ = "government_schemes"

    id = Column(String(36), primary_key=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Women Welfare, Agriculture, Student, etc.
    benefit_summary_en = Column(Text, nullable=False)
    benefit_summary_ta = Column(Text, nullable=False)
    application_deadline = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

    department = relationship("Department", back_populates="schemes")
    eligibility_rules = relationship("SchemeEligibility", back_populates="scheme")


class SchemeEligibility(Base):
    __tablename__ = "scheme_eligibility"

    id = Column(String(36), primary_key=True)
    scheme_id = Column(String(36), ForeignKey("government_schemes.id", ondelete="CASCADE"), nullable=False)
    criteria_key = Column(String(100), nullable=False)  # min_age, max_income, gender, community
    criteria_operator = Column(String(20), nullable=False)  # eq, lte, gte, in
    criteria_value = Column(String(255), nullable=False)

    scheme = relationship("GovernmentScheme", back_populates="eligibility_rules")


# ==============================================================================
# GROUP D: Application & Document Workflows
# ==============================================================================

class ServiceApplication(Base):
    __tablename__ = "service_applications"

    id = Column(String(36), primary_key=True)
    application_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    service_id = Column(String(36), ForeignKey("government_services.id"), nullable=False)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=True)
    current_status = Column(String(50), default="SUBMITTED", nullable=False)  # SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED
    assigned_employee_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    form_data = Column(JSON, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    service = relationship("GovernmentService", back_populates="applications")
    documents = relationship("ApplicationDocument", back_populates="application")
    history = relationship("ApplicationStatusHistory", back_populates="application")


class ApplicationDocument(Base):
    __tablename__ = "application_documents"

    id = Column(String(36), primary_key=True)
    application_id = Column(String(36), ForeignKey("service_applications.id", ondelete="CASCADE"), nullable=False)
    document_type = Column(String(100), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size_bytes = Column(Integer, nullable=False)
    mime_type = Column(String(100), nullable=False)
    verification_status = Column(String(50), default="PENDING")  # PENDING, OCR_VERIFIED, HUMAN_VERIFIED, REJECTED
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    application = relationship("ServiceApplication", back_populates="documents")
    extraction = relationship("DocumentExtraction", back_populates="document", uselist=False)
    verification = relationship("DocumentVerification", back_populates="document", uselist=False)


class DocumentExtraction(Base):
    __tablename__ = "document_extraction"

    id = Column(String(36), primary_key=True)
    document_id = Column(String(36), ForeignKey("application_documents.id", ondelete="CASCADE"), unique=True, nullable=False)
    extracted_text = Column(Text, nullable=True)
    extracted_fields = Column(JSON, nullable=True)  # Name, DOB, Certificate No, Address, Issuer
    confidence_score = Column(Float, default=0.0)
    ocr_engine = Column(String(50), default="PaddleOCR")
    processed_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    document = relationship("ApplicationDocument", back_populates="extraction")


class DocumentVerification(Base):
    __tablename__ = "document_verification"

    id = Column(String(36), primary_key=True)
    document_id = Column(String(36), ForeignKey("application_documents.id", ondelete="CASCADE"), unique=True, nullable=False)
    verifier_user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    is_approved = Column(Boolean, nullable=False)
    remarks = Column(Text, nullable=True)
    verified_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    document = relationship("ApplicationDocument", back_populates="verification")


class ApplicationStatusHistory(Base):
    __tablename__ = "application_status_history"

    id = Column(String(36), primary_key=True)
    application_id = Column(String(36), ForeignKey("service_applications.id", ondelete="CASCADE"), nullable=False)
    previous_status = Column(String(50), nullable=True)
    new_status = Column(String(50), nullable=False)
    changed_by_user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    remarks = Column(Text, nullable=True)
    changed_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    application = relationship("ServiceApplication", back_populates="history")


# ==============================================================================
# GROUP E: Complaints & Grievances
# ==============================================================================

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(String(36), primary_key=True)
    complaint_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=True)
    category = Column(String(100), nullable=False)
    subject = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), default="MEDIUM")  # LOW, MEDIUM, HIGH, URGENT
    status = Column(String(50), default="OPEN")  # OPEN, IN_PROGRESS, RESOLVED, CLOSED
    assigned_officer_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    resolved_at = Column(DateTime, nullable=True)


# ==============================================================================
# GROUP F: AI, RAG & Knowledge Repository (pgvector ready)
# ==============================================================================

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(String(36), primary_key=True)
    title = Column(String(255), nullable=False)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=True)
    source_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=False)
    version = Column(String(20), default="1.0")
    language = Column(String(10), default="ta_en")
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    chunks = relationship("DocumentChunk", back_populates="knowledge_doc")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(36), primary_key=True)
    knowledge_document_id = Column(String(36), ForeignKey("knowledge_documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    chunk_metadata = Column(JSON, nullable=True)
    embedding_vector_id = Column(String(100), nullable=True)  # References pgvector or vector store
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    knowledge_doc = relationship("KnowledgeDocument", back_populates="chunks")


class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)  # Nullable for anonymous public citizens
    session_title = Column(String(200), default="New Conversation")
    language = Column(String(10), default="en")
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    messages = relationship("AIMessage", back_populates="conversation")


class AIMessage(Base):
    __tablename__ = "ai_messages"

    id = Column(String(36), primary_key=True)
    conversation_id = Column(String(36), ForeignKey("ai_conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(20), nullable=False)  # user, assistant, system
    text_content = Column(Text, nullable=False)
    citations = Column(JSON, nullable=True)  # List of referenced verified knowledge docs
    confidence_score = Column(Float, nullable=True)
    feedback_rating = Column(Integer, nullable=True)  # 1 (like) or -1 (dislike)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    conversation = relationship("AIConversation", back_populates="messages")


class AIPrediction(Base):
    __tablename__ = "ai_predictions"

    id = Column(String(36), primary_key=True)
    model_name = Column(String(100), nullable=False)
    model_version = Column(String(50), nullable=False)
    prediction_type = Column(String(50), nullable=False)  # DEMAND_FORECAST, DELAY_PREDICTION, COMPLAINT_SURGE
    target_entity = Column(String(100), nullable=False)
    input_features = Column(JSON, nullable=False)
    prediction_output = Column(JSON, nullable=False)
    confidence_interval = Column(JSON, nullable=True)
    generated_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP G: Fraud, Anomaly & Transparency
# ==============================================================================

class FraudAlert(Base):
    __tablename__ = "fraud_alerts"

    id = Column(String(36), primary_key=True)
    alert_number = Column(String(50), unique=True, nullable=False, index=True)
    related_entity_type = Column(String(50), nullable=False)  # application, document, user
    related_entity_id = Column(String(36), nullable=False)
    risk_score = Column(Float, nullable=False)  # 0.0 to 1.0 (e.g., 0.88)
    risk_category = Column(String(100), nullable=False)  # DUPLICATE_DOC, ANOMALOUS_BENEFICIARY, VELOCITY_SURGE
    evidence_summary = Column(Text, nullable=False)
    investigation_status = Column(String(50), default="NEW")  # NEW, UNDER_INVESTIGATION, CLEARED, ESCALATED
    assigned_investigator_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class GovernmentProject(Base):
    __tablename__ = "government_projects"

    id = Column(String(36), primary_key=True)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=True)
    allocated_budget_inr_cr = Column(Float, nullable=False)
    spent_budget_inr_cr = Column(Float, default=0.0)
    completion_percentage = Column(Float, default=0.0)
    status = Column(String(50), default="IN_PROGRESS")
    start_date = Column(DateTime, nullable=False)
    target_completion_date = Column(DateTime, nullable=False)


class CitizenFeedback(Base):
    __tablename__ = "citizen_feedback"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    service_id = Column(String(36), ForeignKey("government_services.id"), nullable=True)
    rating = Column(Integer, nullable=False)  # 1 to 5 stars
    feedback_text = Column(Text, nullable=True)
    detected_sentiment = Column(String(20), nullable=True)  # POSITIVE, NEUTRAL, NEGATIVE
    sentiment_confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP H: Audit & System Operations
# ==============================================================================

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), nullable=True)
    user_email = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False)  # LOGIN, VIEW_SENSITIVE, APPROVE_APPLICATION, EXPORT_REPORT
    resource = Column(String(100), nullable=False)
    resource_id = Column(String(100), nullable=True)
    ip_address = Column(String(45), nullable=True)
    status_code = Column(Integer, default=200)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP I: AI Engine, ML Registry & Multi-Agent Architecture (Phase 4)
# ==============================================================================

class AIProviderConfig(Base):
    __tablename__ = "ai_provider_configs"

    id = Column(String(36), primary_key=True)
    provider_name = Column(String(50), nullable=False)  # google_gemini, openai, local_vllm
    model_name = Column(String(100), nullable=False)  # gemini-3.8-flash, gpt-4o, bge-m3
    api_endpoint = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    is_default = Column(Boolean, default=False, nullable=False)
    max_tokens = Column(Integer, default=2048)
    temperature = Column(Float, default=0.2)
    timeout_seconds = Column(Integer, default=30)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class PromptTemplate(Base):
    __tablename__ = "prompt_templates"

    id = Column(String(36), primary_key=True)
    template_code = Column(String(100), unique=True, nullable=False)  # CITIZEN_ASSIST_V1, COMPLAINT_ROUTE_V1
    language = Column(String(10), default="en", nullable=False)  # en, ta
    system_instruction = Column(Text, nullable=False)
    user_prompt_template = Column(Text, nullable=False)
    version = Column(String(20), default="1.0.0", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class EmbeddingModel(Base):
    __tablename__ = "embedding_models"

    id = Column(String(36), primary_key=True)
    model_name = Column(String(100), unique=True, nullable=False)  # BAAI/bge-m3, text-embedding-004
    dimension = Column(Integer, default=1024, nullable=False)
    similarity_metric = Column(String(20), default="cosine", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class AIEvaluationRun(Base):
    __tablename__ = "ai_evaluation_runs"

    id = Column(String(36), primary_key=True)
    evaluation_name = Column(String(150), nullable=False)
    model_or_pipeline = Column(String(100), nullable=False)
    dataset_name = Column(String(100), nullable=False)
    metrics_json = Column(JSON, nullable=False)  # {precision, recall, faithfulness, hallucination_rate, latency_ms}
    notes = Column(Text, nullable=True)
    evaluated_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ModelTrainingRun(Base):
    __tablename__ = "model_training_runs"

    id = Column(String(36), primary_key=True)
    model_family = Column(String(100), nullable=False)  # COMPLAINT_CLASSIFIER, DELAY_PREDICTOR, DEMAND_FORECASTER
    dataset_version = Column(String(50), nullable=False)
    hyperparameters = Column(JSON, nullable=False)
    training_metrics = Column(JSON, nullable=False)  # {train_loss, val_loss, f1, mae, rmse}
    status = Column(String(50), default="COMPLETED")  # QUEUED, RUNNING, COMPLETED, FAILED
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


class ModelVersion(Base):
    __tablename__ = "model_versions"

    id = Column(String(36), primary_key=True)
    model_name = Column(String(100), nullable=False)
    version_tag = Column(String(50), nullable=False)
    algorithm_type = Column(String(100), nullable=False)  # XGBoost, Random Forest, Transformer, IsolationForest
    artifact_uri = Column(String(500), nullable=False)
    evaluation_metrics = Column(JSON, nullable=False)  # {accuracy, precision, recall, f1, mae, rmse}
    is_champion = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    registered_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class PredictionResult(Base):
    __tablename__ = "prediction_results"

    id = Column(String(36), primary_key=True)
    model_version_id = Column(String(36), ForeignKey("model_versions.id"), nullable=True)
    prediction_type = Column(String(50), nullable=False)  # DELAY, DEMAND, COMPLAINT_CATEGORY, FRAUD_ANOMALY
    target_entity_id = Column(String(50), nullable=True)
    input_data = Column(JSON, nullable=False)
    output_data = Column(JSON, nullable=False)
    confidence_score = Column(Float, nullable=True)
    latency_ms = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class AgentRegistry(Base):
    __tablename__ = "agent_registry"

    id = Column(String(36), primary_key=True)
    agent_code = Column(String(50), unique=True, nullable=False)  # ORCHESTRATOR, CITIZEN_SERVICE, KNOWLEDGE_RETRIEVAL, etc.
    name = Column(String(100), nullable=False)
    role_description = Column(Text, nullable=False)
    system_prompt = Column(Text, nullable=False)
    allowed_tools = Column(JSON, nullable=False)  # ["rag_search", "ocr_parse", "predict_delay", "check_eligibility"]
    requires_human_approval = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class AgentExecution(Base):
    __tablename__ = "agent_executions"

    id = Column(String(36), primary_key=True)
    agent_id = Column(String(36), ForeignKey("agent_registry.id"), nullable=False)
    session_id = Column(String(100), nullable=False)
    trigger_source = Column(String(50), default="USER_PROMPT")  # USER_PROMPT, SCHEDULED_CRON, WORKFLOW_HOOK
    input_payload = Column(JSON, nullable=False)
    output_payload = Column(JSON, nullable=True)
    tool_calls_executed = Column(JSON, nullable=True)
    execution_status = Column(String(50), default="SUCCESS")  # SUCCESS, FAILED, AWAITING_HUMAN_APPROVAL
    execution_time_ms = Column(Integer, nullable=False)
    executed_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class WorkflowExecution(Base):
    __tablename__ = "workflow_executions"

    id = Column(String(36), primary_key=True)
    workflow_name = Column(String(100), nullable=False)
    trigger_event = Column(String(100), nullable=False)  # APPLICATION_SUBMITTED, COMPLAINT_LOGGED, FRAUD_FLAG_RAISED
    steps_executed = Column(JSON, nullable=False)
    status = Column(String(50), default="COMPLETED")  # IN_PROGRESS, COMPLETED, FAILED
    error_message = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


class DocumentProcessingJob(Base):
    __tablename__ = "document_processing_jobs"

    id = Column(String(36), primary_key=True)
    document_id = Column(String(36), nullable=False)
    job_type = Column(String(50), default="OCR_LAYOUT_EXTRACTION")
    file_path = Column(String(500), nullable=False)
    status = Column(String(50), default="COMPLETED")  # QUEUED, PROCESSING, COMPLETED, FAILED
    extracted_text = Column(Text, nullable=True)
    extracted_entities = Column(JSON, nullable=True)
    confidence_score = Column(Float, default=0.0)
    flags = Column(JSON, nullable=True)
    processed_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP J: Phase 5 - Governance Analytics & Performance Metrics
# ==============================================================================

class AnalyticsSnapshot(Base):
    __tablename__ = "analytics_snapshots"

    id = Column(String(36), primary_key=True)
    snapshot_date = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    metric_category = Column(String(50), nullable=False)  # GOVERNANCE, SERVICE, COMPLAINT, WORKLOAD
    aggregation_level = Column(String(50), nullable=False)  # STATE, DISTRICT, DEPARTMENT
    entity_id = Column(String(100), nullable=True)
    metrics_data = Column(JSON, nullable=False)
    calculated_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class DepartmentMetrics(Base):
    __tablename__ = "department_metrics"

    id = Column(String(36), primary_key=True)
    department_id = Column(String(36), ForeignKey("departments.id"), nullable=False)
    period = Column(String(20), nullable=False)  # 2026-Q1, 2026-10
    total_applications = Column(Integer, default=0, nullable=False)
    approved_count = Column(Integer, default=0, nullable=False)
    rejected_count = Column(Integer, default=0, nullable=False)
    pending_count = Column(Integer, default=0, nullable=False)
    avg_processing_days = Column(Float, default=0.0, nullable=False)
    sla_compliance_rate = Column(Float, default=0.0, nullable=False)
    complaints_count = Column(Integer, default=0, nullable=False)
    complaints_resolved = Column(Integer, default=0, nullable=False)
    workload_index = Column(Float, default=1.0, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class DistrictMetrics(Base):
    __tablename__ = "district_metrics"

    id = Column(String(36), primary_key=True)
    district_id = Column(String(36), ForeignKey("districts.id"), nullable=False)
    district_name = Column(String(100), nullable=False)
    service_delivery_score = Column(Float, default=85.0, nullable=False)
    active_applications = Column(Integer, default=0, nullable=False)
    active_complaints = Column(Integer, default=0, nullable=False)
    resolved_sla_rate = Column(Float, default=92.0, nullable=False)
    kiosk_utilization_rate = Column(Float, default=78.5, nullable=False)
    top_demanded_service = Column(String(100), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP K: Phase 5 - Public Transparency & Government Projects
# ==============================================================================

class GovernmentProject(Base):
    __tablename__ = "government_projects"

    id = Column(String(36), primary_key=True)
    project_code = Column(String(50), unique=True, nullable=False, index=True)
    title_en = Column(String(255), nullable=False)
    title_ta = Column(String(255), nullable=False)
    department_name = Column(String(100), nullable=False)
    district_name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    sanctioned_budget_cr = Column(Float, nullable=False)  # in Crores INR
    expenditure_cr = Column(Float, default=0.0, nullable=False)
    completion_percentage = Column(Float, default=0.0, nullable=False)
    status = Column(String(50), default="IN_PROGRESS", nullable=False)  # PLANNING, SANCTIONED, IN_PROGRESS, COMPLETED, AUDITED
    start_date = Column(String(20), nullable=False)
    target_completion_date = Column(String(20), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    is_public = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(String(36), primary_key=True)
    project_id = Column(String(36), ForeignKey("government_projects.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    target_date = Column(String(20), nullable=False)
    completed_date = Column(String(20), nullable=True)
    status = Column(String(50), default="PENDING")  # PENDING, IN_PROGRESS, COMPLETED, DELAYED
    progress_percentage = Column(Float, default=0.0)


class PublicDatasetMetadata(Base):
    __tablename__ = "public_dataset_metadata"

    id = Column(String(36), primary_key=True)
    dataset_title = Column(String(200), nullable=False)
    department = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)  # DEMOGRAPHICS, REVENUE, AGRICULTURE, HEALTH, ROADS
    format = Column(String(20), default="CSV", nullable=False)  # CSV, JSON, GEOJSON, XLSX
    records_count = Column(Integer, default=0, nullable=False)
    file_size_mb = Column(Float, default=0.0, nullable=False)
    download_url = Column(String(500), nullable=False)
    license = Column(String(100), default="National Data Sharing & Accessibility Policy (NDSAP)", nullable=False)
    last_updated = Column(DateTime, default=datetime.utcnow, nullable=False)
    is_public = Column(Boolean, default=True, nullable=False)


# ==============================================================================
# GROUP L: Phase 5 - Infrastructure & Resource Monitoring
# ==============================================================================

class InfrastructureAsset(Base):
    __tablename__ = "infrastructure_assets"

    id = Column(String(36), primary_key=True)
    asset_code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)  # ROADS, WATER_SUPPLY, ELECTRICITY, PUBLIC_BUILDINGS, SANITATION
    district_name = Column(String(100), nullable=False)
    location_details = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    operational_status = Column(String(50), default="OPERATIONAL", nullable=False)  # OPERATIONAL, DEGRADED, MAINTENANCE_REQUIRED, CRITICAL
    health_score = Column(Float, default=100.0, nullable=False)
    last_inspected = Column(DateTime, default=datetime.utcnow, nullable=False)
    next_scheduled_maintenance = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class InfrastructureAlert(Base):
    __tablename__ = "infrastructure_alerts"

    id = Column(String(36), primary_key=True)
    asset_id = Column(String(36), ForeignKey("infrastructure_assets.id"), nullable=False)
    alert_level = Column(String(20), nullable=False)  # INFO, WARNING, CRITICAL, EMERGENCY
    issue_type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    suggested_action = Column(Text, nullable=True)
    status = Column(String(50), default="OPEN", nullable=False)  # OPEN, ASSIGNED, RESOLVED
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class MaintenanceRecord(Base):
    __tablename__ = "maintenance_records"

    id = Column(String(36), primary_key=True)
    asset_id = Column(String(36), ForeignKey("infrastructure_assets.id"), nullable=False)
    maintenance_type = Column(String(50), nullable=False)  # PREVENTIVE, CORRECTIVE, EMERGENCY
    contractor_name = Column(String(200), nullable=True)
    cost_incurred_inr = Column(Float, default=0.0)
    scheduled_date = Column(String(20), nullable=False)
    completion_date = Column(String(20), nullable=True)
    status = Column(String(50), default="COMPLETED", nullable=False)


# ==============================================================================
# GROUP M: Phase 5 - Compliance & DPDP Governance
# ==============================================================================

class CompliancePolicy(Base):
    __tablename__ = "compliance_policies"

    id = Column(String(36), primary_key=True)
    policy_code = Column(String(50), unique=True, nullable=False)
    name = Column(String(200), nullable=False)
    framework = Column(String(100), nullable=False)  # DPDP_2023, RTI_ACT, TAMIL_NADU_RIGHT_TO_SERVICES, ISO27001
    responsible_department = Column(String(100), nullable=False)
    compliance_score = Column(Float, default=100.0, nullable=False)
    status = Column(String(50), default="COMPLIANT", nullable=False)  # COMPLIANT, UNDER_REVIEW, NON_COMPLIANT
    last_audit_date = Column(String(20), nullable=False)
    next_review_date = Column(String(20), nullable=False)
    description = Column(Text, nullable=False)


class ComplianceReview(Base):
    __tablename__ = "compliance_reviews"

    id = Column(String(36), primary_key=True)
    policy_id = Column(String(36), ForeignKey("compliance_policies.id"), nullable=False)
    auditor_name = Column(String(150), nullable=False)
    review_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    findings = Column(Text, nullable=False)
    corrective_actions = Column(JSON, nullable=True)
    status = Column(String(50), default="APPROVED", nullable=False)


# ==============================================================================
# GROUP N: Phase 5 - Centralized Integrations & Notifications
# ==============================================================================

class IntegrationRegistry(Base):
    __tablename__ = "integration_registry"

    id = Column(String(36), primary_key=True)
    service_code = Column(String(50), unique=True, nullable=False)  # GOV_ESEVAI, SMS_CDAC, EMAIL_NIC, MAPS_TN_GIS, STORAGE_MINIO, PAYMENT_SBI_EPAY
    service_name = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False)  # GOVERNMENT, SMS, EMAIL, MAPS, STORAGE, PAYMENT
    endpoint_url = Column(String(255), nullable=False)
    auth_type = Column(String(50), default="API_KEY")  # API_KEY, OAUTH2, MTLS, HMAC
    is_active = Column(Boolean, default=True, nullable=False)
    health_status = Column(String(50), default="HEALTHY", nullable=False)  # HEALTHY, DEGRADED, OFFLINE
    last_ping_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    latency_ms = Column(Float, default=12.5)


class NotificationDeliveryLog(Base):
    __tablename__ = "notification_delivery_logs"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), nullable=False)
    channel = Column(String(20), nullable=False)  # IN_APP, SMS, EMAIL, PUSH
    event_type = Column(String(50), nullable=False)  # APP_SUBMITTED, STATUS_CHANGED, COMPLAINT_RESOLVED
    recipient = Column(String(255), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    delivery_status = Column(String(50), default="DELIVERED", nullable=False)  # QUEUED, SENT, DELIVERED, FAILED
    retry_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class RegisteredMobileDevice(Base):
    __tablename__ = "registered_mobile_devices"

    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), nullable=False, index=True)
    device_token = Column(String(255), unique=True, nullable=False)
    platform = Column(String(20), nullable=False)  # ANDROID, IOS
    device_model = Column(String(100), nullable=True)
    os_version = Column(String(50), nullable=True)
    app_version = Column(String(50), default="1.0.0", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    registered_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_active_at = Column(DateTime, default=datetime.utcnow, nullable=False)


# ==============================================================================
# GROUP O: Phase 5 - Business Intelligence & Reports Engine
# ==============================================================================

class ReportJob(Base):
    __tablename__ = "report_jobs"

    id = Column(String(36), primary_key=True)
    report_type = Column(String(100), nullable=False)  # DEPARTMENT_PERFORMANCE, DISTRICT_GOVERNANCE, FRAUD_SUMMARY, COMPLIANCE_AUDIT, INFRASTRUCTURE
    requested_by = Column(String(100), nullable=False)
    parameters = Column(JSON, nullable=False)  # {department, district, date_range, format}
    status = Column(String(50), default="COMPLETED", nullable=False)  # QUEUED, PROCESSING, COMPLETED, FAILED
    output_format = Column(String(20), default="PDF", nullable=False)  # PDF, CSV, XLSX
    file_path = Column(String(500), nullable=True)
    file_size_bytes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


