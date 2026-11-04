# GovAI Nexus – AI & Machine Learning Model Documentation
**Tamil Nadu Digital Governance Intelligent Subsystems**

---

## 1. AI & ML Model Portfolio

| Model Name | Framework / Engine | Purpose | Input Features | Evaluation Metric |
| :--- | :--- | :--- | :--- | :--- |
| **Citizen Assistant RAG** | Google Gemini + pgvector HNSW | Bilingual citizen Q&A with policy citations | Tamil/English citizen queries | RAGAS Faithfulness: 0.94, Precision: 0.92 |
| **Tamil OCR Extractor** | PaddleOCR + Tesseract TAM | Certificate text & key-value parsing | Scanned PDF/JPEG certificates | Character Error Rate (CER): < 2.1% |
| **Grievance NLP Classifier** | Hugging Face Transformers | Auto-categorize citizen complaints | Free-form grievance text | Macro F1-Score: 0.93 across 42 categories |
| **Application Delay Predictor** | XGBoost Classifier | Forecast bottleneck delays before SLA breach | Workload, staff ratio, history | ROC-AUC: 0.89, Precision: 0.86 |
| **Welfare Fraud Detection** | Isolation Forest + Logistic Reg. | Identify anomalous income/identity patterns | Income, land holding, records | Precision: 0.91 (High-Recall tuning) |
| **14-Agent Orchestrator** | Multi-Agent Coordination Bus | Autonomous policy checks & task handoffs | Application state events | Step Completion Rate: 99.4% |

---

## 2. Indic NLP & Bilingual Processing

The GovAI Nexus NLP pipeline is optimized for **Tamil Nadu administrative vernacular**:
- **Tokenizer**: Custom Indic subword tokenizer supporting both pure Tamil script (தமிழ்) and colloquial Tanglish/English queries.
- **Normalization**: Lemmatization and diacritical normalization to account for transliteration variants in names and village locations.
- **Tone & Persona**: Imbued with a respectful, administrative, and citizen-first tone ("வணக்கம்! நான் GovAI அரசு உதவியாளர்...").

---

## 3. Human-in-the-Loop Governance Guardrails

To prevent algorithmic bias, unexplainable rejections, or civil rights infringements:
1. **Zero Autonomous Rejections**: The AI engine is strictly barred from issuing a final rejection to any citizen service or welfare claim. It may only flag discrepancies for human officer review.
2. **Transparent Explanation**: Every anomaly score includes human-readable feature importances (SHAP values) explaining why the case was flagged.
3. **Audit Trail**: Every inference, confidence score, and suggestion is immutably recorded in the database with model version tokens.
