# GovAI Nexus – Complete API Documentation
**FastAPI REST Endpoints Specification | Version 1.0 (`/api/v1/`)**

---

## 1. Authentication & Security Headers

All requests to private endpoints must include the standard HTTP Authorization header:
```http
Authorization: Bearer <jwt_access_token>
```
Tokens are signed using HMAC-SHA256 with role claims: `CITIZEN`, `EMPLOYEE`, `OFFICER`, `SUPER_ADMIN`.

---

## 2. Core API Route Registry

### 2.1 Authentication & Profile (`/api/v1/auth/`)
- `POST /api/v1/auth/register`: Register citizen with mobile/email.
- `POST /api/v1/auth/login`: Authenticate and receive JWT access token.
- `POST /api/v1/auth/refresh`: Renew expired access token.
- `GET /api/v1/auth/me`: Fetch authenticated user profile and permissions.

### 2.2 Citizen Services & Applications (`/api/v1/applications/`)
- `GET /api/v1/applications`: List citizen's submitted applications.
- `POST /api/v1/applications`: Submit new service application.
- `GET /api/v1/applications/{app_id}`: Fetch status and timeline of a specific application.
- `POST /api/v1/applications/{app_id}/documents`: Upload citizen support documents with OCR scanning.

### 2.3 Grievances & Redressal (`/api/v1/grievances/`)
- `GET /api/v1/grievances`: List citizen's filed complaints.
- `POST /api/v1/grievances`: Submit new grievance with auto-NLP categorization.
- `GET /api/v1/grievances/{id}/status`: Track resolution SLA and assigned officer.

### 2.4 AI & RAG Engine (`/api/v1/ai/`)
- `POST /api/v1/ai/chat`: Citizen AI assistant with bilingual (Tamil + English) RAG retrieval and citations.
- `POST /api/v1/ai/voice/stt`: Convert Tamil/English voice speech to text.
- `POST /api/v1/ai/voice/tts`: Convert text answer to natural speech audio stream.

### 2.5 Officer & Employee Portals (`/api/v1/officer/` & `/api/v1/employee/`)
- `GET /api/v1/employee/queue`: Retrieve pending applications prioritized by SLA urgency.
- `POST /api/v1/employee/review`: Record verification remarks and pass to officer.
- `POST /api/v1/officer/approve`: Officer digital signature approval or rejection with reason.

### 2.6 Governance Analytics & Public Transparency (`/api/v1/analytics/` & `/api/v1/transparency/`)
- `GET /api/v1/analytics/governance`: Statewide KPIs, department SLA compliance, workload indices.
- `GET /api/v1/analytics/districts`: Performance breakdown across all 38 districts of Tamil Nadu.
- `GET /api/v1/transparency/summary`: Public portal metrics, ongoing capital projects, fund disbursements.
- `GET /api/v1/transparency/expenditures`: Public expenditure ledger with anonymized contractor data.

### 2.7 Super Admin & Governance Engine (`/api/v1/admin/`)
- `GET /api/v1/admin/audit-logs`: Query immutable system audit logs with actor and IP filters.
- `GET /api/v1/compliance/dpdp`: DPDP Act 2023 compliance status, PII redaction metrics, consent logs.
- `GET /health`: Production liveness, readiness, and subsystem connectivity status.

---

## 3. Interactive Documentation
- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`
- **OpenAPI Schema**: `/openapi.json`
