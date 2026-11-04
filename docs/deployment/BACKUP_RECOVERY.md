# GovAI Nexus – Backup & Disaster Recovery Runbook
**Database Snapshotting, WAL Archiving & Sovereign Data Restoration**

---

## 1. Backup Strategy Overview

| Tier | Frequency | Retention | Storage Destination | Encryption |
| :--- | :--- | :--- | :--- | :--- |
| **Write-Ahead Logs (WAL)** | Continuous (every 60s) | 14 days | TNSDC Dedicated Object Storage | AES-256 |
| **Full DB Snapshots** | Daily at 02:00 IST | 90 days | Geo-Replicated NDC Shastri Bhawan | AES-256 + GPG |
| **Upload Documents** | Continuous Sync | Permanent | Encrypted S3-compatible Ceph cluster | AES-256 |
| **Audit Logs** | Real-time block chaining | 7 years (Statutory) | WORM (Write Once Read Many) Storage | SHA-256 + HMAC |

---

## 2. Automated Backup Execution Script

Backups are executed via cron using the following production script `/usr/local/bin/govai_backup.sh`:

```bash
#!/usr/bin/env bash
set -eo pipefail

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/mnt/backups/tnsdc/postgresql"
mkdir -p "${BACKUP_DIR}"

echo "[${TIMESTAMP}] Initiating GovAI Nexus PostgreSQL backup..."

# Dump PostgreSQL database with pgvector embeddings
docker compose exec -T db pg_dump -U govai_admin -d govai_nexus_tn -Fc | \
  gpg --symmetric --batch --passphrase-file /etc/govai/backup.key > "${BACKUP_DIR}/govai_nexus_${TIMESTAMP}.dump.gpg"

# Check integrity and calculate SHA-256
sha256sum "${BACKUP_DIR}/govai_nexus_${TIMESTAMP}.dump.gpg" > "${BACKUP_DIR}/govai_nexus_${TIMESTAMP}.sha256"

echo "Backup completed successfully with checksum."
```

---

## 3. Disaster Recovery Restoration Procedure

In the event of total server loss or data corruption, execute the following restoration sequence:

1. **Stop active API pods**:
   ```bash
   docker compose stop api
   ```
2. **Decrypt and restore snapshot**:
   ```bash
   gpg --decrypt --passphrase-file /etc/govai/backup.key "${BACKUP_DIR}/govai_nexus_<LATEST>.dump.gpg" > /tmp/restore.dump
   docker compose exec -T db pg_restore -U govai_admin -d govai_nexus_tn --clean --if-exists /tmp/restore.dump
   rm -f /tmp/restore.dump
   ```
3. **Verify database consistency & pgvector indexing**:
   ```bash
   docker compose exec -T db psql -U govai_admin -d govai_nexus_tn -c "SELECT count(*) FROM applications; REINDEX TABLE knowledge_embeddings;"
   ```
4. **Restart API and resume traffic**:
   ```bash
   docker compose up -d api
   curl -f http://localhost:80/health
   ```
