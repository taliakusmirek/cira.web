import random
from typing import Optional, List
import aiohttp
from fp.fp import FreeProxy
from loguru import logger

class ProxyManager:
    def __init__(self):
        self.proxies: List[str] = []
        self.current_index = 0
        self.refresh_threshold = 5  # Refresh list when we have 5 or fewer working proxies

    async def get_proxy(self) -> Optional[str]:
        """Get a working proxy from the pool"""
        if len(self.proxies) <= self.refresh_threshold:
            await self.refresh_proxies()
        
        if not self.proxies:
            return None
            
        proxy = self.proxies[self.current_index]
        self.current_index = (self.current_index + 1) % len(self.proxies)
        return proxy

    async def refresh_proxies(self):
        """Refresh the proxy pool with verified working proxies"""
        try:
            # Get new proxies
            raw_proxies = [
                FreeProxy(country_id=['US', 'CA'], timeout=1).get()
                for _ in range(10)
            ]
            
            # Verify each proxy works
            verified_proxies = []
            for proxy in raw_proxies:
                if await self.verify_proxy(proxy):
                    verified_proxies.append(proxy)
            
            self.proxies = verified_proxies
            logger.info(f"Refreshed proxy pool. Working proxies: {len(self.proxies)}")
        except Exception as e:
            logger.error(f"Error refreshing proxies: {str(e)}")

    async def verify_proxy(self, proxy: str) -> bool:
        """Verify if a proxy is working by testing it against a known site"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    'https://www.google.com',
                    proxy=proxy,
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    return response.status == 200
        except:
            return False
