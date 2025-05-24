# backend/utils/scorer.py
import requests
from bs4 import BeautifulSoup
from typing import Dict, Any
import json
from pathlib import Path
import os
from supabase import create_client, Client

DURABILITY_REF = {}
with open(Path(__file__).parent / "garment_durability_reference.json") as f:
    raw = json.load(f)
    # Build a lookup: DURABILITY_REF[garment_type][fabric] = expected_lifespan_years
    for entry in raw:
        gtype = entry["garment_type"].lower()
        if gtype not in DURABILITY_REF:
            DURABILITY_REF[gtype] = {}
        for ftype in entry["fabric_types"]:
            DURABILITY_REF[gtype][ftype["fabric"].lower()] = {
                "expected_lifespan_years": ftype["expected_lifespan_years"],
                "gsm_range": ftype.get("gsm_range"),
            }

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def convert_goy_rating_to_grade(rating):
    """
    Convert Good On You rating to letter grade.
    """
    rating = rating.lower()
    if "great" in rating:
        return "A"
    elif "good" in rating:
        return "B"
    elif "start" in rating:
        return "C"

class ProductScorer:
    def __init__(self):
        pass

    def score_fabric(self, materials: str) -> str:
        if "polyester" in materials.lower():
            return "D"
        elif "rayon" in materials.lower():
            return "C"
        elif "cotton" in materials.lower() or "wool" in materials.lower():
            return "A"
        else:
            return "B"

    def score_construction(self, price: float) -> str:
        if price > 150:
            return "A"
        elif price > 75:
            return "B"
        else:
            return "C"

    def score_ethics(self, brand: str) -> str:
        # 1. Try to get from Supabase
        try:
            result = supabase.table("brand_human_impact").select("*").eq("brand_name", brand).execute()
            if result.data and len(result.data) > 0:
                return result.data[0]["ethics_score"]
        except Exception as e:
            print(f"Error querying Supabase for brand {brand}: {e}")

        # 2. Fallback to Good On You or hardcoded logic
        score, explanation, source = self.get_ethics_from_good_on_you(brand)

        # 3. Store in Supabase for future use
        try:
            supabase.table("brand_human_impact").insert({
                "brand_name": brand,
                "ethics_score": score,
                "explanation": explanation,
                "source": source
            }).execute()
        except Exception as e:
            print(f"Error inserting into Supabase for brand {brand}: {e}")

        return score

    def get_ethics_from_good_on_you(self, brand: str):
        """
        Scrape Good On You for the brand's rating and map to a grade.
        Returns (score, explanation, source)
        """
        try:
            search_url = f"https://directory.goodonyou.eco/search?query={brand.replace(' ', '%20')}"
            headers = {"User-Agent": "Mozilla/5.0"}
            search_response = requests.get(search_url, headers=headers)

            if search_response.status_code != 200:
                return "N/A", "Could not fetch from Good On You", "Good On You"

            soup = BeautifulSoup(search_response.text, 'html.parser')
            rating_element = soup.find('div', {'class': 'rating'})
            if rating_element:
                score = self.convert_goy_rating_to_grade(rating_element.text)
                explanation = f"Fetched from Good On You for {brand}: {rating_element.text.strip()}"
                return score, explanation, "Good On You"
            return "N/A", "No rating found on Good On You", "Good On You"
        except Exception as e:
            print(f"Error fetching ethics score: {e}")
            return "N/A", f"Error fetching: {e}", "Good On You"

    def convert_goy_rating_to_grade(self, rating):
        """
        Convert Good On You rating to letter grade.
        """
        rating = rating.lower()
        if "great" in rating:
            return "A"
        elif "good" in rating:
            return "B"
        elif "start" in rating:
            return "C"
        elif "not good enough" in rating:
            return "D"
        elif "avoid" in rating:
            return "F"
        return "N/A"

    def estimate_cost_per_wear(self, price: float, fabric_score: str) -> float:
        wear_multiplier = {
            'A': 200,
            'B': 150,
            'C': 100,
            'D': 50,
            'F': 25
        }.get(fabric_score, 100)
        return round(price / wear_multiplier, 2)

    def grade_to_num(self, letter: str) -> int:
        return {
            'A': 95,
            'B': 85,
            'C': 75,
            'D': 65,
            'F': 55
        }.get(letter, 75)

    def calculate_overall(self, scores: Dict[str, str]) -> int:
        weights = {'fabric': 0.4, 'construction': 0.35, 'ethics': 0.25}
        total = 0
        for category, score in scores.items():
            total += self.grade_to_num(score) * weights.get(category, 0)
        return round(total)

    def grade_product(self, data: Dict[str, Any]) -> Dict[str, Any]:
        fabric = self.score_fabric(data["materials"])
        construction = self.score_construction(data["price"])
        ethics = self.score_ethics(data["brand"])
        brand_quality = self.get_brand_quality(data["brand"])

        garment_type = data.get("garment_type", "t-shirt")
        fabric_type = data.get("main_fabric", "cotton")
        lined = data.get("lined", False)
        reinforced_seams = data.get("reinforced_seams", False)

        durability = estimate_durability(
            garment_type, fabric_type, data["price"], lined, reinforced_seams, data["brand"], brand_quality
        )

        scores = {"fabric": fabric, "construction": construction, "ethics": ethics}
        overall = self.calculate_overall(scores)
        cost_per_wear = self.estimate_cost_per_wear(data["price"], fabric)

        explanations = {
            "fabric": f"Material quality: {data['materials']}",
            "construction": f"Construction quality based on price point: ${data['price']}",
            "ethics": f"Brand ethics rating for {data['brand']}",
            "durability": durability["explanation"],
            "overall": f"Overall score considering fabric (40%), construction (35%), and ethics (25%)"
        }

        # 1. Upsert to brand_human_impact
        try:
            supabase.table("brand_human_impact").upsert({
                "brand_name": data["brand"],
                "ethics_score": ethics,
                "explanation": explanations["ethics"],
                "source": "CIRA/Good On You/Other"
            }, on_conflict=["brand_name"]).execute()
        except Exception as e:
            print(f"Error upserting to brand_human_impact: {e}")

        # 2. Insert full report to reports
        try:
            supabase.table("reports").insert({
                "url": data.get("url", ""),
                "brand": data["brand"],
                "overall_score": overall,
                "quality": fabric,
                "construction": construction,
                "durability": durability["durability_years"],
                "ethics": ethics,
                "cost_per_wear": f"${cost_per_wear}",
                "materials": data["materials"],
                "quality_explanation": explanations["fabric"],
                "construction_explanation": explanations["construction"],
                "ethics_explanation": explanations["ethics"],
                "overall_explanation": explanations["overall"]
            }).execute()
        except Exception as e:
            print(f"Error inserting report: {e}")

        return {
            "scores": scores,
            "overall": overall,
            "cost_per_wear": cost_per_wear,
            "explanations": explanations,
            "brand": data["brand"],
            "quality": fabric,
            "construction": construction,
            "ethics": ethics,
            "costPerWear": f"${cost_per_wear}",
            "overallScore": overall,
            "durability": durability["durability_years"]
        }

