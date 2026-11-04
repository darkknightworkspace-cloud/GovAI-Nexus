# GovAI Nexus – REST API Specification (FastAPI v1)

## 1. Architectural Conventions
- **Base URI:** `https://api.govainexus.tn.gov.in/api/v1`
- **Protocol:** HTTPS / TLS 1.3
- **Format:** JSON (`application/json`)
- **Authentication:** Bearer JWT Token in `Authorization` header (`Bearer <access_token>`)
- **Bilingual Response Support:** Clients can supply `Accept-Language: ta` or `en` for localized system strings.

## 2. Global Error Structure
```json
{
  "success": false,
  "error_code": "RESOURCE_NOT_FOUND",
  "message": "Application with number APP-TN-2026-9012 does not exist.",
  "timestamp": "2026-10-31T08:15:00Z",
  "path": "/api/v1/applications/APP-TN-2026-9012"
}
```

## 3. Endpoints by Domain Module

### Module 1: Authentication & Identity
- `POST /auth/register` (Public): Citizen signup with phone number, email, password, and DPDP consent.
- `POST /auth/login` (Public): Issue access and refresh tokens. Supports multi-role login.
- `POST /auth/refresh` (Authenticated): Rotate refresh token.
- `POST /auth/logout` (Authenticated): Blacklist token in Redis.
- `POST /auth/verify-otp` (Public): Verify SMS OTP for phone authentication.
- `GET /auth/me` (Authenticated): Retrieve authenticated user profile, roles, and permissions.

### Module 2: Users & RBAC
- `GET /users` (Admin/Officer): Filterable list of platform users.
- `POST /users` (Admin): Create employee or officer accounts.
- `GET /users/{id}` (Self/Admin): Retrieve profile details.
- `PATCH /users/{id}` (Self/Admin): Update contact information and preferred language.
- `GET /roles` (Admin): List available system roles (CITIZEN, EMPLOYEE, HOD, ADMIN).
- `POST /roles/assign` (Admin): Assign role to a specific user.

### Module 3: Geography & Departments
- `GET /districts` (Public): List all 38 districts of Tamil Nadu.
- `GET /local-bodies` (Public): Filter by district and body type (Corporation, Municipality, Panchayat).
- `GET /departments` (Public): List government departments (Revenue, Health, Agriculture, Social Welfare, etc.).
- `GET /departments/{id}` (Public): Department profile, active services, schemes, and leadership.

### Module 4: Services & Schemes
- `GET /services` (Public): Search and filter services by department and category.
- `GET /services/{id}` (Public): Complete service details, required documents, fee, and SLA.
- `GET /schemes` (Public): Search state welfare schemes.
- `GET /schemes/{id}` (Public): Eligibility criteria and application instructions.
- `POST /schemes/check-eligibility` (Public/Citizen): Automated matching based on age, income, community, district.
- `GET /schemes/recommendations` (Citizen): Personalized scheme recommendations for authenticated citizen.

### Module 5: Applications & Document Workflows
- `GET /applications` (Citizen/Employee): List applications with pagination and status filters.
- `POST /applications` (Citizen): Create new service application.
- `GET /applications/{id}` (Citizen/Employee): Application details, uploaded documents, timeline.
- `POST /applications/{id}/submit` (Citizen): Formal submission triggering automated checks.
- `POST /applications/{id}/documents` (Citizen): Multipart document upload to S3.
- `POST /documents/{id}/process` (Internal/Celery): Trigger PaddleOCR text and entity extraction.
- `GET /documents/{id}/extraction` (Employee/Officer): Retrieve OCR bounding boxes and field confidence.
- `POST /documents/{id}/verify` (Employee): Mark document as human-verified or request correction.

### Module 6: Employee & Department Workflows
- `GET /employee/tasks` (Employee): Work queue filtered by SLA urgency.
- `POST /applications/{id}/assign` (Officer): Reassign application to specific employee.
- `POST /applications/{id}/review` (Employee): Add internal notes and recommendation.
- `POST /applications/{id}/decision` (Officer): Final approval or rejection with G.O. reference.

### Module 7: Complaints & Grievances
- `GET /complaints` (Citizen/Officer): List complaints.
- `POST /complaints` (Citizen): Lodge a grievance with location and attachment.
- `GET /complaints/{id}` (Citizen/Officer): Complaint status and escalation timeline.
- `POST /complaints/{id}/escalate` (Officer): Escalate overdue complaint to District Collectorate.

### Module 8: AI & RAG Engine
- `POST /ai/chat` (Public/Citizen): Query conversational assistant with RAG citations.
- `POST /ai/chat/stream` (Public/Citizen): Server-Sent Events (SSE) streaming token output.
- `GET /ai/conversations` (Citizen): List saved conversation sessions.
- `POST /ai/feedback` (Citizen): Record thumbs-up/down feedback on answer quality.
- `POST /knowledge/documents/ingest` (Admin): Chunk and embed new government policy document.

### Module 9: Machine Learning & Fraud Intelligence
- `POST /ml/predict/delay` (Officer/Admin): Predict processing delay for application batches.
- `POST /ml/predict/demand` (Officer/Admin): 7-day or 30-day intake volume forecasting.
- `GET /fraud/alerts` (Officer/Admin): List detected anomalies and duplicate document flags.
- `POST /fraud/alerts/{id}/investigate` (Officer): Record audit outcome (Cleared vs. Flagged for Audit).

### Module 10: Public Transparency & Analytics
- `GET /public/projects` (Public): Physical and financial milestones of Tamil Nadu public works.
- `GET /public/datasets` (Public): Open government data catalog with CSV/JSON downloads.
- `GET /analytics/departments` (Officer/Admin): Aggregated SLA adherence and citizen satisfaction.
