from serpapi import GoogleSearch
from typing import Dict, List, Optional, Set
import os
from loguru import logger
from .scorer import ProductScorer
from supabase import create_client, Client
import re

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class ProductRecommender:
    def __init__(self):
        self.serp_api_key = os.environ.get("SERP_API_KEY")
        self.scorer = ProductScorer()
        
        # Define quality thresholds for different budget tiers
        self.quality_thresholds = {
            "budget": {"min_score": 75, "min_quality": "C", "min_ethics": "C"},
            "value": {"min_score": 80, "min_quality": "B", "min_ethics": "B"},
            "mid": {"min_score": 85, "min_quality": "B+", "min_ethics": "B+"},
            "investment": {"min_score": 90, "min_quality": "A", "min_ethics": "A"},
            "heirloom": {"min_score": 95, "min_quality": "A+", "min_ethics": "A+"}
        }
        
        # Define material quality tiers
        self.material_quality = {
            "premium": {"wool", "silk", "cashmere", "linen", "organic cotton"},
            "good": {"cotton", "denim", "leather", "suede"},
            "avoid": {"polyester", "acrylic", "nylon", "spandex", "rayon"}
        }
        
    def _get_budget_tiers(self, original_price: float) -> Dict[str, float]:
        """Calculate budget tiers based on original price"""
        return {
            "budget": max(original_price * 0.5, 20),  # 50% of original, min $20
            "value": original_price * 0.8,            # 80% of original
            "mid": original_price * 1.2,              # 20% more than original
            "investment": original_price * 2,         # Double original
            "heirloom": original_price * 3            # Triple original
        }

    def _extract_garment_type(self, title: str) -> str:
        """Extract garment type from product title"""
        garment_types = {
            "blazer", "jacket", "coat", "sweater", "shirt", "blouse", 
            "dress", "skirt", "pants", "jeans", "shorts", "t-shirt"
        }
        
        title_lower = title.lower()
        for garment in garment_types:
            if garment in title_lower:
                return garment
        return "unknown"

    def _extract_materials(self, description: str) -> Set[str]:
        """Extract materials from product description"""
        materials = set()
        description_lower = description.lower()
        
        # Check for premium materials
        for material in self.material_quality["premium"]:
            if material in description_lower:
                materials.add(material)
                
        # Check for good materials
        for material in self.material_quality["good"]:
            if material in description_lower:
                materials.add(material)
                
        return materials

    def _is_quality_material(self, materials: Set[str], tier: str) -> bool:
        """Check if materials meet quality requirements for the tier"""
        if tier in ["investment", "heirloom"]:
            # Must have at least one premium material
            return bool(materials & self.material_quality["premium"])
        elif tier in ["mid", "value"]:
            # Must have at least one good material and no avoid materials
            return bool(materials & self.material_quality["good"]) and not bool(materials & self.material_quality["avoid"])
        else:  # budget
            # Just avoid the worst materials
            return not bool(materials & self.material_quality["avoid"])

    def _search_products(self, query: str, price_range: tuple, garment_type: str) -> List[Dict]:
        """Search for products using SerpAPI with enhanced filtering"""
        try:
            # Add garment type to query for better relevance
            enhanced_query = f"{query} {garment_type}"
            
            search = GoogleSearch({
                "q": enhanced_query,
                "tbm": "shop",  # Shopping results
                "api_key": self.serp_api_key,
                "price_low": price_range[0],
                "price_high": price_range[1],
                "num": 20,  # Get more results to filter
                "sort": "price"  # Sort by price for better budget matching
            })
            results = search.get_dict()
            return results.get("shopping_results", [])
        except Exception as e:
            logger.error(f"Error searching products: {e}")
            return []

    def _filter_by_score(self, products: List[Dict], tier: str, original_garment_type: str) -> List[Dict]:
        """Enhanced filtering based on CIRA's scoring system and additional criteria"""
        filtered_products = []
        thresholds = self.quality_thresholds[tier]
        
        for product in products:
            try:
                # Extract materials and check quality
                materials = self._extract_materials(product.get("description", ""))
                if not self._is_quality_material(materials, tier):
                    continue
                
                # Score the product
                analysis = self.scorer.grade_product({
                    "brand": product.get("brand", "Unknown"),
                    "price": float(product.get("price", "0").replace("$", "").replace(",", "")),
                    "materials": product.get("description", ""),
                    "url": product.get("link", ""),
                    "garment_type": product.get("title", "").lower()
                })
                
                # Check if product meets tier requirements
                if (analysis["overallScore"] >= thresholds["min_score"] and
                    self._grade_to_num(analysis["quality"]) >= self._grade_to_num(thresholds["min_quality"]) and
                    self._grade_to_num(analysis["ethics"]) >= self._grade_to_num(thresholds["min_ethics"])):
                    
                    # Add additional metadata
                    product["cira_score"] = analysis["overallScore"]
                    product["quality"] = analysis["quality"]
                    product["construction"] = analysis["construction"]
                    product["ethics"] = analysis["ethics"]
                    product["durability"] = analysis["durability"]
                    product["materials"] = list(materials)
                    product["garment_type"] = self._extract_garment_type(product.get("title", ""))
                    
                    # Only include if garment type matches
                    if product["garment_type"] == original_garment_type:
                        filtered_products.append(product)
                    
            except Exception as e:
                logger.error(f"Error scoring product: {e}")
                continue
                
        return filtered_products

    def _grade_to_num(self, grade: str) -> int:
        """Convert letter grade to numeric value"""
        grade_map = {
            "A+": 98, "A": 95, "A-": 92,
            "B+": 88, "B": 85, "B-": 82,
            "C+": 78, "C": 75, "C-": 72,
            "D+": 68, "D": 65, "D-": 62,
            "F": 55
        }
        return grade_map.get(grade, 75)

    def get_recommendations(self, original_product: Dict) -> Dict[str, List[Dict]]:
        """
        Get recommendations for a product at different budget tiers
        Returns a dictionary of budget tiers with recommended products
        """
        # Extract key information from original product
        title = original_product.get("title", "")
        price = float(original_product.get("price", "0").replace("$", "").replace(",", ""))
        materials = original_product.get("materials", "")
        garment_type = self._extract_garment_type(title)
        
        # Calculate budget tiers
        budget_tiers = self._get_budget_tiers(price)
        
        # Build search query
        query = f"{title} {materials}"
        
        recommendations = {}
        
        # Search and filter for each budget tier
        for tier, target_price in budget_tiers.items():
            price_range = (target_price * 0.7, target_price * 1.3)  # ±30% range
            
            # Search for products
            products = self._search_products(query, price_range, garment_type)
            
            # Filter by score and additional criteria
            filtered_products = self._filter_by_score(products, tier, garment_type)
            
            # Sort by score and take top 3
            recommendations[tier] = sorted(
                filtered_products,
                key=lambda x: (x.get("cira_score", 0), -float(x.get("price", "0").replace("$", "").replace(",", ""))),
                reverse=True
            )[:3]
            
        return recommendations

    def format_recommendations(self, recommendations: Dict[str, List[Dict]]) -> Dict[str, List[Dict]]:
        """Format recommendations for API response with enhanced metadata"""
        formatted = {}
        
        for tier, products in recommendations.items():
            formatted[tier] = [{
                "title": p.get("title", ""),
                "price": p.get("price", ""),
                "url": p.get("link", ""),
                "image": p.get("thumbnail", ""),
                "brand": p.get("brand", "Unknown"),
                "score": p.get("cira_score", 0),
                "quality": p.get("quality", "N/A"),
                "construction": p.get("construction", "N/A"),
                "ethics": p.get("ethics", "N/A"),
                "durability": p.get("durability", "N/A"),
                "materials": p.get("materials", []),
                "garment_type": p.get("garment_type", "unknown")
            } for p in products]
            
        return formatted 