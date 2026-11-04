# GovAI Nexus – Security, Privacy & Compliance Architecture

## 1. Compliance with Digital Personal Data Protection (DPDP) Act, 2023
GovAI Nexus is engineered in strict compliance with the Indian DPDP Act 2023:
- **Notice & Consent:** Citizens receive clear, bilingual notices regarding the specific purpose of data collection. Consent is stored as immutable records in `consent_records`.
- **Purpose Limitation & Data Minimization:** Only data strictly required for the specific welfare scheme or certificate is collected.
- **Right to Access & Correction:** Citizens can inspect their stored profile data and request rectifications through the Citizen Portal.
- **Right to Erasure / Data Retention:** Automatic purging of temporary OCR upload caches after employee verification.

## 2. Authentication & Authorization (Zero Trust)
- **Password Security:** Salted hashes using Argon2id / bcrypt with minimum work factors.
- **Token Security:** Short-lived JWT access tokens (15-60 min) with refresh tokens rotated and blacklisted in Redis upon logout.
- **MFA:** OTP-based two-factor authentication for government employees, officers, and administrators.
- **Role-Based Access Control (RBAC):** Strict hierarchy of Roles (`CITIZEN`, `EMPLOYEE`, `OFFICER`, `SUPER_ADMIN`) and granular Permissions (`service:apply`, `document:verify`, `application:approve`, `audit:read`).

## 3. Data Protection & Cryptography
- **In-Transit:** Mandatory HTTPS / TLS 1.3 with HSTS (`Strict-Transport-Security`).
- **At-Rest:** AES-256 transparent database and disk volume encryption.
- **Sensitive Identifiers:** Personal identifiers and sensitive documents stored in secure object storage with short-lived presigned URLs. No raw biometric storage.

## 4. AI Security & Guardrails
- **Prompt Injection Defense:** Strict input sanitization and delimiter framing separating system instructions from citizen queries.
- **Grounding Verification:** LLM generation is constrained to context chunks; citations are validated before rendering to citizens.
- **Tamper-Evident Audit Logging:** Every administrative action, document status change, and AI query is logged to `audit_logs` with actor ID, IP address, and timestamp.
