# GovAI Nexus – Production Deployment Guide
**Standard Operating Procedure for Deploying to TNSDC & Kubernetes / Docker Environments**

---

## 1. Prerequisites & Environment Requirements

- **Operating System**: Ubuntu 22.04 LTS or Red Hat Enterprise Linux 9
- **Container Engine**: Docker Engine 24.0+ and Docker Compose v2.20+
- **Hardware Sizing**:
  - Minimum: 8 vCPUs, 32 GB RAM, 250 GB NVMe Storage
  - Recommended (Statewide Production): 32 vCPUs, 128 GB RAM, 2 TB NVMe Storage in RAID 10
- **Network**: Dual 10 Gbps bonded network interfaces with public static IP mapped to domain `govai.tn.gov.in`.

---

## 2. Step-by-Step Production Deployment

### Step 1: Clone Repository & Configure Environment
```bash
git clone https://github.com/tnega/govai-nexus.git /opt/govai-nexus
cd /opt/govai-nexus
cp .env.example .env
chmod 600 .env
```
Ensure production secrets are updated in `.env`:
- `JWT_SECRET_KEY`: Minimum 64-character random string.
- `POSTGRES_PASSWORD`: Strong alphanumeric password.
- `REDIS_PASSWORD`: Secure in-memory cluster password.
- `GEMINI_API_KEY`: Enterprise Google GenAI API key.

### Step 2: Initialize Database & Vector Extensions
```bash
docker compose up -d db
docker compose exec db psql -U govai_admin -d govai_nexus_tn -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Step 3: Run Database Migrations
```bash
docker compose run --rm api alembic upgrade head
```

### Step 4: Build & Launch Full-Stack Services
```bash
docker compose up -d --build
```

### Step 5: Verify Deployment Health
```bash
curl -f http://localhost:80/health
docker compose ps
```
All 5 containers (`govai_nexus_proxy`, `govai_nexus_frontend`, `govai_nexus_api`, `govai_nexus_db`, `govai_nexus_redis`) must display status `healthy` or `running`.

---

## 3. SSL / TLS Certificate Installation

Place TNeGA issued TLS certificates in `/etc/ssl/certs/govai.tn.gov.in.crt` and private key in `/etc/ssl/private/govai.tn.gov.in.key`, then uncomment port 443 directives in `nginx/nginx.conf` and reload:
```bash
docker compose exec proxy nginx -s reload
```
