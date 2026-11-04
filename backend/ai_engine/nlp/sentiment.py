"""
GovAI Nexus - Citizen Feedback Sentiment & Topic Analysis Engine
Evaluates citizen satisfaction, identifies negative grievance hotspots, and analyzes Tamil & English remarks.
"""
from typing import Dict, Any, List
from pydantic import BaseModel


class SentimentAnalysisResult(BaseModel):
    sentiment: str  # POSITIVE, NEUTRAL, NEGATIVE
    confidence: float
    polarity_score: float  # -1.0 to +1.0
    aspects_identified: Dict[str, str]  # e.g., {"service_speed": "NEGATIVE", "employee_behavior": "POSITIVE"}
    highlight_phrases: List[str]


class CitizenSentimentAnalyzer:
    """
    Bilingual sentiment analyzer for Tamil Nadu e-Governance feedback.
    """
    def __init__(self):
        # Lexicon of positive and negative tokens in Tamil and English
        self.positive_tokens = {
            "good", "fast", "helpful", "smooth", "excellent", "quick", "transparent", "easy",
            "நன்று", "நல்ல", "வேகமாக", "உதவியாக", "எளிதாக", "சிறப்பு", "மகிழ்ச்சி", "நன்றி"
        }
        self.negative_tokens = {
            "delay", "slow", "corrupt", "bribe", "harass", "failed", "error", "rejected", "poor", "rude",
            "தாமதம்", "மெதுவாக", "அலைக்கழிப்பு", "லஞ்சம்", "தோல்வி", "மோசம்", "கடினம்", "பயனில்லை"
        }

    def analyze(self, text: str) -> SentimentAnalysisResult:
        words = text.lower().split()
        pos_count = sum(1 for w in words if any(p in w for p in self.positive_tokens))
        neg_count = sum(1 for w in words if any(n in w for n in self.negative_tokens))

        total = pos_count + neg_count
        if total == 0:
            return SentimentAnalysisResult(
                sentiment="NEUTRAL",
                confidence=0.85,
                polarity_score=0.0,
                aspects_identified={"general": "NEUTRAL"},
                highlight_phrases=[]
            )

        polarity = (pos_count - neg_count) / total
        if polarity > 0.15:
            sentiment = "POSITIVE"
            confidence = min(0.98, 0.70 + (pos_count * 0.08))
        elif polarity < -0.15:
            sentiment = "NEGATIVE"
            confidence = min(0.98, 0.70 + (neg_count * 0.08))
        else:
            sentiment = "NEUTRAL"
            confidence = 0.80

        aspects = {}
        if "staff" in text.lower() or "அதிகாரி" in text:
            aspects["officer_interaction"] = "POSITIVE" if pos_count >= neg_count else "NEGATIVE"
        if "delay" in text.lower() or "தாமதம்" in text or "sla" in text.lower():
            aspects["processing_speed"] = "NEGATIVE"
        if "portal" in text.lower() or "website" in text.lower() or "இணையதளம்" in text:
            aspects["portal_usability"] = "POSITIVE" if "easy" in text.lower() or "எளிதாக" in text else "NEUTRAL"

        return SentimentAnalysisResult(
            sentiment=sentiment,
            confidence=round(confidence, 2),
            polarity_score=round(polarity, 2),
            aspects_identified=aspects or {"overall_experience": sentiment},
            highlight_phrases=[w for w in words if any(p in w for p in self.positive_tokens.union(self.negative_tokens))][:4]
        )


sentiment_analyzer = CitizenSentimentAnalyzer()
