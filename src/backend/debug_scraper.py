import sys
import asyncio
import aiohttp
from pathlib import Path
from bs4 import BeautifulSoup
from scrapers.generic_scraper import GenericScraper
import traceback
from playwright.async_api import async_playwright

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

async def fetch_with_http(url):
    """Try fetching with simple HTTP request first"""
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
        "Cache-Control": "max-age=0",
        "sec-ch-ua": '"Chromium";v="123", "Not(A:Brand";v="24", "Google Chrome";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "DNT": "1",
        "Referer": "https://www.google.com/",
        "Cookie": "bm_sz=YOUR_COOKIE_HERE"  # You might need to add a real cookie here
    }
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(url, headers=headers, allow_redirects=True) as response:
                if response.status == 200:
                    html = await response.text()
                    # Check if we got a redirect page
                    if "meta http-equiv=\"refresh\"" in html.lower():
                        log("Got redirect page, falling back to Playwright...")
                        raise Exception("Redirect detected")
                    return html
                else:
                    raise Exception(f"HTTP request failed: {response.status}")
        except Exception as e:
            log(f"HTTP request failed: {str(e)}")
            raise

async def fetch_with_playwright(url):
    """Fallback to Playwright if HTTP request fails"""
    browser = None
    context = None
    try:
        async with async_playwright() as p:
            # Simpler browser launch configuration
            browser = await p.chromium.launch(
                headless=False,
                args=['--no-sandbox']
            )
            
            # Create a persistent context
            context = await browser.new_context(
                viewport={'width': 1280, 'height': 800},
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
            )
            
            # Create a new page
            page = await context.new_page()
            
            # Navigate to the URL
            try:
                await page.goto(url, wait_until='domcontentloaded', timeout=30000)
                await asyncio.sleep(3)  # Wait for dynamic content
                
                # Get the page content
                content = await page.content()
                return content
                
            except Exception as e:
                log(f"Error during page navigation: {str(e)}")
                raise
                
    except Exception as e:
        log(f"Playwright error: {str(e)}")
        raise
    finally:
        # Clean up in finally block
        if context:
            try:
                await context.close()
            except:
                pass
        if browser:
            try:
                await browser.close()
            except:
                pass

async def fetch_page(url):
    """Try HTTP first, fall back to Playwright if needed"""
    try:
        log("Trying HTTP request first...")
        return await fetch_with_http(url)
    except Exception as e:
        log(f"HTTP request failed: {str(e)}")
        log("Falling back to Playwright...")
        try:
            return await fetch_with_playwright(url)
        except Exception as e:
            log(f"Playwright also failed: {str(e)}")
            raise

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