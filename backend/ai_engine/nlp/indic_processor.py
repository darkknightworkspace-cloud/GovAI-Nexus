"""
GovAI Nexus - Indic NLP & Tamil Language Processor
Handles Unicode normalization, Tamil script detection, morphological tokenization,
government abbreviation expansion, and bilingual entity extraction.
"""
import re
import unicodedata
from typing import List, Dict, Any, Tuple


class IndicProcessor:
    """
    Dedicated processor for Tamil Nadu administrative language (Tamil & Indian English).
    """
    def __init__(self):
        # Common Tamil administrative stopwords
        self.tamil_stopwords = {
            "மற்றும்", "ஆகிய", "போன்ற", "இந்த", "அந்த", "ஒரு", "என்று", 
            "உள்ள", "குறித்து", "மூலம்", "உடன்", "மேல்", "கீழ்", "இல்லை"
        }
        # Standard administrative abbreviation mapping
        self.abbreviations = {
            "vao": "Village Administrative Officer (கிராம நிர்வாக அலுவலர்)",
            "ri": "Revenue Inspector (வருவாய் ஆய்வாளர்)",
            "tahsildar": "Tahsildar (வட்டாட்சியர்)",
            "rdo": "Revenue Divisional Officer (வருவாய் கோட்டாட்சியர்)",
            "dro": "District Revenue Officer (மாவட்ட வருவாய் அலுவலர்)",
            "kmut": "Kalaignar Magalir Urimai Thogai (கலைஞர் மகளிர் உரிமைத் திட்டம்)",
            "cmcell": "Chief Minister Special Cell (முதல்வர் தனிப்பிரிவு)",
            "esevai": "Tamil Nadu e-Governance e-Sevai Center (இ-சேவை மையம்)"
        }

    def is_tamil(self, text: str) -> bool:
        """Checks if text contains Tamil Unicode block (U+0B80 - U+0BFF)."""
        return any('\u0B80' <= char <= '\u0BFF' for char in text)

    def normalize_text(self, text: str) -> str:
        """Applies NFC Unicode normalization and strips redundant spaces."""
        normalized = unicodedata.normalize('NFC', text)
        normalized = re.sub(r'\s+', ' ', normalized).strip()
        return normalized

    def tokenize(self, text: str) -> List[str]:
        """Tokenizes Tamil or English text respecting Indian punctuation."""
        clean = self.normalize_text(text)
        return re.findall(r'[\u0B80-\u0BFF\w]+', clean)

    def extract_entities(self, text: str) -> Dict[str, List[str]]:
        """Extracts administrative entities (Districts, Taluks, G.O. numbers, Schemes)."""
        entities: Dict[str, List[str]] = {
            "districts": [],
            "taluks": [],
            "go_numbers": [],
            "schemes": [],
            "departments": []
        }
        
        # Detect TN Districts
        tn_districts = [
            "chennai", "madurai", "coimbatore", "tiruchirappalli", "salem", 
            "tirunelveli", "erode", "vellore", "thanjavur", "dindigul", 
            "kanyakumari", "kanchipuram", "chengalpattu", "tiruvallur"
        ]
        text_lower = text.lower()
        for d in tn_districts:
            if d in text_lower:
                entities["districts"].append(d.capitalize())

        # Detect G.O. references (e.g. G.O. (Ms) No. 49)
        go_matches = re.findall(r'(?:g\.?o\.?|அரசாணை)\s*(?:\([a-z\s.]+\))?\s*(?:no\.?|எண்)?\s*[\d/]+', text, re.IGNORECASE)
        entities["go_numbers"] = go_matches

        # Detect Schemes
        if "magalir" in text_lower or "மகளிர்" in text:
            entities["schemes"].append("Kalaignar Magalir Urimai Thogai")
        if "pudhumai penn" in text_lower or "புதுமை பெண்" in text:
            entities["schemes"].append("Pudhumai Penn Scheme")
        if "naan mudhalvan" in text_lower or "நான் முதல்வன்" in text:
            entities["schemes"].append("Naan Mudhalvan")

        return entities


indic_processor = IndicProcessor()
