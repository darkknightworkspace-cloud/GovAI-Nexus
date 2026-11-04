# GovAI Nexus – Privacy Guidelines & DPDP Act 2023 Compliance
**Government of Tamil Nadu | Citizen Privacy Architecture**

---

## 1. Compliance with the Digital Personal Data Protection (DPDP) Act, 2023

GovAI Nexus adheres strictly to India's **Digital Personal Data Protection Act, 2023** and Tamil Nadu Data Governance Policies:

1. **Lawful Purpose & Explicit Consent**:
   - Every service request explicitly presents bilingual consent notices (Tamil & English) detailing the specific data required and purpose.
   - Citizens can view, download, or withdraw consent at any time via the Citizen Profile portal.

2. **Data Minimization**:
   - Only fields strictly required to determine service eligibility or verify identity are collected.
   - Raw Aadhaar numbers are **never stored** in the database. Instead, tokenized references (`aadhaar_vault_ref`) are used in compliance with UIDAI regulations.

3. **Storage Limitation & Data Purging**:
   - Temporary OCR uploads and cached drafts are purged after 30 days of inactivity.
   - Approved certificate verification hashes are preserved permanently for validation while source documentation is archived according to state retention schedules.

---

## 2. PII Masking and Redaction Rules

- **Aadhaar Masking**: Only the last 4 digits are rendered in interfaces (e.g., `XXXX-XXXX-4812`).
- **Phone Number Protection**: Phone numbers are stored as HMAC-SHA256 hashes for lookups; UI displays only masked formats (`+91 98*** **412`).
- **Public Transparency Redaction**:
   - All data exposed via the Public Transparency Portal or open data exports strips all personal identifiers.
   - Vendor, beneficiary, and expenditure data is aggregated to prevent deanonymization.

---

## 3. Data Residency & Sovereignty

- **Location**: 100% of citizen personal data, application files, and AI embedding vectors reside inside sovereign Indian territory at the Tamil Nadu State Data Centre (TNSDC, Chennai).
- **Cross-Border Transfers**: Strictly prohibited. No personal identifiers or citizen documents are transmitted to external third-party servers or non-sovereign clouds.
