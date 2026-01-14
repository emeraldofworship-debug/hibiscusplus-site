import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Allergen information for different product types
allergen_updates = {
    # Loose leaf and tea bags - general herbal blends
    "default_herbal": {
        "allergen_info": "May contain traces of nuts, celery, mustard. Produced in a facility that handles allergens.",
        "allergen_free": "Gluten-free, Dairy-free, Vegan",
        "warnings": "Consult healthcare provider if pregnant, nursing, or taking medications. Not suitable for children under 12."
    },
    
    # Products with specific ingredients
    "contains_nuts": {
        "allergen_info": "Contains nuts. May contain traces of celery, mustard. Produced in a facility that handles allergens.",
        "allergen_free": "Gluten-free, Dairy-free, Vegan",
        "warnings": "Contains nuts - not suitable for nut allergy sufferers. Consult healthcare provider if pregnant, nursing, or taking medications."
    },
    
    # Accessories - non-food items
    "accessories": {
        "allergen_info": "Non-food item. No allergens.",
        "allergen_free": "N/A",
        "warnings": "Hand wash recommended for longevity. Not suitable for microwave use."
    }
}

async def add_allergen_warnings():
    print("⚠️  Adding allergen warnings to all products...")
    
    # Update herbal tea products (loose leaf and tea bags)
    herbal_products = await db.products.find({
        "category": {"$in": ["Dried Herbs", "Tea Blends", "Tea Bags"]}
    }).to_list(100)
    
    for product in herbal_products:
        update_data = allergen_updates["default_herbal"].copy()
        
        # Check if product contains nuts
        if "cashew" in product["name"].lower() or "almond" in product["name"].lower():
            update_data = allergen_updates["contains_nuts"].copy()
        
        await db.products.update_one(
            {"id": product["id"]},
            {"$set": update_data}
        )
        print(f"   ✓ Updated: {product['name']}")
    
    # Update accessories
    accessory_products = await db.products.find({
        "category": "Accessories"
    }).to_list(100)
    
    for product in accessory_products:
        update_data = allergen_updates["accessories"].copy()
        
        await db.products.update_one(
            {"id": product["id"]},
            {"$set": update_data}
        )
        print(f"   ✓ Updated: {product['name']}")
    
    # Get total count
    total_count = await db.products.count_documents({})
    print(f"\n📊 Total products updated: {total_count}")
    
    print("\n✅ All products now have allergen information!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(add_allergen_warnings())
