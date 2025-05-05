# backend/utils/scorer.py

import requests
from bs4 import BeautifulSoup

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
    elif "not good enough" in rating:
        return "D"
    elif "avoid" in rating:
        return "F"
    return "N/A"

def score_fabric(materials):
    if "polyester" in materials.lower():
        return "D"
    elif "rayon" in materials.lower():
        return "C"
    elif "cotton" in materials.lower() or "wool" in materials.lower():
        return "A"
    else:
        return "B"

def score_construction(price):
    if price > 150:
        return "A"
    elif price > 75:
        return "B"
    else:
        return "C"

def score_ethics(brand):
    """
    Searches Good On You for the brand's ethics rating and converts it to a letter grade.
    """
    try:
        search_url = f"https://directory.goodonyou.eco/search?query={brand.replace(' ', '%20')}"
        headers = {"User-Agent": "Mozilla/5.0"}
        search_response = requests.get(search_url, headers=headers)

        if search_response.status_code != 200:
            return "N/A"

        soup = BeautifulSoup(search_response.text, "html.parser")
        brand_links = soup.select("a[href^='/brand/']")

        if not brand_links:
            return "N/A"

        brand_href = brand_links[0]["href"]
        brand_page_url = f"https://directory.goodonyou.eco{brand_href}"
        brand_page_response = requests.get(brand_page_url, headers=headers)

        if brand_page_response.status_code != 200:
            return "N/A"

        brand_soup = BeautifulSoup(brand_page_response.text, "html.parser")
        rating_elem = brand_soup.select_one(".score-rating-text")

        if not rating_elem:
            return "N/A"

        rating_text = rating_elem.get_text(strip=True)
        return convert_goy_rating_to_grade(rating_text)

    except Exception as e:
        print(f"Error fetching ethics score: {e}")
        return "N/A"

def estimate_cost_per_wear(price, fabric_score):
    wear_lookup = {"A": 200, "B": 120, "C": 80, "D": 40}
    return round(price / wear_lookup.get(fabric_score, 100), 2)

def grade_to_num(letter):
    return {"A": 90, "B": 80, "C": 70, "D": 60, "F": 50, "N/A": 0}.get(letter, 0)

def calculate_overall(scores):
    score_vals = [grade_to_num(s) for s in scores if s != "N/A"]
    return round(sum(score_vals) / len(score_vals)) if score_vals else 0

def grade_product(data):
    fabric = score_fabric(data["materials"])
    construction = score_construction(data["price"])
    ethics = score_ethics(data["brand"])
    cpw = estimate_cost_per_wear(data["price"], fabric)
    overall = calculate_overall([fabric, construction, ethics])

    return {
        "brand": data["brand"],
        "quality": fabric,
        "construction": construction,
        "ethics": ethics,
        "costPerWear": f"${cpw}",
        "overallScore": overall,
        "durability": "5+ years" if fabric == "A" else "2-4 years"
    }
