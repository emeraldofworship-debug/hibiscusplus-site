import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Fresh, distinct images for the 6 signature recipes
image_updates = {
    "7": "https://images.unsplash.com/photo-1765118527329-6ed7fa0d10ac?w=800",   # Glass mug with red beverage and cinnamon
    "8": "https://images.unsplash.com/photo-1630209712184-00101e51f374?w=800",     # Red flower in clear glass mug (delicate/comfort)
    "9": "https://images.unsplash.com/photo-1594136579292-d98588fe6429?w=800",     # Red liquid in clear glass (tropical)
    "10": "https://images.unsplash.com/photo-1603028769333-009800f4e059?w=800",    # Red liquid on wooden table (beetroot/lime)
    "11": "https://images.unsplash.com/photo-1737911803280-17028410f957?w=800",    # Glass cup of tea on table (spiced)
    "12": "https://images.unsplash.com/photo-1749314375634-8411aa3e43ff?w=800",    # Red cocktail with lime (citrus zing)
}

async def update_images():
    print("Updating recipe images...")
    for recipe_id, image_url in image_updates.items():
        result = await db.recipes.update_one(
            {"id": recipe_id},
            {"$set": {"image": image_url}}
        )
        print(f"  Recipe {recipe_id}: {'Updated' if result.modified_count > 0 else 'No change'}")
    print("Done!")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_images())
