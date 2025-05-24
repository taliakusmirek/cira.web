from typing import List, Type, Dict, Any
from bs4 import BeautifulSoup
from loguru import logger

from .base_scraper import BaseScraper
from .generic_scraper import GenericScraper
from utils.proxy_manager import ProxyManager
from utils.cache_manager import CacheManager

class ScraperManager:
    def __init__(self):
        self.scrapers: List[BaseScraper] = [
            GenericScraper()  # Single generic scraper for all sites
        ]
        self.proxy_manager = ProxyManager()
        self.cache_manager = CacheManager()

    async def scrape_product(self, url: str) -> Dict[str, Any]:
        """Main method to scrape product data"""
        try:
            # Check cache first
            cached_data = await self.cache_manager.get_cached_data(url)
            if cached_data:
                logger.info(f"Retrieved cached data for {url}")
                return cached_data

            # Get a proxy
            proxy = await self.proxy_manager.get_proxy()
            
            # Use generic scraper
            scraper = self.scrapers[0]
            
            # Fetch and parse page
            html = await scraper.fetch_page(url, proxy)
            soup = BeautifulSoup(html, 'lxml')
            
            # Extract data
            data = await scraper.extract_data(soup, url)
            
            # Cache the results
            await self.cache_manager.cache_data(url, data)
            
            return data

        except Exception as e:
            logger.error(f"Error scraping {url}: {str(e)}")
            raise
