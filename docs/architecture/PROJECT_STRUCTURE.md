# GovAI Nexus – Project Monorepo Structure

```
govai-nexus/
├── apps/
│   ├── web/                     # React 19 + TypeScript + Tailwind CSS Frontend
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI & design system atoms/molecules
│   │   │   ├── features/        # Feature portals: public, citizen, employee, officer, admin, analytics
│   │   │   ├── layouts/         # Master layouts for all 6 portals
│   │   │   ├── routes/          # Typed client routing
│   │   │   └── types/           # Shared TypeScript interfaces
│   │   └── package.json
│   │
│   ├── mobile/                  # React Native + Expo Mobile Application (Android/iOS)
│   │   ├── app/                 # Expo Router file-based screens (24 mobile screens)
│   │   ├── components/          # Touch-optimized mobile components
│   │   └── app.json
│
├── backend/                     # Python 3.12+ Primary Backend Core
│   ├── app/
│   │   ├── api/v1/              # REST API endpoint routers
│   │   ├── core/                # Settings, Security, JWT, RBAC guards
│   │   ├── database/            # SQLAlchemy 2.0 async models and session
│   │   ├── modules/             # Domain logic (auth, services, applications, complaints)
│   │   ├── schemas/             # Pydantic v2 validation contracts
│   │   └── main.py              # FastAPI application bootstrap
│   │
│   ├── ai_engine/               # Artificial Intelligence & GenAI Subsystem
│   │   ├── rag_service.py       # RAG pipeline with pgvector semantic search
│   │   ├── ocr_service.py       # PaddleOCR / Tesseract layout and text parsing
│   │   ├── agents/              # Multi-agent orchestrator & specialists
│   │   └── translation/         # Bilingual Tamil / English translation
│   │
│   ├── ml_engine/               # Machine Learning & Analytics Subsystem
│   │   ├── predictor.py         # Demand forecasting & delay prediction
│   │   └── anomaly_detection/   # Fraud risk scoring & duplicate detection
│   │
│   └── workers/                 # Celery asynchronous task consumers
│
├── packages/
│   ├── shared-types/            # TypeScript schemas mirrored from Pydantic
│   └── design-tokens/           # Tamil Nadu government design tokens & colors
│
├── docs/                        # Complete Technical Documentation
│   ├── PROJECT_REQUIREMENTS.md
│   ├── DEVELOPMENT_ROADMAP.md
│   ├── architecture/            # System, AI, Integration, & Structure specs
│   ├── database/                # Database schemas & ER diagrams
│   ├── api/                     # OpenAPI specifications
│   ├── security/                # DPDP Act 2023 & Security controls
│   ├── diagrams/                # Mermaid architecture & sequence diagrams
│   └── uiux/                    # Design system, 45-page inventory, mobile specs
│
├── infrastructure/              # Cloud Run, Docker, Kubernetes & CI/CD configs
├── README.md                    # Master Project Overview & Setup Guide
└── docker-compose.yml           # Local dev orchestrator for FastAPI, Postgres, Redis
```
