# GovAI Nexus – AI-Powered GovTech & Digital Governance Platform
**Government of Tamil Nadu | தமிழ்நாடு அரசு**

> **Tagline:** Smarter Government. Faster Services. Transparent Governance.  
> **Primary Backend:** Python 3.12+ (FastAPI, SQLAlchemy 2.0, Pydantic, pgvector, Redis, Celery)  
> **Primary Frontend:** React 19 + TypeScript + Tailwind CSS (Vite)  
> **Mobile Ecosystem:** React Native + Expo (Android & iOS)

---

## 🏛️ Executive Overview
**GovAI Nexus** is a state-level, AI-powered digital governance platform engineered for the Government of Tamil Nadu, India. It unifies citizens, departmental caseworkers, district officers, and state leadership within a secure, bilingual (Tamil & English) digital architecture.

The platform combines modern web engineering with cutting-edge Python AI subsystems:
- **Retrieval-Augmented Generation (RAG):** Answers citizen queries strictly using verified Government Orders (G.O.s) and official citizen charters, eliminating AI hallucination.
- **Intelligent Document Processing (IDP):** Employs PaddleOCR and regex/NER extraction to parse certificates, calculate field-level confidence scores, and empower caseworkers with a split-screen verification workspace.
- **Predictive Analytics:** Employs Scikit-learn and XGBoost time-series models to forecast application intake surges and predict processing bottlenecks across Tamil Nadu's 38 districts.
- **Fraud & Anomaly Intelligence:** Flags suspicious patterns, duplicate document binary fingerprints, and application velocities before certificates are issued.
- **Compliance with DPDP Act, 2023:** Built-in digital consent ledgers, purpose limitation, and tamper-evident audit trails.

---

## 🧭 Six Unified Portals & 45 Core Web Pages

1. **Public Government Website (Pages 01–07):**
   - Official Tamil Nadu homepage matching the reference design: Hero with landmark montage, service category cards, leadership vision, AI assistant card, welfare schemes, open transparency data, and latest news.
   - Dedicated pages: *About GovAI Nexus*, *Government Services Catalog*, *Schemes & Benefits*, *Public Information*, *Transparency Portal*, *Contact & Help*.

2. **Citizen Portal (Pages 08–17):**
   - *Registration* (with OTP & DPDP consent), *Login*, *Personalized Dashboard*, *Profile & Consent*, *AI Citizen Assistant* (with voice simulation & G.O. citations), *Service Explorer*, *Scheme Recommendations*, *Apply for Services* (5-step wizard with document upload), *My Applications* (live timeline & certificate download), *Complaints & Grievances*.

3. **Government Employee Portal (Pages 18–24):**
   - *Employee Login*, *Operational Dashboard*, *Application Processing Queue*, *Split-Screen Document Verification* (interactive OCR bounding boxes & field confidence), *Complaint Redressal*, *Task Kanban Board*, *Performance Reports*.

4. **Department Officer / HOD Portal (Pages 25–30):**
   - *Officer Dashboard*, *Department Management*, *District Workload Heatmaps*, *Predictive Analytics* (demand & delay forecasting), *Fraud & Anomaly Investigation Desk*, *Department Reports*.

5. **Super Admin Portal (Pages 31–38):**
   - *Admin Dashboard*, *User Management*, *Department Setup*, *Granular Roles & Permissions Matrix*, *Service Catalog Configuration*, *AI Model Management*, *System Configuration*, *Security & Audit Logs*.

6. **AI & Analytics Centre (Pages 39–45):**
   - *AI Knowledge Centre* (RAG ingestion & embedding status), *Predictive Intelligence*, *Fraud Intelligence*, *Public Transparency Centre*, *Citizen Sentiment Centre* (multilingual sentiment analysis), *Infrastructure GIS Monitoring*, *Compliance & DPDP Governance Centre*.

---

## 📱 Mobile Application (React Native + Expo)
- **24 dedicated screens** covering Splash, Onboarding, Language Selection, Mobile Authentication, Home Dashboard, Service Discovery, Voice Assistant, Camera Document Scanner, Application Tracking, and Grievance Filing.

---

## 🛠️ Technology Stack

| Layer | Primary Technology |
| :--- | :--- |
| **Backend API** | Python 3.12+, FastAPI, Pydantic v2, Uvicorn |
| **Database** | PostgreSQL 16+, pgvector (HNSW cosine search), SQLAlchemy 2.0 (async) |
| **Cache & Task Queue** | Redis 7, Celery, Flower |
| **AI / GenAI** | Python, RAG Pipeline, Sentence Transformers (BGE-M3), Google Gemini SDK |
| **OCR & Vision** | PaddleOCR v4 (Tamil & English script), Tesseract |
| **ML & Analytics** | Scikit-learn, XGBoost, Pandas, NumPy |
| **Web Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion |
| **Mobile Frontend** | React Native, Expo SDK 52, Expo Router |

---

## 🚀 Quickstart & Architecture Documentation

All architectural specifications, database schemas, and API contracts are available in the `docs/` directory:
- [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [Database Design (43 Tables & ER Diagrams)](docs/database/DATABASE_DESIGN.md)
- [FastAPI REST API Specification](docs/api/API_SPECIFICATION.md)
- [AI, RAG & Multi-Agent Architecture](docs/architecture/AI_ARCHITECTURE.md)
- [Security, Privacy & DPDP Act 2023](docs/security/SECURITY_AND_PRIVACY.md)
- [Mermaid System Diagrams](docs/diagrams/ARCHITECTURE_DIAGRAMS.md)
- [Monorepo Project Structure](docs/architecture/PROJECT_STRUCTURE.md)
- [Technology Decisions & Trade-Offs](docs/architecture/TECH_STACK_AND_DECISIONS.md)
- [Six-Phase Development Roadmap](docs/DEVELOPMENT_ROADMAP.md)
- [Design System & UI Tokens](docs/uiux/DESIGN_SYSTEM.md)
- [45-Page Inventory](docs/uiux/PAGE_INVENTORY.md)
- [24-Screen Mobile Application Specs](docs/uiux/MOBILE_DESIGN.md)
