from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any, List
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from loguru import logger
import validators
from datetime import datetime
import sys
import traceback

from utils.scraper import scrape_page
from utils.scorer import ProductScorer
from utils.recommender import ProductRecommender

# Add utils directory to Python path
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

# Configure logging to print to stdout and file
logger.remove()  # Remove default handler
logger.add(sys.stdout, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>")
logger.add("logs/api.log", rotation="500 MB", retention="10 days", level="DEBUG")

# Initialize FastAPI app
app = FastAPI(title="CIRA Product Analyzer")

# Rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://cira-web.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProductURL(BaseModel):
    url: HttpUrl

class ErrorResponse(BaseModel):
    error: str
    timestamp: str
    traceback: Optional[str] = None

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    error_msg = f"HTTP Error {exc.status_code}: {str(exc.detail)}"
    logger.error(error_msg)
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=str(exc.detail),
            timestamp=datetime.utcnow().isoformat(),
            traceback=traceback.format_exc()
        ).dict()
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    error_msg = f"Unexpected error: {str(exc)}"
    logger.error(error_msg)
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error=str(exc),
            timestamp=datetime.utcnow().isoformat(),
            traceback=traceback.format_exc()
        ).dict()
    )

class AnalysisResponse(BaseModel):
    scores: Dict[str, Any]
    details: Dict[str, Any]
    recommendations: Optional[List[Dict[str, Any]]] = None

class RecommendationResponse(BaseModel):
    recommendations: List[Dict[str, Any]]
    original_product: Dict[str, Any]

@app.post("/analyze", response_model=AnalysisResponse)
@limiter.limit("5/minute")
async def analyze(request: Request, product: ProductURL):
    logger.info("="*50)
    logger.info("ANALYZE ENDPOINT CALLED")
    logger.info(f"Request URL: {product.url}")
    logger.info(f"Request headers: {request.headers}")
    
    try:
        # Log incoming request
        logger.info(f"Starting analysis for URL: {product.url}")
        
        # Validate URL
        if not validators.url(str(product.url)):
            logger.error(f"Invalid URL format: {product.url}")
            raise HTTPException(status_code=400, detail="Invalid URL format")
            
        # Scrape product data
        logger.info("Starting to scrape product data...")
        try:
            page_data = await scrape_page(str(product.url))
            logger.info(f"Successfully scraped data: {page_data}")
        except Exception as e:
            logger.error(f"Error during scraping: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=422, detail=f"Scraping failed: {str(e)}")
        
        if not page_data:
            logger.error("No data returned from scraper")
            raise HTTPException(status_code=422, detail="Unable to scrape product data")
            
        # Generate product analysis
        logger.info("Generating product analysis...")
        try:
            scorer = ProductScorer(page_data)
            analysis = scorer.generate_full_report()
            logger.info(f"Successfully generated analysis: {analysis}")
        except Exception as e:
            logger.error(f"Error during analysis: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
        
        # Log success with scores
        logger.info(f"Successfully analyzed {product.url}")
        logger.info(f"Scores: {analysis['scores']}")
        
        return analysis
        
    except Exception as e:
        # Log error with full traceback
        logger.error(f"Error analyzing {product.url}: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommendations", response_model=RecommendationResponse)
@limiter.limit("5/minute")
async def get_recommendations(request: Request, product: ProductURL):
    logger.info("="*50)
    logger.info("RECOMMENDATIONS ENDPOINT CALLED")
    logger.info(f"Request URL: {product.url}")
    logger.info(f"Request headers: {request.headers}")
    
    try:
        # Log incoming request
        logger.info(f"Getting recommendations for URL: {product.url}")
        
        # Validate URL
        if not validators.url(str(product.url)):
            logger.error(f"Invalid URL format: {product.url}")
            raise HTTPException(status_code=400, detail="Invalid URL format")
            
        # Scrape product data
        logger.info("Starting to scrape product data...")
        try:
            page_data = await scrape_page(str(product.url))
            logger.info(f"Successfully scraped data: {page_data}")
        except Exception as e:
            logger.error(f"Error during scraping: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=422, detail=f"Scraping failed: {str(e)}")
        
        if not page_data:
            logger.error("No data returned from scraper")
            raise HTTPException(status_code=422, detail="Unable to scrape product data")
            
        # Get recommendations
        logger.info("Generating recommendations...")
        try:
            recommender = ProductRecommender()
            recommendations = recommender.get_recommendations(page_data)
            formatted_recommendations = recommender.format_recommendations(recommendations)
            logger.info(f"Successfully generated recommendations: {len(formatted_recommendations)} items")
        except Exception as e:
            logger.error(f"Error during recommendation generation: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"Recommendation generation failed: {str(e)}")
        
        # Log success
        logger.info(f"Successfully generated recommendations for {product.url}")
        logger.info(f"Number of recommendations: {len(formatted_recommendations)}")
        
        return {
            "recommendations": formatted_recommendations,
            "original_product": page_data
        }
        
    except Exception as e:
        # Log error with full traceback
        logger.error(f"Error getting recommendations for {product.url}: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
