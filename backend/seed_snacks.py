"""Seed Nigerian snacks into the products collection. Idempotent."""
import asyncio
import os
import uuid
from datetime import datetime, timezone
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

SNACKS = [
    {"id": "snack-puff-puff", "name": "Puff Puff (Box of 12)", "category": "snack",
     "price": "8.50", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/pb4mbq6e_20260305_153012%20%281%29.png",
     "description": "Pillowy fried dough — golden, slightly sweet, perfectly addictive. Box of 12 freshly fried on collection day.",
     "ingredients": ["Wheat flour", "Yeast", "Sugar", "Nutmeg", "Sunflower oil"],
     "allergenInfo": "Contains gluten. Made in a kitchen that handles dairy, eggs, soy.",
     "comingSoon": False, "type": "snack"},
    {"id": "snack-akara", "name": "Akara (Box of 10)", "category": "snack",
     "price": "9.00", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/13mt3q4c_007.jpg",
     "description": "Crispy black-eyed bean fritters with onion, scotch bonnet, and a whisper of crayfish. Grandma-approved.",
     "ingredients": ["Black-eyed beans", "Onion", "Scotch bonnet", "Salt", "Sunflower oil"],
     "allergenInfo": "Contains crustaceans. May contain traces of gluten.",
     "comingSoon": False, "type": "snack"},
    {"id": "snack-samosa", "name": "Nigerian Samosa (Box of 8)", "category": "snack",
     "price": "10.00", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/13mt3q4c_007.jpg",
     "description": "Crisp pastry triangles filled with spiced minced beef. Dangerously moreish.",
     "ingredients": ["Wheat flour", "Beef", "Onion", "Curry spice", "Ginger", "Garlic"],
     "allergenInfo": "Contains gluten and beef. Halal beef sourced locally.",
     "comingSoon": False, "type": "snack"},
    {"id": "snack-spring-rolls", "name": "Spring Rolls (Box of 10)", "category": "snack",
     "price": "9.50", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/13mt3q4c_007.jpg",
     "description": "Crunchy, fresh, gone in seconds. Vegetable filling with carrot, cabbage and a hint of ginger.",
     "ingredients": ["Wheat flour", "Carrot", "Cabbage", "Ginger", "Soy sauce"],
     "allergenInfo": "Contains gluten and soy.",
     "comingSoon": False, "type": "snack"},
    {"id": "snack-platter", "name": "The Full Spread Platter (Serves 4)", "category": "snack",
     "price": "32.00", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/13mt3q4c_007.jpg",
     "description": "8 puff puff, 6 akara, 4 samosa, 6 spring rolls — plus a complimentary 500ml bottle of cold-pressed Zobo. Perfect for sharing.",
     "ingredients": ["See individual items"],
     "allergenInfo": "Contains gluten, beef, crustaceans, soy. Halal beef.",
     "comingSoon": False, "type": "snack"},
    {"id": "event-breakfast-tasting", "name": "Nigerian Breakfast Tasting — Manchester", "category": "event",
     "price": "25.00", "image": "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/hud47goh_008.jpg",
     "description": "Per-person ticket. Sit-down breakfast experience: koko, akara, puff puff, and hot Zobo. Date confirmed via email.",
     "ingredients": [],
     "allergenInfo": "Allergens disclosed at the event.",
     "comingSoon": False, "type": "event"},
]


async def seed():
    client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    inserted = updated = 0
    for snack in SNACKS:
        snack["created_at"] = datetime.now(timezone.utc).isoformat()
        existing = await db.products.find_one({"id": snack["id"]})
        if existing:
            await db.products.update_one({"id": snack["id"]}, {"$set": snack})
            updated += 1
        else:
            await db.products.insert_one(snack)
            inserted += 1
    print(f"Snacks seed complete: {inserted} inserted, {updated} updated.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
