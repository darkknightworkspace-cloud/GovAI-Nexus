# GovAI Nexus – Technology Decisions & Architecture Rationale

## 1. Primary Language Selection: Python 3.12+ for Backend & AI
- **Rationale:** The prompt establishes Python as the primary language across GovAI Nexus. Python delivers native, best-in-class ecosystems for AI, GenAI (LangChain, LlamaIndex, Google Gemini SDK), Machine Learning (Scikit-learn, XGBoost, PyTorch), NLP (Indic NLP, Stanza), and OCR (PaddleOCR).
- **FastAPI Framework:** Chosen for its asynchronous speed (Starlette/uvloop), automatic OpenAPI/Swagger documentation, native Pydantic V2 data validation, and seamless concurrency for IO-bound public government requests.
- **Alternatives Considered:** Node.js/NestJS (limited native ML/OCR libraries, requires inter-process communication or microservices to run Python ML models), Go (fast, but lacks rich AI/LLM ecosystem).

## 2. Frontend Selection: React 19 + TypeScript & Tailwind CSS
- **Rationale:** React 19 provides superior server component primitives, concurrent rendering, and immense component ecosystem. TypeScript guarantees end-to-end type safety against Pydantic models. Tailwind CSS enables responsive design system implementation without runtime CSS overhead.
- **Design Tokens:** Strict adherence to the official Government of Tamil Nadu color palette (Deep Navy `#102A43`, Primary Blue `#2563EB`, Violet/Purple `#6D28D9`, Teal `#0F766E`).

## 3. Mobile Selection: React Native + Expo (Android & iOS)
- **Rationale:** Expo enables single codebase targeting both major mobile platforms across Tamil Nadu with fast OTA updates, unified TypeScript types shared with the web frontend, and native camera/document scanner access.

## 4. Database Selection: PostgreSQL 16 + pgvector
- **Rationale:** PostgreSQL provides ACID transactional guarantees for legal citizen records, while the `pgvector` extension eliminates the operational overhead of a separate vector database (e.g., Pinecone/Milvus). All structured records and unstructured document embeddings reside within the same transactional boundary.

## 5. Caching & Task Queues: Redis 7 + Celery
- **Rationale:** High-throughput caching for frequently accessed government scheme guidelines and token blacklists, coupled with Celery for long-running OCR and ML batch jobs.
