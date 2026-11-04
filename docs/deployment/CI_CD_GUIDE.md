# GovAI Nexus – Continuous Integration & Continuous Deployment (CI/CD) Guide
**GitHub Actions Pipeline & Enterprise Release Management**

---

## 1. CI/CD Architecture Overview

GovAI Nexus enforces a trunk-based release workflow where automated GitHub Actions runners validate code quality, security posture, and container build integrity before any code can be promoted to staging or production.

```
 [ Feature Branch ] ─── Pull Request ───► [ GitHub Actions CI ]
                                                    │
                                  ┌─────────────────┼─────────────────┐
                                  ▼                 ▼                 ▼
                           [ Pytest & AST ]   [ TypeScript ]   [ Bandit Security ]
                                  │                 │                 │
                                  └─────────────────┼─────────────────┘
                                                    ▼
                                           [ Docker Buildx ]
                                                    │
                                           Merged to main
                                                    │
                                                    ▼
                                          [ Staging Deploy ]
                                                    │
                                          Manual State Officer Sign-off
                                                    │
                                                    ▼
                                        [ Production Deploy ]
```

---

## 2. GitHub Actions Workflow Configuration

Located at `/.github/workflows/ci.yml`:
1. **Python Quality**: Sets up Python 3.12, installs dependencies, checks PEP8 syntax with flake8, executes bandit security scan, and executes all Pytest suites (`test_api.py`, `test_phase4_ai.py`, `test_phase5_governance.py`, `test_phase6_production.py`).
2. **Frontend Quality**: Sets up Node.js 22, installs dependencies with `--legacy-peer-deps`, executes `tsc --noEmit`, and builds production bundle with Vite.
3. **Container Build**: Uses Docker Buildx to build and validate multi-stage production images for both Python FastAPI (`Dockerfile.backend`) and React 19 Frontend (`Dockerfile.frontend`).

---

## 3. Deployment Environments & Promotion Rules

- **Development**: Local development environment (Vite running on port 4000, FastAPI backend on port 8080, hot reload, test mock connectors).
- **Staging**: Hosted at `https://staging.govai.tn.gov.in` connected to TNSDC staging PostgreSQL instance.
- **Production**: Hosted at `https://govai.tn.gov.in` behind Cloudflare WAF and high-availability hardware load balancers. Requires 2-officer authorization for production deployment.
