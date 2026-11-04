# GovAI Nexus – Complete System & Workflow Diagrams (Mermaid)

## 1. High-Level System Architecture
```mermaid
graph TD
    subgraph Citizens_Public["Citizens & Public (Tamil & English)"]
        Web[React 19 Web Portals]
        Mobile[React Native / Expo Mobile App]
    end

    subgraph Gov_Staff["Government Administration"]
        Emp[Employee Portal]
        HOD[Officer / HOD Portal]
        Admin[Super Admin Portal]
        Analytics[AI & Analytics Centre]
    end

    subgraph Gateway["API Gateway / FastAPI"]
        CORS[CORS / Rate Limiting]
        Auth[JWT / RBAC Guard]
        Router[API v1 Routers]
    end

    subgraph Core_Backend["Python Backend Modules"]
        IAM[IAM & Identity]
        Srv[Services & Schemes]
        AppMgr[Application Engine]
        DocMgr[Document Pipeline]
        Grievance[Grievance Redressal]
    end

    subgraph AI_ML["Python AI / ML Engines"]
        RAG[RAG Retrieval Engine]
        OCR[PaddleOCR Engine]
        ML[Demand & Delay ML]
        Agents[Multi-Agent Orchestrator]
    end

    subgraph Data["Persistence Layer"]
        PG[(PostgreSQL 16)]
        PGV[(pgvector Embeddings)]
        RD[(Redis Cache & Broker)]
        S3[(Encrypted Object Storage)]
    end

    Web --> Gateway
    Mobile --> Gateway
    Emp --> Gateway
    HOD --> Gateway
    Admin --> Gateway
    Analytics --> Gateway

    Gateway --> Core_Backend
    Core_Backend <--> AI_ML
    Core_Backend <--> Data
    AI_ML <--> Data
```

## 2. Authentication & Authorization Flow
```mermaid
sequenceDiagram
    autonumber
    actor User as Citizen / Officer
    participant Web as React Web App
    participant API as FastAPI Backend
    participant DB as PostgreSQL
    participant Redis as Redis Cache

    User->>Web: Enter credentials & OTP
    Web->>API: POST /api/v1/auth/login
    API->>DB: Query User & Role Permissions
    DB-->>API: User Record & Hash
    API->>API: Verify Password / OTP & DPDP Consent
    API->>Redis: Register active session
    API-->>Web: Return JWT Access & Refresh Tokens
    Web->>Web: Store Token & Hydrate Auth Context
    Web->>API: GET /api/v1/auth/me (with Bearer Token)
    API-->>Web: User Roles, Permissions & Locale
```

## 3. Citizen Application Processing Flow
```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant App as Citizen Portal
    participant API as FastAPI Backend
    participant Celery as Background Worker
    participant Staff as Government Officer

    Citizen->>App: Discover Service & Complete Form
    Citizen->>App: Upload Proof Documents
    Citizen->>App: Submit Application
    App->>API: POST /api/v1/applications
    API->>API: Validate Form & Mandatory Attachments
    API->>Celery: Queue Document OCR & Duplicate Check
    Celery->>Celery: Execute PaddleOCR Extraction
    Celery-->>API: Store Extracted Fields with Confidence
    API-->>App: Return Application Reference (e.g. TN-APP-2026-7890)
    Staff->>API: Review Application in Employee Workspace
    Staff->>API: Approve Application with Digital Signature
    API-->>Citizen: Push Notification & Download Certificate
```

## 4. Intelligent Document Processing (OCR) Flow
```mermaid
flowchart TD
    A[Citizen Uploads Document PDF/Image] --> B[File Validation: MIME, Size, Malware Scan]
    B --> C[Store Encrypted File in Object Storage]
    C --> D[Queue Async OCR Job in Celery]
    D --> E[PaddleOCR / Tesseract Text & Layout Extraction]
    E --> F[Extract Certificate Fields: Name, DOB, No.]
    F --> G[Calculate Field-Level Confidence Score]
    G --> H{All Fields > 80%?}
    H -- Yes --> I[Flag: Ready for Fast-Track Review]
    H -- No --> J[Flag: Highlight for Employee Manual Inspection]
    I --> K[Display in Employee Split-Screen Workspace]
    J --> K
```

## 5. RAG Question-Answering Flow
```mermaid
flowchart LR
    Q[Citizen Query: 'Income Certificate eligibility?'] --> Trans[Language & Intent Routing]
    Trans --> Embed[Generate Embedding: BGE-M3]
    Embed --> Retrieve[pgvector Cosine Search]
    Retrieve --> TopK[Top 5 Policy Chunks]
    TopK --> Rerank[Cross-Encoder Reranker]
    Rerank --> LLM[LLM Response Generation]
    LLM --> Cite[Validate Official G.O. References]
    Cite --> Output[Bilingual Answer with Verified Citations]
```

## 6. Multi-Agent Orchestration Flow
```mermaid
graph TD
    UserQuery[User Request] --> Orchestrator[Orchestrator Agent]
    Orchestrator --> IntentCheck{Request Type}
    IntentCheck -->|Service Query| CitAgent[Citizen Service Agent]
    IntentCheck -->|Knowledge Query| RAGAgent[Knowledge Retrieval Agent]
    IntentCheck -->|File Upload| DocAgent[Document Intelligence Agent]
    IntentCheck -->|Grievance| GrievAgent[Complaint Management Agent]
    IntentCheck -->|Risk Anomaly| FraudAgent[Fraud Intelligence Agent]

    CitAgent --> ResponseAggregator[Response Aggregator & Safety Check]
    RAGAgent --> ResponseAggregator
    DocAgent --> ResponseAggregator
    GrievAgent --> ResponseAggregator
    FraudAgent --> ResponseAggregator
    ResponseAggregator --> Deliver[Delivered to Citizen / Officer]
```
