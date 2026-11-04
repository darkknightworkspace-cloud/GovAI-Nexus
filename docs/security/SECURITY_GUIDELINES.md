# GovAI Nexus – Security Guidelines & Threat Model
**State Data Centre (TNSDC) & MeitY GovTech Security Standard**

---

## 1. Threat Modeling & Mitigation Matrix (OWASP Top 10)

| Vulnerability | Attack Vector | GovAI Nexus Mitigation Controls |
| :--- | :--- | :--- |
| **A01: Broken Access Control** | Privilege escalation across portals | JWT claims strictly validated in Python dependencies (`require_role(["OFFICER", "SUPER_ADMIN"])`). Citizen IDs scoped to `current_user.id`. |
| **A02: Cryptographic Failures** | Data exposure in transit/rest | AES-256 for data at rest; TLS 1.3 in transit. Passwords hashed using Bcrypt with salt rounds = 12. Aadhaar vault tokens. |
| **A03: Injection (SQL / Prompt)** | SQL injection or LLM system prompt override | SQLAlchemy 2.0 parameterized ORM queries; strict input regex validation; AI guardrail interceptor strips system prompt overrides. |
| **A04: Insecure Design** | Unchecked AI automated decision making | **Human-in-the-Loop Principle**: AI models flag anomalies, calculate risk scores, and recommend routing, but CANNOT autonomously reject or approve citizen applications. |
| **A05: Security Misconfiguration** | Exposed admin ports, default passwords | Nginx proxy isolates internal ports 5432 and 6379; default passwords forbidden in production; `server_tokens off;`. |
| **A06: Vulnerable Components** | Outdated pip or npm dependencies | Continuous automated dependency vulnerability scanning via Bandit and GitHub Dependabot in CI/CD. |
| **A07: Identification & Auth Failures** | Brute force login attempts | Redis-backed rate limiting (5 attempts/min per IP); session timeout (15 min inactivity); secure HTTP-only cookies. |
| **A08: Software & Data Integrity** | Corrupted audit trails or uploads | HMAC-SHA256 chained checksums on audit entries; MIME type and magic number binary header verification on uploaded PDFs. |
| **A09: Logging & Monitoring Failures** | Undetected unauthorized access | Centralized immutable audit logs with actor ID, timestamp, IP, and action; Prometheus metrics and Grafana alerts. |
| **A10: Server-Side Request Forgery** | External connector abuse | Integrations with TNeGA and SBI ePay restricted to allowlisted CIDR IPs and dedicated state gateway proxies. |

---

## 2. API Security Best Practices

1. **Defense in Depth**:
   - TLS 1.3 enforced at Nginx edge.
   - FastAPI middleware validates headers (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`).
   - CORS restricted to registered state domains (`*.tn.gov.in`).

2. **File Upload Hardening**:
   - File size capped at 15 MB.
   - Allowed extensions restricted strictly to `.pdf`, `.jpg`, `.jpeg`, `.png`.
   - File bytes inspected with `libmagic` to prevent extension spoofing.
   - Uploads stored in non-executable mount `/app/uploads` owned by non-root service account.
