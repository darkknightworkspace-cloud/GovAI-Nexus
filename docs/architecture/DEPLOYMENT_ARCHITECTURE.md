# GovAI Nexus – Deployment Architecture & Topology
**Government of Tamil Nadu | State Data Centre (TNSDC) & Hybrid Cloud Specification**

---

## 1. High-Level Architectural Topology

GovAI Nexus is engineered using a resilient multi-tier containerized architecture hosted at the Tamil Nadu State Data Centre (TNSDC, Perungudi, Chennai) with automated disaster recovery sync to the National Data Centre (NDC, Shastri Bhawan, Chennai).

```
                      [ Citizens, Officers & Mobile Users ]
                                        │
                                [ Cloudflare WAF ]
                                        │
                         [ Nginx Edge Reverse Proxy ]
                          (Port 443 SSL Termination)
                                  │          │
         ┌────────────────────────┘          └────────────────────────┐
         ▼                                                            ▼
 [ React 19 Frontend SPA ]                                  [ Python FastAPI Backend ]
 (Nginx Alpine Web Pods)                                    (Uvicorn 4-Worker Pods)
                                                                      │
                         ┌────────────────────────────────────────────┼───────────────────────────┐
                         ▼                                            ▼                           ▼
            [ PostgreSQL 16 + pgvector ]                      [ Redis 7 Cluster ]         [ Celery Workers ]
            (Primary-Replica Master)                          (Cache & Message Bus)       (OCR, ML, Agent Jobs)
```

---

## 2. Infrastructure Specifications

| Component | Technology | Target Infrastructure | Scaling Strategy |
| :--- | :--- | :--- | :--- |
| **Ingress & Proxy** | Nginx 1.27 Alpine | Dual Active-Standby VM Nodes | Layer 4/7 Keepalived VIP |
| **Frontend Cluster** | React 19 + TypeScript + Vite | 4x Docker Containers (Node/Nginx) | Horizontal Pod Autoscaling (HPA) 2-8 pods |
| **API Backend** | Python 3.12 + FastAPI + Uvicorn | 6x Docker Containers (4 workers each) | CPU-based HPA (>70% utilization) |
| **Database** | PostgreSQL 16 + pgvector | High Availability Master + 2 Hot Standbys | Patroni + pg_auto_failover |
| **In-Memory Cache** | Redis 7 Alpine | Redis Sentinel 3-Node Cluster | Master-Replica with auto-failover |
| **Async Task Workers** | Python 3.12 + Celery | 8x Celery Workers with GPU nodes | Queue length auto-scaling |

---

## 3. Network Isolation & Security Zones

1. **DMZ (Public Zone)**:
   - External IPs terminate at Nginx Reverse Proxy with TLS 1.3 only.
   - Strict rate limiting (30 req/sec per IP, 5 req/sec on `/auth`).
   - WAF inspection for SQLi, XSS, and CSRF patterns.

2. **Application Zone (Private VLAN)**:
   - FastAPI and Node instances communicate exclusively across private Docker bridge networks (`govai_internal_net`).
   - Non-root user execution (`govai_service` UID 10000).

3. **Data Zone (Restricted Isolation)**:
   - PostgreSQL and Redis listen only on private subnet interfaces.
   - Database credentials managed via environment secrets; TLS required for all database connections.

---

## 4. Disaster Recovery & High Availability

- **Recovery Time Objective (RTO)**: < 15 minutes
- **Recovery Point Objective (RPO)**: < 5 minutes (WAL replication)
- **Daily Automated Snapshots**: 02:00 IST to encrypted geo-redundant storage with SHA-256 integrity validation.
