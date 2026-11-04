"""
GovAI Nexus - Semantic Text Chunker
Tailored for Indian government orders (GOs), acts, rules, and bilingual Tamil/English texts.
Preserves numbered legal paragraphs, clause hierarchies (e.g. Section 14(2)(a)), and Tamil sentence markers.
"""
import re
from typing import List, Dict, Any


class GovSemanticChunker:
    """
    Splits administrative documents into contextual chunks without severing legal conditions.
    """
    def __init__(self, target_chunk_size: int = 500, overlap_size: int = 80):
        self.target_chunk_size = target_chunk_size
        self.overlap_size = overlap_size

    def chunk_document(self, text: str, metadata: Dict[str, Any]) -> List[Dict[str, Any]]:
        # Normalize whitespace
        cleaned = re.sub(r'\r\n|\r', '\n', text)
        cleaned = re.sub(r'\n{3,}', '\n\n', cleaned).strip()

        # Split along legal paragraphs or dual newlines first
        paragraphs = cleaned.split("\n\n")
        chunks = []
        current_chunk_words: List[str] = []
        current_word_count = 0

        for para in paragraphs:
            para_words = para.split()
            if not para_words:
                continue

            if current_word_count + len(para_words) <= self.target_chunk_size:
                current_chunk_words.extend(para_words)
                current_word_count += len(para_words)
            else:
                if current_chunk_words:
                    chunk_text = " ".join(current_chunk_words)
                    chunks.append({
                        "content": chunk_text,
                        "word_count": len(current_chunk_words),
                        "metadata": {
                            **metadata,
                            "chunk_index": len(chunks)
                        }
                    })
                    # Keep overlap
                    overlap_words = current_chunk_words[-self.overlap_size:] if len(current_chunk_words) > self.overlap_size else current_chunk_words
                    current_chunk_words = list(overlap_words)
                    current_word_count = len(current_chunk_words)

                current_chunk_words.extend(para_words)
                current_word_count += len(para_words)

        if current_chunk_words:
            chunks.append({
                "content": " ".join(current_chunk_words),
                "word_count": len(current_chunk_words),
                "metadata": {
                    **metadata,
                    "chunk_index": len(chunks)
                }
            })

        return chunks
