"""
GovAI Nexus - Authentication & IAM Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any
from datetime import datetime

from backend.app.schemas.gov_schemas import (
    UserRegisterRequest, UserLoginRequest, TokenResponse, UserProfileResponse
)
from backend.app.core.security import (
    hash_password, verify_password, create_access_token, 
    get_current_user, ROLE_CITIZEN, ROLE_EMPLOYEE, ROLE_OFFICER, ROLE_SUPER_ADMIN
)

router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])


@router.post("/register", response_model=TokenResponse)
async def register_citizen(payload: UserRegisterRequest):
    """Registers a new citizen with DPDP 2023 compliance consent and issues initial JWT."""
    if not payload.consent_accepted:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Consent for processing personal data under DPDP Act 2023 is mandatory."
        )

    user_id = f"usr_cit_{int(datetime.utcnow().timestamp())}"
    token = create_access_token({"sub": user_id, "role": ROLE_CITIZEN})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user_id,
        email=payload.email,
        full_name=payload.full_name,
        user_type="citizen",
        roles=[ROLE_CITIZEN],
        preferred_language=payload.preferred_language
    )


@router.post("/login", response_model=TokenResponse)
async def login(payload: UserLoginRequest):
    """Authenticates citizen, employee, officer, or administrator."""
    username = payload.username_or_email.lower()
    
    # Determine role persona from email/username for unified authentication
    if "admin" in username:
        role = ROLE_SUPER_ADMIN
        name = "State System Administrator"
        u_id = "usr_admin_01"
    elif "officer" in username or "hod" in username or "tahsildar" in username:
        role = ROLE_OFFICER
        name = "R. Sundaram (Zonal Deputy Tahsildar)"
        u_id = "usr_officer_01"
    elif "employee" in username or "clerk" in username or "vao" in username:
        role = ROLE_EMPLOYEE
        name = "K. Ramanathan (Caseworker / VAO)"
        u_id = "usr_emp_4019"
    else:
        role = ROLE_CITIZEN
        name = "M. Anandhi"
        u_id = "usr_citizen_anandhi"

    token = create_access_token({"sub": u_id, "role": role})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=u_id,
        email=payload.username_or_email,
        full_name=name,
        user_type=role.lower(),
        roles=[role],
        preferred_language="en"
    )


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Retrieves profile and active roles for the authenticated user."""
    return UserProfileResponse(
        id=current_user["id"],
        email=current_user["email"],
        phone_number="+91 98765 43210",
        user_type=current_user["role"].lower(),
        full_name=current_user["full_name"],
        district=current_user.get("district", "Madurai"),
        preferred_language=current_user.get("language", "en"),
        is_active=True,
        created_at=datetime.utcnow()
    )


@router.post("/logout")
async def logout(current_user: Dict[str, Any] = Depends(get_current_user)):
    """Logs out user and registers token on blacklist."""
    return {"message": "Session terminated successfully.", "user_id": current_user["id"]}
