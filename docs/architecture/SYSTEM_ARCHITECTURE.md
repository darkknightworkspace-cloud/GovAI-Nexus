# GovAI Nexus – Software Architecture Document

## 1. Architectural Strategy & Design Paradigm
GovAI Nexus adopts an **API-First, Asynchronous Modular Monolith** architecture backed by Python 3.12+ and FastAPI. 
Rather than introducing distributed microservices prematurely, all domain boundaries are encapsulated in cohesive Python modules sharing a unified transactional PostgreSQL database (with pgvector), while compute-intensive tasks (OCR, ML training, embedding generation) run as decoupled background workers.

```
       +-------------------------------------------------------------+
       |                     PRESENTATION LAYER                      |
       |  +--------------------------+ +--------------------------+  |
       |  |  React 19 + TypeScript   | |   React Native + Expo    |  |
       |  |  (Web Portals & Admin)   | |      (Mobile Apps)       |  |
       |  +--------------------------+ +--------------------------+  |
       +------------------------------+------------------------------+
                                      | HTTPS / WSS (REST / OpenAPI)
       +------------------------------v------------------------------+
       |                   API GATEWAY / FASTAPI                     |
       |  Rate Limiting · JWT / MFA Auth · Request Validation · CORS  |
       +------------------------------+------------------------------+
                                      |
       +------------------------------v------------------------------+
       |                     APPLICATION LAYER                       |
       |  IAM · Services · Schemes · Applications · Complaints · IDP  |
       +--------------+-------------------------------+--------------+
                      |                               |
       +--------------v---------------+ +-------------v--------------+
       |      AI INTELLIGENCE         | |       DATA LAYER           |
       |  · RAG Hybrid Search         | |  · PostgreSQL (Relational) |
       |  · Multilingual Tamil NLP    | |  · pgvector (Embeddings)   |
       |  · PaddleOCR / Tesseract     | |  · Redis (Cache & Broker)  |
       |  · ML Demand Forecasting     | |  · S3 / Cloud Storage      |
       +------------------------------+ +----------------------------+
```

## 2. Six Architecture Layers

### Layer 1: Presentation Layer
- **Web Applications:** React 19, TypeScript, Vite, Tailwind CSS, Lucide icons, Motion animations.
- **Mobile Applications:** React Native, Expo SDK, Expo Router, shared validation types and API contracts.
- **Portals:** Public Website, Citizen Portal, Employee Portal, Officer/HOD Portal, Super Admin Portal, AI & Analytics Centre.

### Layer 2: API Gateway Layer (FastAPI)
- Base URL: `/api/v1/`
- Standardized OpenAPI 3.1 contracts with automatic Pydantic validation.
- Centralized error response format: `{"error_code": "RESOURCE_NOT_FOUND", "message": "...", "timestamp": "..."}`.
- Global request tracing with correlation IDs.

### Layer 3: Core Application Layer
- Clean separation into domain modules: `auth`, `users`, `departments`, `services`, `applications`, `documents`, `complaints`, `fraud`, `analytics`.
- Service-repository pattern using SQLAlchemy 2.0 AsyncSession.

### Layer 4: AI & Machine Learning Layer
- Python-native intelligence: Scikit-learn, XGBoost, PyTorch, Sentence Transformers, and Google Gemini SDK.
- RAG Engine: Bi-encoder embeddings with pgvector cosine distance + BM25 keyword search.
- IDP Pipeline: Asynchronous document ingestion, table extraction, and confidence scoring.

### Layer 5: Data & Persistence Layer
- **PostgreSQL 16+**: System of record for 43+ normalized entities.
- **pgvector Extension**: High-performance approximate nearest neighbor (HNSW) index for Tamil/English embeddings.
- **Redis 7+**: Token blacklists, session caching, and rate limiting counters.
- **Object Storage**: S3-compatible encrypted bucket storage with presigned URLs.

### Layer 6: Infrastructure & Observability Layer
- Dockerized container images for FastAPI, Celery workers, and React frontends.
- Prometheus metrics, OpenTelemetry tracing, and structured JSON logging.
