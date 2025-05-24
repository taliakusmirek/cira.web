from scrapers.scraper_manager import ScraperManager
from loguru import logger

# Initialize scraper manager as a singleton
_scraper_manager = None

def get_scraper_manager():
    global _scraper_manager
    if _scraper_manager is None:
        _scraper_manager = ScraperManager()
    return _scraper_manager

async def scrape_page(url: str):
    """
    Scrape product information from a given URL.
    
    Args:
        url (str): The product URL to scrape
        
    Returns:
        dict: Product information containing materials, price, and brand
        
    Raises:
        Exception: If scraping fails
    """
    try:
        manager = get_scraper_manager()
        return await manager.scrape_product(url)
    except Exception as e:
        logger.error(f"Failed to scrape {url}: {str(e)}")
        raise
