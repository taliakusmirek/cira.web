from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from bs4 import BeautifulSoup
import aiohttp
from fake_useragent import UserAgent
from loguru import logger
from retrying import retry
from playwright.async_api import async_playwright, TimeoutError
import asyncio
import sys
from pathlib import Path
import traceback

# Configure logger to print to stdout
logger.remove()  # Remove default handler
logger.add(sys.stdout, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>")

# Ensure logs directory exists
Path("logs").mkdir(exist_ok=True)

LOGFILE = "logs/scraper_debug.log"

def log(msg):
    print(msg)
    with open(LOGFILE, "a") as f:
        f.write(msg + "\n")

def log_exception(e):
    tb = traceback.format_exc()
    log(f"Exception: {e}\n{tb}")

class BaseScraper(ABC):
    def __init__(self):
        self.ua = UserAgent()

    @abstractmethod
    async def can_handle(self, url: str) -> bool:
        """Check if this scraper can handle the given URL"""
        pass

    @abstractmethod
    async def extract_data(self, soup: BeautifulSoup, url: str) -> Dict[str, Any]:
        """Extract product data from the soup object"""
        pass

    def get_headers(self) -> Dict[str, str]:
        """Get headers for the request using a real browser user agent"""
        return {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Cache-Control": "max-age=0"
        }

    @retry(stop_max_attempt_number=3, wait_exponential_multiplier=1000)
    async def fetch_page(self, url: str, proxy: Optional[str] = None) -> str:
        """Fetch page content with retry logic using Playwright"""
        print(f"\nStarting to fetch page: {url}")
        
        async with async_playwright() as p:
            # Launch browser with more realistic settings
            browser = await p.chromium.launch(
                headless=False,
                proxy={
                    "server": proxy
                } if proxy else None,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--disable-site-isolation-trials'
                ]
            )
            
            try:
                # Create new context with custom headers and viewport
                context = await browser.new_context(
                    user_agent=self.ua.random,
                    viewport={'width': 1920, 'height': 1080},
                    extra_http_headers=self.get_headers(),
                    locale='en-US',
                    timezone_id='America/New_York',
                    geolocation={'latitude': 40.7128, 'longitude': -74.0060},  # New York
                    permissions=['geolocation']
                )
                
                # Create new page
                page = await context.new_page()
                
                # Set default timeout
                page.set_default_timeout(120000)  # 120 seconds
                
                # Navigate to URL
                print(f"Navigating to {url}")
                try:
                    await page.goto(url, wait_until='networkidle', timeout=60000)
                except TimeoutError:
                    print("Network idle timeout, continuing anyway")
                
                # Wait for content to load
                print("Waiting for initial page load...")
                await page.wait_for_load_state('domcontentloaded')
                
                # Additional wait for dynamic content
                print("Waiting 5 seconds for dynamic content to load...")
                await asyncio.sleep(5)  # Give more time for dynamic content
                
                # Check if we're on a Zara page
                if "zara.com" in url.lower():
                    print("Detected Zara page, waiting for specific elements...")
                    try:
                        # Wait for common Zara elements
                        print("Waiting for product name...")
                        await page.wait_for_selector('h1[data-qa-label="product-name"]', timeout=10000)
                        print("Waiting for composition...")
                        await page.wait_for_selector('div[data-qa-label="composition"]', timeout=10000)
                        print("Waiting for price...")
                        await page.wait_for_selector('span[data-qa-label="price"]', timeout=10000)
                    except TimeoutError:
                        print("Some Zara elements not found, continuing anyway")
                
                # Wait another 5 seconds to ensure everything is loaded
                print("Waiting additional 5 seconds to ensure complete load...")
                await asyncio.sleep(5)
                
                # Get the final HTML
                html = await page.content()
                
                # Print the first part of the HTML for debugging
                print(f"\nPage HTML (first 1000 chars):\n{html[:1000]}")
                
                print(f"\nSuccessfully fetched page content for {url}")
                return html
                
            except Exception as e:
                print(f"Error fetching page with Playwright: {str(e)}")
                raise
            finally:
                await browser.close()

    def clean_text(self, text: str) -> str:
        """Clean extracted text"""
        if not text:
            return ""
        return " ".join(text.split())

async def fetch_page(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0"
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            if response.status == 200:
                return await response.text()
            else:
                raise Exception(f"Failed to fetch page: {response.status}")

async def main(url):
    scraper = GenericScraper()
    log(f"Fetching: {url}")
    try:
        html = await fetch_page(url)
        log(f"Fetched HTML length: {len(html)}")
    except Exception as e:
        log_exception(e)
        sys.exit(1)
    try:
        soup = BeautifulSoup(html, "lxml")
        data = await scraper.extract_data(soup, url)
        log(f"Extracted data: {data}")
    except Exception as e:
        log_exception(e)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python debug_scraper.py <product_url>")
        sys.exit(1)
    url = sys.argv[1]
    asyncio.run(main(url))
