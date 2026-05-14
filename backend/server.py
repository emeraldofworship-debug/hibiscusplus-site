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
from models.admin import LoginRequest, AdminUserPublic, TokenResponse
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    admin_dependency,
    check_lockout,
    record_failed_attempt,
    clear_attempts,
)
from fastapi import Depends, Request
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionRequest,
)
from notifications import notify, order_paid_html, feedback_html, newsletter_html

UK_SHIPPING_FLAT = 4.50
UK_SHIPPING_FREE_THRESHOLD = 40.00


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
        try:
            await notify(
                db, kind="newsletter.subscribed",
                title=f"New subscriber — {subscriber.email}",
                body=f"{subscriber.email} subscribed to the newsletter.",
                html=newsletter_html(str(subscriber.email), getattr(subscriber, 'interest', '') or ''),
                to_email=None, also_email_admin=True,
                metadata={"email": str(subscriber.email)},
            )
        except Exception as e:
            logger.warning(f"newsletter notification failed: {e}")
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

# Include the router in the main app — moved to bottom of file after admin routes are defined
# (the explicit include below at the end of the file is what mounts everything).

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

@app.post("/api/feedback")
async def submit_feedback(feedback: dict):
    from datetime import datetime, timezone
    feedback["submitted_at"] = datetime.now(timezone.utc).isoformat()
    await db.feedback.insert_one(feedback)
    return {"status": "success", "message": "Feedback received"}

@app.get("/api/feedback")
async def get_feedback():
    feedbacks = await db.feedback.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(100)
    return {"count": len(feedbacks), "data": feedbacks}


# ============= ADMIN AUTH & CRUD =============

# FastAPI dependency that resolves the current admin from the bearer token.
get_current_admin = admin_dependency(lambda: db)


@app.on_event("startup")
async def seed_admin_user():
    """Idempotent admin seed. Creates the admin if missing; updates the password
    hash if ADMIN_PASSWORD has been changed in .env."""
    admin_email = os.environ.get("ADMIN_EMAIL")
    admin_password = os.environ.get("ADMIN_PASSWORD")
    if not admin_email or not admin_password:
        logger.warning("ADMIN_EMAIL or ADMIN_PASSWORD missing — skipping admin seed")
        return
    admin_email = admin_email.lower().strip()
    existing = await db.admin_users.find_one({"email": admin_email})
    if not existing:
        await db.admin_users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "HibiscusPlus Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin user: {admin_email}")
    else:
        # Defensive: handle legacy docs that may have used a different field name
        # (e.g. "hashed_password" from earlier seed scripts) or be missing the hash.
        stored_hash = existing.get("password_hash") or existing.get("hashed_password")
        if not stored_hash or not verify_password(admin_password, stored_hash):
            await db.admin_users.update_one(
                {"email": admin_email},
                {
                    "$set": {"password_hash": hash_password(admin_password)},
                    "$unset": {"hashed_password": ""},
                },
            )
            logger.info(f"Updated admin password hash for: {admin_email}")


@api_router.post("/admin/login", response_model=TokenResponse)
async def admin_login(payload: LoginRequest, request: Request):
    """Admin login. Returns JWT bearer token + sanitised user object."""
    email = payload.email.lower().strip()
    # Honour X-Forwarded-For (left-most public IP) when behind a proxy/ingress;
    # fall back to the direct client. Without this the brute-force counter is
    # split across rotating ingress pods.
    fwd = request.headers.get("x-forwarded-for", "")
    ip = (fwd.split(",")[0].strip() if fwd else None) or (request.client.host if request.client else "unknown")

    check_lockout(ip, email)

    user = await db.admin_users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        record_failed_attempt(ip, email)
        raise HTTPException(status_code=401, detail="Invalid email or password")

    clear_attempts(ip, email)
    token = create_access_token(email)
    user.pop("_id", None)
    user.pop("password_hash", None)
    return TokenResponse(access_token=token, user=AdminUserPublic(**user))


@api_router.get("/admin/me", response_model=AdminUserPublic)
async def admin_me(current=Depends(get_current_admin)):
    return AdminUserPublic(**current)


# ----- Admin CRUD: Recipes -----

