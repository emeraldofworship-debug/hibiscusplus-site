from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from models.recipe import Recipe, RecipeCreate
from models.product import Product, ProductCreate
from models.blog import BlogPost, BlogPostCreate
from models.newsletter import NewsletterSubscriber, NewsletterSubscribe


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Welcome to HibiscusPlus API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============= RECIPES API =============

@api_router.get("/recipes", response_model=dict)
async def get_recipes(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    ailment: Optional[str] = Query(None)
):
    """Get all recipes with optional filtering"""
    try:
        query = {}
        
        if category:
            query["category"] = category
        
        if ailment:
            query["ailments"] = {"$in": [ailment.lower()]}
        
        if search:
            # Search in name and ingredients
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"ingredients": {"$regex": search, "$options": "i"}}
            ]
        
        recipes = await db.recipes.find(query).to_list(100)
        
        # Remove MongoDB _id field
        for recipe in recipes:
            recipe.pop('_id', None)
        
        return {
            "success": True,
            "data": recipes,
            "count": len(recipes)
        }
    except Exception as e:
        logger.error(f"Error fetching recipes: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching recipes")


@api_router.get("/recipes/{recipe_id}", response_model=dict)
async def get_recipe(recipe_id: str):
    """Get a single recipe by ID"""
    try:
        recipe = await db.recipes.find_one({"id": recipe_id})
        
        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")
        
        recipe.pop('_id', None)
        
        return {
            "success": True,
            "data": recipe
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching recipe: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching recipe")


# ============= PRODUCTS API =============

@api_router.get("/products", response_model=dict)
async def get_products(
    category: Optional[str] = Query(None),
    in_stock: Optional[bool] = Query(None)
):
    """Get all products with optional filtering"""
    try:
        query = {}
        
        if category:
            query["category"] = category
        
        if in_stock is not None:
            query["in_stock"] = in_stock
        
        products = await db.products.find(query).to_list(100)
        
        for product in products:
            product.pop('_id', None)
        
        return {
            "success": True,
            "data": products,
            "count": len(products)
        }
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching products")


@api_router.get("/products/{product_id}", response_model=dict)
async def get_product(product_id: str):
    """Get a single product by ID"""
    try:
        product = await db.products.find_one({"id": product_id})
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product.pop('_id', None)
        
        return {
            "success": True,
            "data": product
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching product: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching product")


# ============= BLOG API =============

@api_router.get("/blog", response_model=dict)
async def get_blog_posts(
    category: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=50),
    page: int = Query(1, ge=1)
):
    """Get all blog posts with pagination and filtering"""
    try:
        query = {}
        
        if category:
            query["category"] = category
        
        # Calculate pagination
        skip = (page - 1) * limit
        
        # Get total count for pagination
        total_count = await db.blog_posts.count_documents(query)
        total_pages = (total_count + limit - 1) // limit
        
        # Get blog posts
        blog_posts = await db.blog_posts.find(query).sort("date", -1).skip(skip).limit(limit).to_list(limit)
        
        for post in blog_posts:
            post.pop('_id', None)
            # Convert datetime to ISO string for JSON serialization
            if 'date' in post and isinstance(post['date'], datetime):
                post['date'] = post['date'].isoformat()
        
        return {
            "success": True,
            "data": blog_posts,
            "count": len(blog_posts),
            "total_count": total_count,
            "total_pages": total_pages,
            "current_page": page
        }
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching blog posts")


@api_router.get("/blog/{post_id}", response_model=dict)
async def get_blog_post(post_id: str):
    """Get a single blog post by ID"""
    try:
        post = await db.blog_posts.find_one({"id": post_id})
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        post.pop('_id', None)
        
        # Convert datetime to ISO string
        if 'date' in post and isinstance(post['date'], datetime):
            post['date'] = post['date'].isoformat()
        
        return {
            "success": True,
            "data": post
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching blog post")


# ============= NEWSLETTER API =============

@api_router.post("/newsletter/subscribe", response_model=dict)
async def subscribe_newsletter(subscriber: NewsletterSubscribe):
    """Subscribe to newsletter"""
    try:
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one({"email": subscriber.email})
        
        if existing:
            # Check if previously unsubscribed
            if not existing.get('is_active', False):
                # Reactivate subscription
                await db.newsletter_subscribers.update_one(
                    {"email": subscriber.email},
                    {"$set": {"is_active": True, "subscribed_at": datetime.utcnow()}}
                )
                return {
                    "success": True,
                    "message": "Welcome back! You've been resubscribed to our newsletter."
                }
            else:
                return {
                    "success": False,
                    "error": "Email already subscribed"
                }
        
        # Create new subscriber
        new_subscriber = NewsletterSubscriber(
            email=subscriber.email
        )
        
        await db.newsletter_subscribers.insert_one(new_subscriber.dict())
        
        return {
            "success": True,
            "message": "Successfully subscribed to newsletter"
        }
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Error subscribing to newsletter")


@api_router.get("/newsletter/subscribers", response_model=dict)
async def get_newsletter_subscribers():
    """Get all active newsletter subscribers (admin only in production)"""
    try:
        subscribers = await db.newsletter_subscribers.find({"is_active": True}).to_list(1000)
        
        for subscriber in subscribers:
            subscriber.pop('_id', None)
        
        return {
            "success": True,
            "data": subscribers,
            "count": len(subscribers)
        }
    except Exception as e:
        logger.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching subscribers")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

@app.get("/api/download/letterhead")
async def download_letterhead():
    filepath = "/app/assets/HibiscusPlus_Letterhead.pdf"
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Letterhead not found")
    return FileResponse(filepath, media_type="application/pdf", filename="HibiscusPlus_Letterhead.pdf")
