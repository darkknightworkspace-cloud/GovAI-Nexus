import React, { useState } from 'react';
import { 
  FileCode, Database, Cpu, Shield, Layers, BookOpen, 
  CheckCircle2, Copy, Download, Code2, Server, GitBranch
} from 'lucide-react';

interface ArchitectureDocsViewerProps {
  language: 'en' | 'ta';
}

export const ArchitectureDocsViewer: React.FC<ArchitectureDocsViewerProps> = ({ language }) => {
  const isTamil = language === 'ta';
  const [selectedDoc, setSelectedDoc] = useState<'architecture' | 'database' | 'api' | 'ai' | 'security' | 'python_models' | 'fastapi_main' | 'roadmap'>('architecture');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold mb-1">
            <Server className="w-3.5 h-3.5" />
            <span>Python 3.12 + FastAPI + PostgreSQL (pgvector)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            {isTamil ? 'GovAI Nexus - கட்டமைப்பு & பைதான் குறியீடு ஆவணங்கள்' : 'GovAI Nexus Architecture & Python Codebase Explorer'}
          </h2>
          <p className="text-sm text-slate-500">
            {isTamil
              ? 'படிநிலை 1 மற்றும் 2 க்கான முழுமையான தொழில்நுட்ப ஆவணங்கள், தரவுத்தள மாதிரிகள் மற்றும் FastAPI எண்ட்பாயிண்டுகள்.'
              : 'Complete Phase 1 & Phase 2 technical foundation, relational database models, and FastAPI API contracts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(`https://github.com/govai-nexus/tn-digital-governance`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>{copied ? 'Copied URI' : 'Monorepo Blueprint'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Documents */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-medium">
        <button
          onClick={() => setSelectedDoc('architecture')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'architecture'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>System Architecture (6 Layers)</span>
        </button>

        <button
          onClick={() => setSelectedDoc('database')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'database'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>PostgreSQL & pgvector (43 Tables)</span>
        </button>

        <button
          onClick={() => setSelectedDoc('api')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'api'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>FastAPI REST Endpoints</span>
        </button>

        <button
          onClick={() => setSelectedDoc('python_models')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'python_models'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-amber-500" />
          <span>backend/models.py (SQLAlchemy 2.0)</span>
        </button>

        <button
          onClick={() => setSelectedDoc('fastapi_main')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'fastapi_main'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-emerald-500" />
          <span>backend/main.py (FastAPI App)</span>
        </button>

        <button
          onClick={() => setSelectedDoc('ai')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'ai'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>AI, RAG & PaddleOCR IDP</span>
        </button>

        <button
          onClick={() => setSelectedDoc('security')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'security'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Security & DPDP 2023</span>
        </button>

        <button
          onClick={() => setSelectedDoc('roadmap')}
          className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedDoc === 'roadmap'
              ? 'bg-[#102A43] text-white shadow-xs font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>6-Phase Roadmap</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-xl">
        {selectedDoc === 'architecture' && (
          <div className="space-y-4">
            <div className="text-amber-400 font-bold text-sm">
              # SYSTEM ARCHITECTURE SPECIFICATION (Modular Monolith)
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`PRESENTATION LAYER:
  • Web Frontends: React 19 + TypeScript + Tailwind CSS (Vite)
  • Mobile Apps: React Native + Expo SDK 52 (Expo Router) for Android & iOS
  • Portals: 1. Public Web | 2. Citizen | 3. Employee | 4. Officer/HOD | 5. Super Admin | 6. AI & Analytics

API GATEWAY & ROUTING (FastAPI):
  • Base URI: /api/v1/*
  • OpenAPI 3.1 & Pydantic v2 data validation
  • Rate Limiting, JWT + OTP session management
  • CORS configured for Web & Mobile domains

DOMAIN APPLICATION MODULES (Python 3.12+):
  • IAM & Roles: RBAC (CITIZEN, EMPLOYEE, OFFICER, SUPER_ADMIN)
  • Services & Schemes: Tamil Nadu Revenue, Social Welfare, Land Records
  • Application Processing: Asynchronous state machine & verification
  • Document Management: Presigned S3 uploads & SHA-256 deduplication
  • Grievance Redressal: Priority routing & CM Helpline escalation

AI & ML INTELLIGENCE LAYER:
  • RAG Engine: Hybrid Dense (pgvector HNSW) + Sparse (BM25) search
  • LLM Grounding: Strict citation of verified Government Orders (G.O.s)
  • OCR Subsystem: PaddleOCR v4 (Tamil & English) + confidence scoring
  • ML Engines: Scikit-learn & XGBoost for demand & processing delay forecasting

PERSISTENCE & INFRASTRUCTURE:
  • Primary Database: PostgreSQL 16+ (43 normalized tables)
  • Vector Extension: pgvector (1024-dim BGE-M3 multilingual embeddings)
  • Cache & Broker: Redis 7+
  • Background Tasks: Celery workers`}
            </pre>
          </div>
        )}

        {selectedDoc === 'database' && (
          <div className="space-y-4">
            <div className="text-emerald-400 font-bold text-sm">
              # DATABASE DATA MODEL: 43 TABLES SPECIFICATION
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`GROUP A: Identity & Access Management (IAM)
  1. users (id, email, phone_number, hashed_password, user_type, is_active, language)
  2. citizen_profiles (id, user_id, full_name_en, full_name_ta, dob, gender, district_id)
  3. employee_profiles (id, user_id, employee_code, department_id, designation)
  4. roles (id, name, code, description)
  5. permissions (id, name, code, module)
  6. user_roles (id, user_id, role_id)
  7. role_permissions (id, role_id, permission_id)
  8. user_sessions (id, user_id, refresh_token, ip_address, expires_at)
  9. consent_records (id, user_id, purpose, consented, consent_version, timestamp)

GROUP B: Tamil Nadu Geography & Department Hierarchy
  10. states (id, name_en, name_ta, code)
  11. districts (id, state_id, name_en, name_ta, headquarters) [38 Districts]
  12. local_bodies (id, district_id, name_en, name_ta, body_type)
  13. departments (id, name_en, name_ta, code, hod_name, contact_email)
  14. department_employees (id, department_id, user_id, role_in_department)

GROUP C: Services & Schemes
  15. government_services (id, department_id, title_en, title_ta, fee, sla_days)
  16. government_schemes (id, department_id, title_en, title_ta, benefit_summary)
  17. scheme_eligibility (id, scheme_id, criteria_key, criteria_operator, criteria_value)
  18. service_requirements (id, service_id, document_name_en, is_mandatory)

GROUP D: Application & Document Workflows
  19. service_applications (id, application_number, user_id, service_id, status)
  20. application_documents (id, application_id, document_type, file_path, status)
  21. document_extraction (id, document_id, extracted_text, confidence_score)
  22. document_verification (id, document_id, verifier_user_id, is_approved)
  23. application_status_history (id, application_id, previous_status, new_status)

GROUP E: Complaints & Grievances
  24. complaints (id, complaint_number, user_id, department_id, priority, status)
  25. complaint_assignments (id, complaint_id, assigned_to_user_id)
  26. complaint_updates (id, complaint_id, action_taken, internal_notes)
  27. complaint_categories (id, department_id, category_name_en, sla_hours)

GROUP F: AI, RAG & Vector Knowledge Base
  28. knowledge_documents (id, title, department_id, source_url, is_verified)
  29. document_chunks (id, knowledge_doc_id, chunk_index, content, embedding_vector [VECTOR(1024)])
  30. ai_conversations (id, user_id, session_title, language)
  31. ai_messages (id, conversation_id, sender, text_content, citations)
  32. ai_predictions (id, model_name, prediction_type, target_entity, output)
  33. model_registry (id, model_name, version, weights_uri, is_active)

GROUP G: Fraud, Anomaly & Transparency
  34. fraud_alerts (id, alert_number, related_entity_id, risk_score, evidence)
  35. government_projects (id, title_en, allocated_budget_cr, spent_budget_cr, status)
  36. project_progress (id, project_id, milestone_title, milestone_status)
  37. public_datasets (id, title_en, file_format, download_count)
  38. citizen_feedback (id, user_id, service_id, rating, detected_sentiment)
  39. sentiment_results (id, batch_date, department_id, positive_count)

GROUP H: Audit & System Operations
  40. notifications (id, user_id, title_en, message_en, is_read)
  41. audit_logs (id, user_id, action, resource, ip_address, timestamp)
  42. system_configuration (id, config_key, config_value, environment)
  43. background_jobs (id, job_type, status, retry_count, created_at)`}
            </pre>
          </div>
        )}

        {selectedDoc === 'api' && (
          <div className="space-y-4">
            <div className="text-purple-400 font-bold text-sm">
              # REST API SPECIFICATION (FastAPI Endpoints at /api/v1/*)
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`POST /api/v1/auth/register          -> Citizen registration with DPDP 2023 consent
POST /api/v1/auth/login             -> Returns JWT Access & Refresh Token pair
GET  /api/v1/auth/me                -> Fetches authenticated profile & permissions
GET  /api/v1/services               -> Filterable Tamil Nadu service catalog
GET  /api/v1/schemes                -> State welfare schemes & benefit descriptions
POST /api/v1/schemes/check-eligibility -> Automated multi-criteria rule matching
POST /api/v1/applications           -> Application submission with form_data JSON
POST /api/v1/applications/{id}/submit -> Final submission triggering async OCR checks
POST /api/v1/documents/upload       -> Presigned S3 multipart document upload
GET  /api/v1/documents/{id}/extraction -> PaddleOCR extracted text & bounding boxes
POST /api/v1/documents/{id}/verify  -> Caseworker approval with digital signature
POST /api/v1/ai/chat                -> Bilingual RAG chat with G.O. citations
POST /api/v1/ai/chat/stream         -> SSE token streaming for responsive chat
POST /api/v1/ml/predict/delay       -> Application queue turnaround forecasting
GET  /api/v1/fraud/alerts           -> Duplicate hash and velocity anomaly records
GET  /api/v1/public/projects        -> Tamil Nadu infrastructure milestone tracker
GET  /api/v1/analytics/departments  -> Department-level SLA compliance metrics`}
            </pre>
          </div>
        )}

        {selectedDoc === 'python_models' && (
          <div className="space-y-4">
            <div className="text-amber-300 font-bold text-sm">
              # BACKEND/APP/DATABASE/MODELS.PY (SQLAlchemy 2.0 Declarative Models)
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone_number = Column(String(20), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    user_type = Column(String(50), nullable=False, default="citizen") # citizen, employee, officer, admin
    is_active = Column(Boolean, default=True)
    preferred_language = Column(String(10), default="en")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    id = Column(String(36), primary_key=True)
    knowledge_document_id = Column(String(36), ForeignKey("knowledge_documents.id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    chunk_metadata = Column(JSON, nullable=True)
    embedding_vector_id = Column(String(100), nullable=True) # pgvector HNSW index`}
            </pre>
          </div>
        )}

        {selectedDoc === 'fastapi_main' && (
          <div className="space-y-4">
            <div className="text-emerald-300 font-bold text-sm">
              # BACKEND/APP/MAIN.PY (FastAPI App with CORS & Routers)
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_TITLE,
    version="1.0.0",
    description="Enterprise REST API for Tamil Nadu GovAI Nexus Digital Governance Platform",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`}
            </pre>
          </div>
        )}

        {selectedDoc === 'ai' && (
          <div className="space-y-4">
            <div className="text-cyan-400 font-bold text-sm">
              # AI, RAG & MULTI-AGENT ORCHESTRATION ARCHITECTURE
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`1. MULTILINGUAL RAG PIPELINE:
   • Citizen Query -> Tamil/English intent detector
   • Hybrid Retrieval: pgvector Cosine Distance (BGE-M3) + BM25 keyword matching
   • Cross-encoder Reranker selects top 5 high-relevance chunks
   • Citation Guardrail: Answers must reference official G.O. / Gazette numbers
   • Refusal Policy: If no official government documentation matches, prompt citizen to contact Department Nodal Officer

2. INTELLIGENT DOCUMENT PROCESSING (PaddleOCR):
   • Layout Parser identifies seals, signatures, and document headers
   • Bilingual OCR extracts text from Community, Income, and Nativity certificates
   • Field Confidence: Scores below 80% automatically trigger manual caseworker review

3. MULTI-AGENT SYSTEM (9 Specialized Agents):
   • Orchestrator Agent · Citizen Service Agent · Knowledge Retrieval Agent
   • Document Intelligence Agent · Complaint Management Agent · Analytics Agent
   • Fraud Intelligence Agent · Language & Translation Agent · Governance Monitoring Agent`}
            </pre>
          </div>
        )}

        {selectedDoc === 'security' && (
          <div className="space-y-4">
            <div className="text-rose-400 font-bold text-sm">
              # SECURITY, PRIVACY & DPDP ACT 2023 COMPLIANCE
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`• Consent Ledger: Immutable consent entries logged in consent_records table
• Purpose Limitation: Data collected for certificate issuance cannot be repurposed
• Zero Trust RBAC: Strict privilege separation between citizens, caseworkers, and officers
• Password Security: Argon2id salted hashing with high memory cost
• Cryptography: TLS 1.3 in transit, AES-256 for persistent database volumes
• Audit Trail: Every administrative review or status mutation is logged to audit_logs with IP and actor details`}
            </pre>
          </div>
        )}

        {selectedDoc === 'roadmap' && (
          <div className="space-y-4">
            <div className="text-amber-400 font-bold text-sm">
              # SIX-PHASE MASTER DEVELOPMENT ROADMAP
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
{`Phase 1: Foundation & System Architecture (COMPLETED)
  - 12 comprehensive architecture deliverables, 43 database tables, FastAPI schemas

Phase 2: Complete UI/UX Design & Prototyping (CURRENT IN UI)
  - 6 Portals, 45 distinct page-level layouts, 24 mobile app screens (Expo), design tokens

Phase 3: Full-Stack Core Platform Development
  - FastAPI backend implementation, PostgreSQL connection pooling, DPDP consent workflows

Phase 4: AI, ML, GenAI & Intelligent Automation
  - RAG bi-encoder embeddings, PaddleOCR pipeline, XGBoost workload forecasting

Phase 5: Advanced Governance, Analytics & Mobile Ecosystem
  - Open Data portal, React Native / Expo store deployment, District GIS maps

Phase 6: Enterprise Testing, Security Audit & Production Deployment
  - STQC & CERT-In compliance certification, load testing, multi-AZ deployment on Cloud Run`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