@api_router.post("/admin/recipes", response_model=dict)
async def admin_create_recipe(recipe: dict, current=Depends(get_current_admin)):
    if not recipe.get("id"):
        recipe["id"] = str(uuid.uuid4())
    recipe["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.recipes.insert_one(recipe)
    recipe.pop("_id", None)
    return {"success": True, "data": recipe}


@api_router.put("/admin/recipes/{recipe_id}", response_model=dict)
async def admin_update_recipe(recipe_id: str, updates: dict, current=Depends(get_current_admin)):
    updates.pop("_id", None)
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.recipes.update_one({"id": recipe_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Recipe not found")
    recipe = await db.recipes.find_one({"id": recipe_id}, {"_id": 0})
    return {"success": True, "data": recipe}


@api_router.delete("/admin/recipes/{recipe_id}", response_model=dict)
async def admin_delete_recipe(recipe_id: str, current=Depends(get_current_admin)):
    result = await db.recipes.delete_one({"id": recipe_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"success": True, "deleted": recipe_id}


# ----- Admin CRUD: Products -----

@api_router.post("/admin/products", response_model=dict)
async def admin_create_product(product: dict, current=Depends(get_current_admin)):
    if not product.get("id"):
        product["id"] = str(uuid.uuid4())
    product["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.products.insert_one(product)
    product.pop("_id", None)
    return {"success": True, "data": product}


@api_router.put("/admin/products/{product_id}", response_model=dict)
async def admin_update_product(product_id: str, updates: dict, current=Depends(get_current_admin)):
    updates.pop("_id", None)
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.products.update_one({"id": product_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    return {"success": True, "data": product}


@api_router.delete("/admin/products/{product_id}", response_model=dict)
async def admin_delete_product(product_id: str, current=Depends(get_current_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"success": True, "deleted": product_id}


# ----- Admin CRUD: Blog -----

@api_router.post("/admin/blog", response_model=dict)
async def admin_create_blog(post: dict, current=Depends(get_current_admin)):
    if not post.get("id"):
        post["id"] = str(uuid.uuid4())
    post["created_at"] = datetime.now(timezone.utc).isoformat()
    if not post.get("date"):
        post["date"] = post["created_at"]
    await db.blog_posts.insert_one(post)
    post.pop("_id", None)
    return {"success": True, "data": post}


@api_router.put("/admin/blog/{post_id}", response_model=dict)
async def admin_update_blog(post_id: str, updates: dict, current=Depends(get_current_admin)):
    updates.pop("_id", None)
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if isinstance(post.get("date"), datetime):
        post["date"] = post["date"].isoformat()
    return {"success": True, "data": post}


@api_router.delete("/admin/blog/{post_id}", response_model=dict)
async def admin_delete_blog(post_id: str, current=Depends(get_current_admin)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"success": True, "deleted": post_id}


@api_router.get("/admin/stats", response_model=dict)
async def admin_stats(current=Depends(get_current_admin)):
    """Quick counts for the admin dashboard."""
    return {
        "recipes": await db.recipes.count_documents({}),
        "products": await db.products.count_documents({}),
        "blog_posts": await db.blog_posts.count_documents({}),
        "newsletter_subscribers": await db.newsletter_subscribers.count_documents({"is_active": True}),
        "feedback": await db.feedback.count_documents({}),
    }


# ----- Admin: Subscribers & Feedback viewers -----

@api_router.get("/admin/subscribers", response_model=dict)
async def admin_list_subscribers(current=Depends(get_current_admin)):
    """All newsletter subscribers (active + unsubscribed). Sorted newest first."""
    subs = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(2000)
    for s in subs:
        if isinstance(s.get("subscribed_at"), datetime):
            s["subscribed_at"] = s["subscribed_at"].isoformat()
    return {"success": True, "data": subs, "count": len(subs)}


@api_router.get("/admin/feedback", response_model=dict)
async def admin_list_feedback(current=Depends(get_current_admin)):
    """All feedback submissions, newest first."""
    items = await db.feedback.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(2000)
    return {"success": True, "data": items, "count": len(items)}


# ----- Admin: Self password change -----

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str


@api_router.post("/admin/change-password", response_model=dict)
async def admin_change_password(payload: PasswordChangeRequest, current=Depends(get_current_admin)):
    """Self-service password change for the logged-in admin."""
    if len(payload.new_password) < 8:
        raise HTTPException(status_code=400, detail="New password must be at least 8 characters.")
    user = await db.admin_users.find_one({"email": current["email"]})
    if not user or not verify_password(payload.current_password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect.")
    await db.admin_users.update_one(
        {"email": current["email"]},
        {"$set": {"password_hash": hash_password(payload.new_password)}}
    )
    return {"success": True, "message": "Password updated. You'll stay signed in for the rest of this session."}


# Re-include router so the new admin routes are mounted (idempotent in FastAPI).


# ============= SETTINGS / BRANDING =============

DEFAULT_LOGO = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/eei6kk0o_HibiscuPlus_20260227_093727_0000%20%283%29%20%281%29.png"


@api_router.get("/settings/branding", response_model=dict)
async def get_branding():
    """Public endpoint — returns the active logo URL (overridden via admin)."""
    doc = await db.settings.find_one({"key": "branding"}, {"_id": 0})
    if not doc:
        return {"logo_url": DEFAULT_LOGO}
    return {"logo_url": doc.get("logo_url") or DEFAULT_LOGO}


@api_router.put("/admin/settings/branding", response_model=dict)
async def update_branding(payload: dict, current=Depends(get_current_admin)):
    """Admin-only — update logo URL."""
    logo_url = (payload.get("logo_url") or "").strip()
    if not logo_url:
        raise HTTPException(status_code=400, detail="logo_url is required")
    if not (logo_url.startswith("http://") or logo_url.startswith("https://")):
        raise HTTPException(status_code=400, detail="logo_url must be an http(s) URL")
    await db.settings.update_one(
        {"key": "branding"},
        {"$set": {"key": "branding", "logo_url": logo_url, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"success": True, "logo_url": logo_url}


# ============= STRIPE CHECKOUT =============

@api_router.post("/checkout/session", response_model=dict)
async def create_checkout_session(payload: dict, request: Request):
    """Create a Stripe Checkout session for one or more cart items.

    Frontend sends:
        {
          items: [{product_id, quantity}],
          origin_url: str,
          delivery: {method: 'pickup' | 'ship' | 'ticket',
                     address?: {name, line1, line2?, city, postcode, phone?, email?}}
        }
    Server is the source of truth for pricing — it looks up each product in
    MongoDB, computes the subtotal, and adds shipping when applicable.
    """
    items = payload.get("items") or []
    origin_url = (payload.get("origin_url") or "").rstrip("/")
    delivery = payload.get("delivery") or {"method": "pickup"}
    if not items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    if not origin_url:
        raise HTTPException(status_code=400, detail="origin_url is required")

    method = delivery.get("method", "pickup")
    if method not in ("pickup", "ship", "ticket"):
        raise HTTPException(status_code=400, detail="Invalid delivery method")

    address = delivery.get("address") or {}
    if method == "ship":
        required = ["name", "line1", "city", "postcode", "email"]
        missing = [k for k in required if not address.get(k)]
        if missing:
            raise HTTPException(status_code=400, detail=f"Missing shipping fields: {', '.join(missing)}")

    subtotal = 0.0
    line_metadata = []
    has_perishable = False
    for item in items:
        pid = item.get("product_id")
        qty = max(1, int(item.get("quantity", 1)))
        product = await db.products.find_one({"id": pid})
        if not product:
            raise HTTPException(status_code=400, detail=f"Product not found: {pid}")
        if product.get("comingSoon"):
            raise HTTPException(status_code=400, detail=f"{product.get('name')} is not yet purchasable")
        raw = product.get("price")
        try:
            price = float(str(raw).replace("£", "").replace("$", "").replace(",", "").strip())
        except (TypeError, ValueError):
            raise HTTPException(status_code=400, detail=f"Invalid price for {product.get('name')}")
        subtotal += price * qty
        if product.get("type") == "snack":
            has_perishable = True
        line_metadata.append({"id": pid, "name": product.get("name"), "qty": qty, "unit_price": price, "type": product.get("type")})

    # If the cart has any perishable snacks, we override 'ship' to 'pickup' for safety.
    if has_perishable and method == "ship":
        raise HTTPException(status_code=400, detail="Snacks are collection-only — fresh items can't be posted. Switch to pickup, or remove snacks to enable shipping.")

    shipping_amount = 0.0
    if method == "ship" and subtotal < UK_SHIPPING_FREE_THRESHOLD:
        shipping_amount = UK_SHIPPING_FLAT

    total = round(subtotal + shipping_amount, 2)
    if total <= 0:
        raise HTTPException(status_code=400, detail="Total must be greater than 0")

    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    success_url = f"{origin_url}/shop/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/shop"

    metadata = {
        "source": "hibiscusplus_shop",
        "delivery_method": method,
        "item_count": str(sum(i["qty"] for i in line_metadata)),
        "items_summary": ", ".join(f"{m['qty']}x {m['name']}" for m in line_metadata)[:480],
        "shipping": f"{shipping_amount:.2f}",
        "subtotal": f"{subtotal:.2f}",
    }
    if address.get("email"):
        metadata["customer_email"] = address["email"][:120]
    if address.get("name"):
        metadata["customer_name"] = address["name"][:120]

    session = await stripe_checkout.create_checkout_session(
        CheckoutSessionRequest(
            amount=total,
            currency="gbp",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
        )
    )

    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "amount": total,
        "subtotal": round(subtotal, 2),
        "shipping_amount": shipping_amount,
        "currency": "gbp",
        "items": line_metadata,
        "delivery": {"method": method, "address": address if method == "ship" else {}},
        "metadata": metadata,
        "payment_status": "initiated",
        "status": "open",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    return {
        "url": session.url,
        "session_id": session.session_id,
        "amount": total,
        "subtotal": round(subtotal, 2),
        "shipping_amount": shipping_amount,
        "currency": "gbp",
    }


@api_router.get("/checkout/status/{session_id}", response_model=dict)
async def get_checkout_status(session_id: str, request: Request):
    """Poll the status of a checkout session and update the local transaction
    record idempotently. Idempotency: if already 'paid' in DB, do not re-process."""
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    txn = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")

    # Idempotent: already finalised → return as-is
    if txn.get("payment_status") in ("paid", "expired", "failed"):
        return {**txn, "already_finalised": True}

    status = await stripe_checkout.get_checkout_status(session_id)

    update = {
        "status": status.status,
        "payment_status": status.payment_status,
        "stripe_amount_total": status.amount_total,
        "stripe_currency": status.currency,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payment_transactions.update_one({"session_id": session_id}, {"$set": update})

    # Fire order-paid notification once, on the transition into 'paid'.
    if status.payment_status == "paid" and txn.get("payment_status") != "paid":
        latest = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        try:
            customer_email = (latest.get("metadata") or {}).get("customer_email") or (latest.get("delivery", {}).get("address") or {}).get("email")
            customer_name = (latest.get("metadata") or {}).get("customer_name") or (latest.get("delivery", {}).get("address") or {}).get("name") or ""
            await notify(
                db,
                kind="order.paid",
                title=f"Order paid — £{latest.get('amount',0):.2f}",
                body=f"Order {session_id} paid. Items: {(latest.get('metadata') or {}).get('items_summary','')}",
                html=order_paid_html(latest, customer_name=customer_name),
                to_email=customer_email,
                also_email_admin=True,
                metadata={"session_id": session_id, "amount": latest.get("amount")},
            )
        except Exception as e:
            logger.warning(f"order-paid notification failed: {e}")

    return {
        "session_id": session_id,
        "status": status.status,
        "payment_status": status.payment_status,
        "amount_total": status.amount_total,
        "currency": status.currency,
        "metadata": status.metadata,
        "items": txn.get("items", []),
    }


@app.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    """Stripe webhook handler. Idempotent — only processes a session once."""
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    body = await request.body()
    signature = request.headers.get("Stripe-Signature", "")
    try:
        event = await stripe_checkout.handle_webhook(body, signature)
    except Exception as e:
        logger.error(f"Stripe webhook verification failed: {e}")
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    txn = await db.payment_transactions.find_one({"session_id": event.session_id})
    if txn and txn.get("payment_status") not in ("paid", "expired", "failed"):
        await db.payment_transactions.update_one(
            {"session_id": event.session_id},
            {"$set": {
                "payment_status": event.payment_status,
                "webhook_event_id": event.event_id,
                "webhook_event_type": event.event_type,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }}
        )

    return {"received": True}


@api_router.get("/admin/orders", response_model=dict)
async def admin_list_orders(current=Depends(get_current_admin)):
    """All payment transactions for the admin orders viewer."""
    txns = await db.payment_transactions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"success": True, "data": txns, "count": len(txns)}


@api_router.get("/admin/notifications", response_model=dict)
async def admin_list_notifications(current=Depends(get_current_admin)):
    """All notifications, newest first. Used by /admin/notifications page."""
    items = await db.notifications.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"success": True, "data": items, "count": len(items)}


# Re-include router so the new admin routes are mounted (idempotent in FastAPI).
app.include_router(api_router)

