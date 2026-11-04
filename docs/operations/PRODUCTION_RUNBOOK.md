# GovAI Nexus – Production Operations Runbook
**State Data Centre (TNSDC) Incident Response & Routine Maintenance Standard**

---

## 1. Routine Operational Commands

### 1.1 Service Status & Health Inspection
```bash
# Check container statuses
docker compose ps

# Inspect API health endpoint
curl -s http://localhost:80/health | jq .

# Inspect database connection pool
docker compose exec db psql -U govai_admin -d govai_nexus_tn -c "SELECT count(*), state FROM pg_stat_activity GROUP BY state;"
```

### 1.2 Log Inspection & Streaming
```bash
# Stream API logs with timestamps
docker compose logs -f --tail=100 api

# Stream Nginx ingress access and error logs
docker compose logs -f --tail=100 proxy
```

### 1.3 Cache Management
```bash
# Check Redis memory usage and hit rate
docker compose exec redis redis-cli -a GovAIRedisSecret2026! info memory

# Flush cached analytics (safe operation)
docker compose exec redis redis-cli -a GovAIRedisSecret2026! del "analytics:statewide:summary"
```

---

## 2. Emergency Incident Response Procedures

### Incident 1: API Latency Spike (> 2000ms)
1. Check CPU and memory utilization across containers: `docker stats`.
2. Check for long-running database queries:
   ```sql
   SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
   FROM pg_stat_activity 
   WHERE state = 'active' AND now() - pg_stat_activity.query_start > interval '5 seconds';
   ```
3. If necessary, terminate offending query: `SELECT pg_cancel_backend(<pid>);`.
4. Scale API worker containers if load persists: `docker compose up -d --scale api=4`.

### Incident 2: Database Connection Saturation
1. Check max connection pool parameter in FastAPI SQLAlchemy pool (`pool_size=20, max_overflow=10`).
2. Restart API workers gracefully to release stale socket connections:
   ```bash
   docker compose restart api
   ```

### Incident 3: AI Inference Service Unavailable
1. Verify Gemini API quota and outbound HTTPS egress through state proxy.
2. If cloud connectivity is degraded, the AI Engine automatically degrades to cached local retrieval and offline rule evaluation without crashing citizen application workflows.
