"""
GovAI Nexus - Voice & Speech Assistant Endpoints
Enables voice-driven accessibility through Tamil and English Speech-to-Text and Text-to-Speech.
"""
from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional

from backend.app.schemas.gov_schemas import (
    VoiceSynthesizeRequest, VoiceSynthesizeResponse
)
from backend.ai_engine.speech.whisper_stt import voice_stt_engine
from backend.ai_engine.speech.tts_service import voice_tts_service

router = APIRouter(prefix="/ai/voice", tags=["Voice & Speech Engine"])


@router.post("/transcribe")
async def transcribe_voice(
    file: Optional[UploadFile] = File(None),
    hint_language: Optional[str] = Form("en")
):
    """
    Transcribes uploaded citizen audio query into text.
    Respects DPDP consent: audio is processed transiently and never stored permanently without consent.
    """
    audio_bytes = await file.read() if file else b""
    result = await voice_stt_engine.transcribe_audio(audio_bytes=audio_bytes, hint_language=hint_language)
    return result


@router.post("/synthesize", response_model=VoiceSynthesizeResponse)
async def synthesize_voice(payload: VoiceSynthesizeRequest):
    """
    Generates spoken audio for citizen AI answers in Tamil or English.
    """
    tts_result = await voice_tts_service.synthesize(text=payload.text, language=payload.language)
    return VoiceSynthesizeResponse(
        audio_format=tts_result.audio_format,
        language=tts_result.language,
        sample_rate=tts_result.sample_rate,
        duration_estimate_sec=tts_result.duration_estimate_sec,
        audio_base64=tts_result.audio_base64 or ""
    )
