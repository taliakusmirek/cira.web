from typing import Dict, List

# Material Scores and Properties
MATERIAL_SCORES: Dict[str, Dict[str, any]] = {
    "organic cotton": {
        "score": "A",
        "durability": "4-5 years",
        "sustainability": "High",
        "wear_count": 200,
        "explanation": "Organic cotton is highly durable and environmentally sustainable"
    },
    "cotton": {
        "score": "B",
        "durability": "3-4 years",
        "sustainability": "Medium",
        "wear_count": 150,
        "explanation": "Cotton is durable but conventional farming has environmental impact"
    },
    "wool": {
        "score": "A",
        "durability": "4-5 years",
        "sustainability": "High",
        "wear_count": 200,
        "explanation": "Wool is naturally durable and biodegradable"
    },
    "cashmere": {
        "score": "A",
        "durability": "4-5 years",
        "sustainability": "High",
        "wear_count": 200,
        "explanation": "High-quality natural fiber with excellent durability"
    },
    "linen": {
        "score": "A",
        "durability": "4-5 years",
        "sustainability": "High",
        "wear_count": 200,
        "explanation": "Linen is highly durable and environmentally friendly"
    },
    "polyester": {
        "score": "D",
        "durability": "2-3 years",
        "sustainability": "Low",
        "wear_count": 100,
        "explanation": "Synthetic material with environmental concerns and lower durability"
    },
    "nylon": {
        "score": "D",
        "durability": "2-3 years",
        "sustainability": "Low",
        "wear_count": 100,
        "explanation": "Synthetic material with environmental impact"
    },
    "rayon": {
        "score": "C",
        "durability": "2-3 years",
        "sustainability": "Medium",
        "wear_count": 120,
        "explanation": "Semi-synthetic fiber with moderate durability"
    },
    "spandex": {
        "score": "C",
        "durability": "2-3 years",
        "sustainability": "Low",
        "wear_count": 120,
        "explanation": "Synthetic material with moderate durability"
    }
}

# Construction Score Thresholds
CONSTRUCTION_TIERS: Dict[str, Dict[str, any]] = {
    "A": {
        "min_price": 150,
        "explanation": "Premium construction with high-quality craftsmanship"
    },
    "B": {
        "min_price": 75,
        "explanation": "Good quality construction with attention to detail"
    },
    "C": {
        "min_price": 30,
        "explanation": "Standard construction quality"
    },
    "D": {
        "min_price": 0,
        "explanation": "Basic construction with potential durability concerns"
    }
}

# Ethics Scores for Known Brands
BRAND_ETHICS: Dict[str, Dict[str, any]] = {
    "patagonia": {
        "score": "A",
        "explanation": "Industry leader in sustainability and ethical practices"
    },
    "everlane": {
        "score": "B",
        "explanation": "Strong commitment to transparency and ethical manufacturing"
    },
    "zara": {
        "score": "D",
        "explanation": "Fast fashion model with environmental and labor concerns"
    },
    "h&m": {
        "score": "C",
        "explanation": "Making sustainability efforts but still fast fashion model"
    }
}

# Good On You Rating Mapping
GOOD_ON_YOU_MAP: Dict[str, str] = {
    "great": "A",
    "good": "B",
    "it's a start": "C",
    "not good enough": "D",
    "we avoid": "F"
}

# Grade to Numeric Score Mapping
GRADE_TO_SCORE: Dict[str, int] = {
    "A": 95,
    "B": 85,
    "C": 75,
    "D": 65,
    "F": 55
}

# Default Values
DEFAULT_ETHICS_SCORE = "C"
DEFAULT_WEAR_COUNT = 100
MIN_PRICE_THRESHOLD = 10
