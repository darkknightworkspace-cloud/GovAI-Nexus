# GovAI Nexus – Database Schema & Data Dictionary
**PostgreSQL 16 with pgvector Extension | Government of Tamil Nadu**

---

## 1. Schema Overview

GovAI Nexus uses PostgreSQL 16 as its relational source of truth, augmented with the `pgvector` extension for storing 768-dimensional embeddings of government schemes, regulations, and citizen documents.

```
                  ┌──────────────────────┐
                  │        users         │
                  └──────────┬───────────┘
                             │ 1:N
           ┌─────────────────┼──────────────────┐
           ▼                                    ▼
┌──────────────────────┐             ┌──────────────────────┐
│     applications     │             │      grievances      │
└──────────┬───────────┘             └──────────┬───────────┘
           │ 1:N                                │ 1:N
           ▼                                    ▼
┌──────────────────────┐             ┌──────────────────────┐
│      documents       │             │   grievance_events   │
└──────────────────────┘             └──────────────────────┘
```

---

## 2. Core Table Definitions

### 2.1 `users`
Stores citizen profiles, government employees, department officers, and system administrators.
- `id` (UUID, Primary Key)
- `email` (VARCHAR(255), Unique, Indexed)
- `phone_hash` (VARCHAR(64), HMAC-SHA256 hashed for DPDP Act 2023 compliance)
- `phone_masked` (VARCHAR(15), Display only e.g. "+91 98*** **412")
- `full_name` (VARCHAR(255))
- `role` (ENUM: `CITIZEN`, `EMPLOYEE`, `OFFICER`, `SUPER_ADMIN`)
- `district` (VARCHAR(100), e.g. "Chennai", "Madurai", "Coimbatore")
- `preferred_language` (VARCHAR(10), Default "en", "ta" for Tamil)
- `aadhaar_vault_ref` (UUID, Nullable tokenized reference; raw UID is never stored)
- `created_at` (TIMESTAMPTZ, Default NOW())
- `updated_at` (TIMESTAMPTZ)

### 2.2 `applications`
Government service applications submitted by citizens.
- `id` (UUID, Primary Key)
- `application_no` (VARCHAR(64), Unique, e.g. "TN-REV-2026-89412")
- `user_id` (UUID, Foreign Key -> `users.id`)
- `service_code` (VARCHAR(64), e.g. "TN-COMM-01", "TN-INC-02")
- `department_id` (VARCHAR(64), e.g. "REV", "AGRI", "SW")
- `status` (ENUM: `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `VERIFIED`, `APPROVED`, `REJECTED`)
- `sla_deadline` (TIMESTAMPTZ)
- `fraud_risk_score` (FLOAT, 0.0 to 1.0 calculated by XGBoost Fraud Engine)
- `fraud_risk_flag` (BOOLEAN, Default FALSE)
- `form_data` (JSONB, Dynamic citizen form payload)
- `created_at` (TIMESTAMPTZ)

### 2.3 `knowledge_embeddings` (pgvector)
Semantic vector store for RAG citations and government policy retrieval.
- `id` (UUID, Primary Key)
- `document_title` (VARCHAR(255))
- `section_header` (VARCHAR(255))
- `content_text` (TEXT)
- `language` (VARCHAR(10), "en" or "ta")
- `embedding` (VECTOR(768), indexed with HNSW `m=16, ef_construction=64`)
- `source_url` (VARCHAR(512))
- `last_verified_at` (TIMESTAMPTZ)

### 2.4 `audit_logs`
Immutable forensic audit trail for all write, review, and approval operations.
- `id` (UUID, Primary Key)
- `actor_id` (UUID)
- `actor_role` (VARCHAR(50))
- `action` (VARCHAR(100), e.g. "APPLICATION_APPROVE", "PII_DECRYPT")
- `resource_type` (VARCHAR(100))
- `resource_id` (VARCHAR(100))
- `ip_address` (VARCHAR(45))
- `sha256_checksum` (VARCHAR(64), Block-chained hash for non-repudiation)
- `created_at` (TIMESTAMPTZ, Default NOW())

---

## 3. Indexing & Optimization Strategy

1. **B-Tree Indices**:
   - `CREATE INDEX idx_apps_user ON applications(user_id);`
   - `CREATE INDEX idx_apps_dept_status ON applications(department_id, status);`
   - `CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);`

2. **pgvector HNSW Index**:
   - `CREATE INDEX idx_knowledge_vec ON knowledge_embeddings USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);`
