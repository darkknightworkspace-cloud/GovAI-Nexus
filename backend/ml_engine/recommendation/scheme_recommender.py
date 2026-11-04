"""
GovAI Nexus - Citizen Welfare Scheme Recommendation Engine
Rule-based eligibility filtering and content-based ranking.
Explicitly highlights eligibility prerequisites and explains that recommendation does not guarantee approval.
"""
from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class SchemeRecommendation(BaseModel):
    scheme_id: str
    title_en: str
    title_ta: str
    department: str
    category: str
    match_score: float  # 0.0 to 1.0
    benefit_summary: str
    eligibility_reasons: List[str]
    disclaimer: str = "Recommendation is indicative and based on self-reported profile data. Official sanction requires statutory officer verification."


class SchemeRecommenderEngine:
    """
    Evaluates citizen demographics and returns personalized welfare entitlements.
    """
    def __init__(self):
        self.catalog = [
            {
                "id": "scm-01",
                "title_en": "Kalaignar Magalir Urimai Thogai (KMUT)",
                "title_ta": "கலைஞர் மகளிர் உரிமைத் திட்டம்",
                "department": "Social Welfare & Women Empowerment",
                "category": "Women Welfare",
                "benefit": "₹1,000 monthly direct financial assistance directly to bank account.",
                "rules": {
                    "gender": ["Female", "female", "F"],
                    "min_age": 21,
                    "max_income": 250000
                }
            },
            {
                "id": "scm-02",
                "title_en": "Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme",
                "title_ta": "மூவலூர் ராமாமிர்தம் அம்மையார் புதுமைப் பெண் திட்டம்",
                "department": "Higher Education & Social Welfare",
                "category": "Student Welfare",
                "benefit": "₹1,000 monthly higher education grant for female students from government schools.",
                "rules": {
                    "gender": ["Female", "female", "F"],
                    "min_age": 17,
                    "max_age": 24,
                    "education": "Government School (6th to 12th)"
                }
            },
            {
                "id": "scm-03",
                "title_en": "Chief Minister Comprehensive Health Insurance Scheme (CMCHIS)",
                "title_ta": "முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்",
                "department": "Health & Family Welfare",
                "category": "Healthcare",
                "benefit": "Cashless medical treatments up to ₹5,00,000 per family per year in empanelled hospitals.",
                "rules": {
                    "max_income": 120000
                }
            },
            {
                "id": "scm-04",
                "title_en": "Naan Mudhalvan Skill Development Scheme",
                "title_ta": "நான் முதல்வன் திறன் மேம்பாட்டுத் திட்டம்",
                "department": "Special Programme Implementation",
                "category": "Youth & Employment",
                "benefit": "Free high-tech industry training, cloud certifications, and placement assistance.",
                "rules": {
                    "min_age": 18,
                    "max_age": 30
                }
            }
        ]

    def recommend(
        self, 
        age: Optional[int] = None, 
        gender: Optional[str] = None, 
        annual_income: Optional[float] = None,
        community: Optional[str] = None,
        is_student: bool = False
    ) -> List[SchemeRecommendation]:
        recommendations: List[SchemeRecommendation] = []

        for item in self.catalog:
            rules = item["rules"]
            reasons = []
            score = 0.50

            # Check gender match
            if "gender" in rules:
                if gender and gender in rules["gender"]:
                    reasons.append(f"Eligible for targeted women welfare benefit ({gender})")
                    score += 0.25
                elif gender and gender not in rules["gender"]:
                    continue  # Ineligible

            # Check income match
            if "max_income" in rules:
                if annual_income is not None and annual_income <= rules["max_income"]:
                    reasons.append(f"Income ₹{int(annual_income):,} is below scheme threshold of ₹{rules['max_income']:,}")
                    score += 0.20
                elif annual_income is not None and annual_income > rules["max_income"]:
                    continue

            # Check age
            if "min_age" in rules and age is not None:
                if age >= rules["min_age"]:
                    reasons.append(f"Age {age} satisfies minimum age criterion of {rules['min_age']}")
                    score += 0.10
                else:
                    continue

            recommendations.append(
                SchemeRecommendation(
                    scheme_id=item["id"],
                    title_en=item["title_en"],
                    title_ta=item["title_ta"],
                    department=item["department"],
                    category=item["category"],
                    match_score=min(0.99, round(score, 2)),
                    benefit_summary=item["benefit"],
                    eligibility_reasons=reasons or ["General civic eligibility"]
                )
            )

        recommendations.sort(key=lambda x: x.match_score, reverse=True)
        return recommendations


scheme_recommender = SchemeRecommenderEngine()
