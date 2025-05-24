from typing import Dict, Any, List, Optional
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from .base_scraper import BaseScraper
from loguru import logger
import sys

# Configure logger to print to stdout
logger.remove()  # Remove default handler
logger.add(sys.stdout, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>")

class GenericScraper(BaseScraper):
    async def can_handle(self, url: str) -> bool:
        return True  # This is the fallback scraper

    async def extract_data(self, soup: BeautifulSoup, url: str) -> Dict[str, Any]:
        print(f"\nStarting data extraction for {url}")
        
        # Log the HTML content for debugging
        print(f"\nHTML content (first 1000 chars):\n{soup.prettify()[:1000]}")
        
        # Check if we're on a Zara page
        is_zara = "zara.com" in url.lower()
        print(f"Is Zara page: {is_zara}")
        
        # Extract each piece of data
        brand = self._extract_brand(soup, url)
        print(f"Extracted brand: {brand}")
        
        materials = self._extract_materials(soup, is_zara)
        print(f"Extracted materials: {materials}")
        
        price = self._extract_price(soup, is_zara)
        print(f"Extracted price: {price}")
        
        images = self._extract_images(soup, url)
        print(f"Extracted images: {images}")
        
        description = self._extract_description(soup, is_zara)
        print(f"Extracted description: {description}")
        
        title = self._extract_title(soup, is_zara)
        print(f"Extracted title: {title}")
        
        manufacturing_location = self._extract_manufacturing_location(soup)
        print(f"Extracted manufacturing location: {manufacturing_location}")
        
        data = {
            "brand": brand,
            "materials": materials,
            "price": price,
            "images": images,
            "description": description,
            "title": title,
            "manufacturing_location": manufacturing_location
        }
        
        print(f"\nFinal extracted data: {data}")
        return data

    def _extract_title(self, soup: BeautifulSoup, is_zara: bool = False) -> str:
        """Extract product title using multiple methods"""
        print("\nExtracting title...")
        
        if is_zara:
            # Zara-specific title selectors
            zara_selectors = [
                "h1.product-detail-info__header-name",
                "h1.product-detail-info__name",
                "h1[data-qa-label='product-name']",
                "h1.product-name",
                "h1"  # Fallback to any h1
            ]
            
            for selector in zara_selectors:
                print(f"Trying Zara title selector: {selector}")
                title_elem = soup.select_one(selector)
                if title_elem:
                    title = self.clean_text(title_elem.get_text())
                    print(f"Found Zara title with selector {selector}: {title}")
                    return title

        # Try meta tags first
        meta_title = soup.find("meta", attrs={"property": "og:title"}) or soup.find("meta", attrs={"name": "title"})
        if meta_title and meta_title.get("content"):
            title = self.clean_text(meta_title["content"])
            print(f"Found title in meta tags: {title}")
            return title

        # Try common title locations
        title_selectors = [
            "h1.product-title",
            "h1[itemprop='name']",
            "h1.title",
            "h1.product-name",
            "h1"  # Fallback to first h1
        ]

        for selector in title_selectors:
            print(f"Trying common title selector: {selector}")
            title_elem = soup.select_one(selector)
            if title_elem:
                title = self.clean_text(title_elem.get_text())
                print(f"Found title with selector {selector}: {title}")
                return title

        print("No title found in any location")
        return "Unknown Product"

    def _extract_manufacturing_location(self, soup: BeautifulSoup) -> str:
        """Extract manufacturing location using multiple methods"""
        # Common manufacturing location patterns
        patterns = [
            r"Made in\s+([A-Za-z\s]+)",
            r"Manufactured in\s+([A-Za-z\s]+)",
            r"Produced in\s+([A-Za-z\s]+)",
            r"Country of Origin:\s*([A-Za-z\s]+)",
            r"Origin:\s*([A-Za-z\s]+)"
        ]

        # Look in common locations first
        location_selectors = [
            "[class*='origin']",
            "[class*='manufacturing']",
            "[class*='production']",
            "[id*='origin']",
            "[id*='manufacturing']",
            "[id*='production']"
        ]

        # Check specific elements first
        for selector in location_selectors:
            elem = soup.select_one(selector)
            if elem:
                text = elem.get_text()
                for pattern in patterns:
                    match = re.search(pattern, text, re.IGNORECASE)
                    if match:
                        return match.group(1).strip()

        # If not found, search all text
        text = soup.get_text()
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1).strip()

        return "Unknown"

    def _extract_materials(self, soup: BeautifulSoup, is_zara: bool = False) -> str:
        """Extract material information using multiple methods"""
        print("\nExtracting materials...")
        
        if is_zara:
            # Zara-specific material selectors
            zara_selectors = [
                "div[data-qa-label='composition']",
                "div.product-detail-info__composition",
                "div.product-detail-composition",
                "div.composition",
                "div.product-detail-info__description"  # Sometimes materials are in description
            ]
            
            for selector in zara_selectors:
                print(f"Trying Zara material selector: {selector}")
                elem = soup.select_one(selector)
                if elem:
                    text = elem.get_text()
                    print(f"Found Zara materials with selector {selector}: {text}")
                    return self.clean_text(text)

        # Common material keywords
        material_keywords = [
            "cotton", "wool", "polyester", "rayon", "linen",
            "silk", "acrylic", "nylon", "spandex", "elastane",
            "viscose", "modal", "lyocell", "cashmere", "leather",
            "suede", "denim", "jersey", "fleece", "velvet"
        ]
        
        # Look for material information in product details
        material_selectors = [
            "[class*='material']",
            "[class*='fabric']",
            "[class*='composition']",
            "[id*='material']",
            "[id*='fabric']",
            "[id*='composition']",
            "[itemprop='material']",
            "[class*='product-details']",
            "[class*='product-info']",
            "[class*='specifications']",
            "table.specifications",
            "div.product-details",
            "div.product-info",
            "div.product-specs",
            "div.product-description"
        ]

        materials = set()
        
        # Try structured data first
        for selector in material_selectors:
            print(f"Trying material selector: {selector}")
            elements = soup.select(selector)
            for elem in elements:
                text = elem.get_text().lower()
                print(f"Checking text: {text[:100]}...")
                
                # Look for percentage patterns
                percentage_matches = re.finditer(r'(\d+)%\s*([a-zA-Z]+)', text)
                for match in percentage_matches:
                    percentage, material = match.groups()
                    if material.lower() in material_keywords:
                        materials.add(f"{percentage}% {material}")
                        print(f"Found material with percentage: {percentage}% {material}")
                
                # Look for material keywords
                for material in material_keywords:
                    if material in text:
                        # If we haven't already added this material with a percentage
                        if not any(material in m for m in materials):
                            materials.add(material)
                            print(f"Found material: {material}")

        # If no materials found, search in all text
        if not materials:
            print("No materials found in specific elements, searching all text")
            text = soup.get_text().lower()
            
            # Look for percentage patterns
            percentage_matches = re.finditer(r'(\d+)%\s*([a-zA-Z]+)', text)
            for match in percentage_matches:
                percentage, material = match.groups()
                if material.lower() in material_keywords:
                    materials.add(f"{percentage}% {material}")
                    print(f"Found material with percentage in all text: {percentage}% {material}")
            
            # Look for material keywords
            for material in material_keywords:
                if material in text and not any(material in m for m in materials):
                    materials.add(material)
                    print(f"Found material in all text: {material}")

        result = ", ".join(materials) if materials else "Unknown"
        print(f"Final materials found: {result}")
        return result

    def _extract_price(self, soup: BeautifulSoup, is_zara: bool = False) -> float:
        """Extract price using multiple methods"""
        if is_zara:
            # Zara-specific price selectors
            zara_selectors = [
                "span[data-qa-label='price']",
                "span.product-detail-info__price",
                "span.product-detail-price",
                "span.price"
            ]
            
            for selector in zara_selectors:
                price_elem = soup.select_one(selector)
                if price_elem:
                    price_text = price_elem.get_text()
                    print(f"Found Zara price with selector {selector}: {price_text}")
                    price_match = re.search(r'[\d,.]+', price_text.replace(',', ''))
                    if price_match:
                        try:
                            return float(price_match.group())
                        except ValueError:
                            continue

        # Try structured data first
        price_selectors = [
            "[class*='price']",
            "[id*='price']",
            "[itemprop='price']",
            "meta[property='product:price:amount']",
            "[data-price]"
        ]

        for selector in price_selectors:
            elements = soup.select(selector)
            for elem in elements:
                # Check if it's a meta tag
                if elem.name == "meta":
                    price = elem.get("content")
                else:
                    price = elem.get_text()

                if price:
                    # Extract first number that looks like a price
                    price_match = re.search(r'[\d,.]+', price.replace(',', ''))
                    if price_match:
                        try:
                            return float(price_match.group())
                        except ValueError:
                            continue

        # Fallback: search for price patterns in all text
        text = soup.get_text()
        price_patterns = [
            r'\$\s*(\d+(?:\.\d{2})?)',
            r'USD\s*(\d+(?:\.\d{2})?)',
            r'Price:\s*\$?\s*(\d+(?:\.\d{2})?)',
            r'(\d+(?:\.\d{2})?)\s*USD',
            r'(\d+(?:\.\d{2})?)\s*\$'
        ]

        for pattern in price_patterns:
            match = re.search(pattern, text)
            if match:
                try:
                    return float(match.group(1))
                except ValueError:
                    continue

        return 0.0  # Default fallback

    def _extract_images(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Extract product images using multiple methods"""
        images = set()
        
        # Try OpenGraph image
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            images.add(og_image["content"])

        # Try structured data
        image_selectors = [
            "[itemprop='image']",
            "[class*='product-image']",
            "[class*='main-image']",
            "[id*='product-image']",
            "[id*='main-image']",
            "img[class*='product']",
            "img[class*='main']",
            "[data-image]"
        ]

        for selector in image_selectors:
            elements = soup.select(selector)
            for elem in elements:
                if elem.name == "img":
                    src = elem.get("src") or elem.get("data-src")
                else:
                    src = elem.get("data-image")
                
                if src:
                    # Convert relative URLs to absolute
                    absolute_url = urljoin(base_url, src)
                    images.add(absolute_url)

        # Try gallery images
        gallery_selectors = [
            "[class*='gallery']",
            "[class*='carousel']",
            "[class*='slider']",
            "[class*='swiper']"
        ]

        for selector in gallery_selectors:
            gallery = soup.select_one(selector)
            if gallery:
                for img in gallery.find_all("img"):
                    src = img.get("src") or img.get("data-src")
                    if src:
                        absolute_url = urljoin(base_url, src)
                        images.add(absolute_url)

        return list(images)

    def _extract_description(self, soup: BeautifulSoup, is_zara: bool = False) -> str:
        """Extract product description"""
        try:
            # Try meta tags first
            meta_desc = soup.find("meta", attrs={"property": "og:description"}) or soup.find("meta", attrs={"name": "description"})
            if meta_desc and meta_desc.get('content'):
                return self.clean_text(meta_desc['content'])

            # Try Zara-specific selectors
            if is_zara:
                selectors = [
                    'div[data-qa-label="description"]',
                    'div.product-detail-info__description',
                    'div.product-detail-description',
                    'div.description'
                ]
                for selector in selectors:
                    desc_elem = soup.select_one(selector)
                    if desc_elem:
                        return self.clean_text(desc_elem.get_text())

            # Try generic selectors
            selectors = [
                '[class*="description"]',
                '[class*="product-details"]',
                '[class*="product-info"]',
                '[class*="specifications"]',
                'div.product-details',
                'div.product-info',
                'div.product-specs',
                'div.product-description'
            ]
            
            for selector in selectors:
                desc_elem = soup.select_one(selector)
                if desc_elem:
                    return self.clean_text(desc_elem.get_text())

            return "No description found"
            
        except Exception as e:
            print(f"Error extracting description: {str(e)}")
            return "Error extracting description"

    def _extract_brand(self, soup: BeautifulSoup, url: str) -> str:
        """Extract brand name using multiple methods"""
        # Try meta tags first
        for meta in soup.find_all("meta"):
            if meta.get("property") in ["og:site_name", "author", "brand"]:
                return meta.get("content", "")
                
        # Try common brand locations
        brand_selectors = [
            "span.brand", "div.brand", "a.brand",
            "span.manufacturer", "div.manufacturer",
            "[itemprop='brand']",
            "[class*='brand']",
            "[id*='brand']"
        ]
        
        for selector in brand_selectors:
            brand_elem = soup.select_one(selector)
            if brand_elem:
                return self.clean_text(brand_elem.get_text())

        # Fallback to domain name
        domain = urlparse(url).netloc
        return domain.split('.')[0].capitalize()
