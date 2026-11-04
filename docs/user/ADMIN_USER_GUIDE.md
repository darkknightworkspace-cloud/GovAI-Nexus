# GovAI Nexus – Administrator & District Officer Guide
**Super Admin Portal & District Leadership Operations Manual**

---

## 1. Super Admin Portal Overview

The Super Admin Portal empowers State IT Secretaries, TNeGA leadership, and District Collectors to oversee system operations, manage user roles, configure AI guardrails, and audit forensic logs.

---

## 2. Core Administrative Operations

### 2.1 User & Role-Based Access Control (RBAC)
- Manage personnel across the 4 primary hierarchy levels: Citizen, Employee, Officer, and Super Admin.
- Assign jurisdiction filters (District-level, Taluk-level, Department-level).
- Revoke compromised accounts or force password resets.

### 2.2 Department & Service Management
- Configure service SLA rules (e.g. Community Certificate = 15 days; Income Certificate = 7 days).
- Set fee structures and document requirement checklists.
- Activate or suspend government service workflows during gazetted holidays.

### 2.3 AI Model & Knowledge Base Management
- Ingest new Tamil Nadu Government Gazettes (G.O.s) into the RAG vector store.
- Trigger vector re-indexing for pgvector embeddings.
- Inspect RAG precision/recall telemetry and adjust confidence threshold gates (default: 0.72).
- Monitor Multi-Agent orchestrator execution logs and task retry limits.

### 2.4 Security Auditing & DPDP Act 2023 Oversight
- Query immutable cryptographic audit trails filtered by actor ID, resource, and timestamp.
- Audit data consent revocations and verified data purging records.
- Monitor active sessions, rate-limit threshold trips, and blocked IP addresses.