def estimate_durability(
    garment_type, fabric_type, price, lined=False, reinforced_seams=False, brand=None, brand_quality=None
):
    # 1. Base from reference
    gtype = (garment_type or "").lower()
    ftype = (fabric_type or "").lower()
    base = DURABILITY_REF.get(gtype, {}).get(ftype, {})
    years = base.get("expected_lifespan_years", 2)
    notes = []

    # 2. Construction adjustments
    if lined:
        years *= 1.3
        notes.append("Lined garment (+30%)")
    if reinforced_seams:
        years *= 1.2
        notes.append("Reinforced seams (+20%)")

    # 3. Price proxy
    if price > 250:
        years += 3
        notes.append("Premium price (+3 years)")
    elif price > 150:
        years += 1.5
        notes.append("High price (+1.5 years)")
    elif price < 30:
        years -= 1
        notes.append("Low price (-1 year)")

    # 4. Brand quality adjustment
    if brand_quality == "high":
        years += 1
        notes.append("High-quality brand (+1 year)")
    elif brand_quality == "low":
        years -= 1
        notes.append("Low-quality brand (-1 year)")

    # 5. Clamp to reasonable range
    years = max(1, round(years, 1))

    # 6. Compose explanation
    explanation = (
        f"Base: {base.get('expected_lifespan_years', 'N/A')} years for {fabric_type} {garment_type}. "
        + "; ".join(notes)
    )

    return {
        "durability_years": f"{years} years",
        "explanation": explanation
    }
