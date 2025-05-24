import json
from typing import Optional, Dict, Any
import redis
from loguru import logger

class CacheManager:
    def __init__(self, host='localhost', port=6379, db=0):
        try:
            self.redis = redis.Redis(host=host, port=port, db=db, decode_responses=True)
            self.expiry_time = 60 * 60 * 24  # 24 hours
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {str(e)}")
            self.redis = None

    async def get_cached_data(self, url: str) -> Optional[Dict[str, Any]]:
        """Retrieve cached data for a URL"""
        try:
            if not self.redis:
                return None
                
            data = self.redis.get(url)
            return json.loads(data) if data else None
        except Exception as e:
            logger.error(f"Error retrieving from cache: {str(e)}")
            return None

    async def cache_data(self, url: str, data: Dict[str, Any]) -> bool:
        """Cache data for a URL"""
        try:
            if not self.redis:
                return False
                
            self.redis.setex(
                url,
                self.expiry_time,
                json.dumps(data)
            )
            return True
        except Exception as e:
            logger.error(f"Error caching data: {str(e)}")
            return False

    async def invalidate(self, url: str) -> bool:
        """Invalidate cached data for a URL"""
        try:
            if not self.redis:
                return False
                
            self.redis.delete(url)
            return True
        except Exception as e:
            logger.error(f"Error invalidating cache: {str(e)}")
            return False
