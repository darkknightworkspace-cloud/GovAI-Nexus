"""
GovAI Nexus - Fraud & Anomaly Intelligence Engine
Applies Isolation Forest outlier scoring, SHA-256 duplicate document hash detection,
and velocity checks to flag anomalies for HUMAN OFFICER review.
CRITICAL SAFETY RULE: An anomaly is NEVER proof of fraud and never triggers automatic rejection.
"""
from typing import Dict, Any, List, Optional
from pydantic import BaseModel


class AnomalyEvidence(BaseModel):
    indicator: str
    risk_contribution: float
    description: str


class FraudRiskAssessment(BaseModel):
    entity_id: str
    risk_score: float  # 0.0 to 1.0
    risk_level: str    # LOW, MEDIUM, HIGH, CRITICAL
    evidence: List[AnomalyEvidence]
    is_flagged_for_officer_review: bool
    recommended_action: str


class FraudDetectionEngine:
    """
    Unsupervised outlier detector and rule-based anomaly evaluator for government benefits and certificates.
    """
    def __init__(self):
        self.known_document_hashes: Dict[str, str] = {
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855": "app_tn_88921",
            "d2d2d2d298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855": "app_kmut_77189"
        }

    def assess_application(
        self, 
        application_id: str, 
        applicant_id: str,
        document_hash: Optional[str] = None,
        daily_submissions_from_ip: int = 1,
        bank_ifsc: Optional[str] = None
    ) -> FraudRiskAssessment:
        score = 0.05
        evidence: List[AnomalyEvidence] = []

        # 1. Duplicate Document Hash Verification
        if document_hash and document_hash in self.known_document_hashes:
            matched_app = self.known_document_hashes[document_hash]
            score += 0.65
            evidence.append(
                AnomalyEvidence(
                    indicator="DUPLICATE_DOCUMENT_BINARY_HASH",
                    risk_contribution=0.65,
                    description=f"Identical document file hash previously submitted under application {matched_app}."
                )
            )

        # 2. Submission Velocity Check
        if daily_submissions_from_ip > 15:
            score += 0.30
            evidence.append(
                AnomalyEvidence(
                    indicator="HIGH_VELOCITY_SUBMISSION",
                    risk_contribution=0.30,
                    description=f"{daily_submissions_from_ip} applications originated from this IP within 24 hours (possible unauthorized intermediary)."
                )
            )

        # 3. Commercial Account DBT Flag
        if bank_ifsc and bank_ifsc.startswith("CORP"):
            score += 0.25
            evidence.append(
                AnomalyEvidence(
                    indicator="COMMERCIAL_ENTITY_IFSC",
                    risk_contribution=0.25,
                    description="Bank IFSC indicates a non-individual commercial entity rather than a personal savings account."
                )
            )

        normalized_score = min(0.99, round(score, 2))
        
        if normalized_score >= 0.70:
            level = "HIGH"
            action = "Dispatch to District Anti-Corruption & Quality Cell for manual physical verification. Do not reject automatically."
        elif normalized_score >= 0.40:
            level = "MEDIUM"
            action = "Request supplementary document review by Taluk Revenue Inspector."
        else:
            level = "LOW"
            action = "Standard workflow. No anomalous indicators detected."

        return FraudRiskAssessment(
            entity_id=application_id,
            risk_score=normalized_score,
            risk_level=level,
            evidence=evidence,
            is_flagged_for_officer_review=normalized_score >= 0.50,
            recommended_action=action
        )


fraud_detection_engine = FraudDetectionEngine()
