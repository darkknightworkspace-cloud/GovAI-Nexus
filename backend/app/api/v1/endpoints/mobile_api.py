"""
GovAI Nexus - Phase 5 Dedicated Mobile API Layer
Serves lightweight, offline-cacheable JSON payloads optimized for React Native & Expo clients.
"""
from fastapi import APIRouter
from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel

router = APIRouter(prefix="/mobile", tags=["Mobile Client API"])


class DeviceRegistrationRequest(BaseModel):
    user_id: str
    device_token: str
    platform: str  # ANDROID, IOS
    device_model: Optional[str] = "Pixel 8 Pro"
    os_version: Optional[str] = "Android 15"
    app_version: Optional[str] = "1.0.0"


REGISTERED_DEVICES: Dict[str, Dict[str, Any]] = {}


@router.get("/home")
def get_mobile_home(user_id: Optional[str] = "usr-citizen-01", lang: str = "en"):
    """
    Consolidated payload for Mobile Home Screen:
    User greeting, quick service tiles, recommended welfare schemes, active requests counter,
    and urgent state announcements.
    """
    is_ta = lang == "ta"
    return {
        "greeting": "வணக்கம், திரு. ஆனந்தி" if is_ta else "Welcome back, M. Anandhi",
        "user_profile": {
            "name": "M. Anandhi",
            "district": "Madurai",
            "citizen_id": user_id,
            "digilocker_linked": True
        },
        "announcements": [
            {
                "id": "ann-01",
                "title": "கலைஞர் மகளிர் உரிமைத் தொகை புதிய பதிவு" if is_ta else "Kalaignar Magalir Urimai Thogai Special Camp",
                "badge": "Urgent",
                "date": "2026-11-05"
            },
            {
                "id": "ann-02",
                "title": "TN e-Sevai Kiosk Expansion in Madurai Rural" if not is_ta else "மதுரை கிராமப்புறங்களில் புதிய இ-சேவை மையங்கள்",
                "badge": "Update",
                "date": "2026-10-30"
            }
        ],
        "quick_services": [
            {"id": "srv-01", "name": "Community Certificate" if not is_ta else "சாதிச் சான்றிதழ்", "icon": "FileText", "fee": 60},
            {"id": "srv-02", "name": "Income Certificate" if not is_ta else "வருமானச் சான்றிதழ்", "icon": "DollarSign", "fee": 60},
            {"id": "srv-03", "name": "Patta Chitta Mutation" if not is_ta else "பட்டா சிட்டா மாறுதல்", "icon": "Home", "fee": 100},
            {"id": "srv-04", "name": "Birth / Death Extract" if not is_ta else "பிறப்பு / இறப்பு சான்று", "icon": "Users", "fee": 0}
        ],
        "active_applications_count": 2,
        "unread_notifications_count": 3,
        "offline_sync_ttl_seconds": 3600
    }


@router.get("/services")
def get_mobile_services_catalog():
    """Lightweight services list with required document checklists for mobile."""
    return [
        {
            "id": "srv-01",
            "title": "Community Certificate",
            "title_ta": "சாதிச் சான்றிதழ்",
            "dept": "Revenue & Disaster Management",
            "fee": 60,
            "sla_days": 7,
            "docs_required": ["Aadhaar Card", "Ration Card", "Applicant Photo", "School TC / Parent Community Proof"]
        },
        {
            "id": "srv-02",
            "title": "Income Certificate",
            "title_ta": "வருமானச் சான்றிதழ்",
            "dept": "Revenue & Disaster Management",
            "fee": 60,
            "sla_days": 5,
            "docs_required": ["Salary Slip / Income Affidavit", "Aadhaar Card", "PAN Card (Optional)"]
        },
        {
            "id": "srv-03",
            "title": "Patta Chitta Transfer",
            "title_ta": "பட்டா சிட்டா மாறுதல்",
            "dept": "Revenue (Survey Wing)",
            "fee": 100,
            "sla_days": 15,
            "docs_required": ["Registered Sale Deed", "Encumbrance Certificate", "Prior Patta Copy", "FMB Sketch"]
        }
    ]


@router.get("/notifications")
def get_mobile_notifications(user_id: Optional[str] = "usr-citizen-01"):
    """User notifications with deep link routes for mobile push notifications."""
    return [
        {
            "id": "notif-01",
            "title": "Application APP-00892 Approved",
            "body": "Your Community Certificate has been digitally approved by Tahsildar Madurai North.",
            "route": "app/(tabs)/requests?id=APP-00892",
            "time": "2 hours ago",
            "read": False
        },
        {
            "id": "notif-02",
            "title": "Direct Benefit Transfer Credited",
            "body": "₹1,000 Magalir Urimai Thogai credited into your bank account ending in 4108.",
            "route": "app/(tabs)/profile",
            "time": "Yesterday",
            "read": True
        }
    ]


@router.post("/device/register")
def register_mobile_device(req: DeviceRegistrationRequest):
    """Registers an Expo push token for APNs / FCM push notification routing."""
    REGISTERED_DEVICES[req.device_token] = {
        "user_id": req.user_id,
        "platform": req.platform.upper(),
        "model": req.device_model,
        "os": req.os_version,
        "registered_at": datetime.utcnow().isoformat()
    }
    return {
        "status": "REGISTERED",
        "device_token": req.device_token,
        "registered_devices_count": len(REGISTERED_DEVICES)
    }


@router.post("/device/unregister")
def unregister_mobile_device(req: Dict[str, str]):
    """Removes push token on logout or app uninstall."""
    token = req.get("device_token")
    if token and token in REGISTERED_DEVICES:
        del REGISTERED_DEVICES[token]
    return {"status": "UNREGISTERED"}
