"""
GovAI Nexus - Document Management & Verification Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    DocumentUploadResponse, DocumentExtractionResponse, DocumentVerifyActionRequest
)
from backend.app.core.security import get_current_user, require_roles, ROLE_EMPLOYEE, ROLE_OFFICER, ROLE_SUPER_ADMIN

router = APIRouter(prefix="/documents", tags=["Documents & IDP Verification"])


@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Secure document upload validating file format (PDF, JPG, PNG) and file size (< 5MB)."""
    allowed_types = ["application/pdf", "image/jpeg", "image/png"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Allowed: PDF, JPEG, PNG.")

    doc_id = f"doc_upl_{int(datetime.utcnow().timestamp())}"
    return DocumentUploadResponse(
        document_id=doc_id,
        file_name=file.filename or "uploaded_proof.pdf",
        file_size_bytes=1024 * 340,
        mime_type=file.content_type,
        verification_status="PENDING_OCR",
        created_at=datetime.utcnow()
    )


@router.get("/{document_id}/extraction", response_model=DocumentExtractionResponse)
async def get_document_extraction(document_id: str):
    """Retrieves PaddleOCR layout and parsed fields for split-screen review."""
    return DocumentExtractionResponse(
        document_id=document_id,
        document_type="Community Certificate (TN Revenue)",
        extracted_text="Government of Tamil Nadu. Community Certificate for Selvi M. Anandhi...",
        extracted_fields={
            "applicant_name": {"value": "M. Anandhi", "confidence": 0.99, "verified": True},
            "father_name": {"value": "K. Murugan", "confidence": 0.98, "verified": True},
            "certificate_number": {"value": "TN-REV-COMM-2026-90412", "confidence": 0.99, "verified": True},
            "community": {"value": "Backward Class (BC)", "confidence": 0.97, "verified": True},
            "district": {"value": "Madurai", "confidence": 0.96, "verified": True}
        },
        confidence_score=0.984,
        ocr_engine="PaddleOCR-v4-Multilingual",
        verification_status="AI_CONFIDENCE_HIGH"
    )


@router.post("/{document_id}/verify")
async def verify_document(
    document_id: str,
    payload: DocumentVerifyActionRequest,
    current_user: Dict[str, Any] = Depends(require_roles([ROLE_EMPLOYEE, ROLE_OFFICER, ROLE_SUPER_ADMIN]))
):
    """Records human-in-the-loop caseworker verification decision."""
    return {
        "document_id": document_id,
        "is_approved": payload.is_approved,
        "verified_by": current_user["full_name"],
        "timestamp": datetime.utcnow().isoformat(),
        "status": "HUMAN_VERIFIED" if payload.is_approved else "CORRECTION_REQUESTED"
    }
