import requests
from bs4 import BeautifulSoup
import re

def scrape_page(url):
    html = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}).text
    soup = BeautifulSoup(html, 'html.parser')

    # Fabric/material
    text = soup.get_text(separator=' ')
    fabric_match = re.search(r"(cotton|wool|polyester|rayon|linen|silk|acrylic|nylon)", text, re.IGNORECASE)
    materials = fabric_match.group(1) if fabric_match else "Unknown"

    # Price
    price_match = re.search(r"\$(\d{1,5}(?:\.\d{2})?)", text)
    price = float(price_match.group(1)) if price_match else 50.0  # Fallback

    # Brand
    brand_tag = soup.find("meta", {"property": "og:site_name"}) or soup.find("meta", {"name": "author"})
    brand = brand_tag["content"] if brand_tag and brand_tag.has_attr("content") else url.split('/')[2].split('.')[0].capitalize()

    return {
        "materials": materials,
        "price": price,
        "brand": brand
    }
