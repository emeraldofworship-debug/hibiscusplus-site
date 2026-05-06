"""Seed the 3 signature tea blends as DB products. Idempotent."""
import asyncio
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

TEA_BLENDS = [
    {
        "id": "tea-metabo-ignite",
        "name": "Metabo Ignite",
        "category": "tea",
        "type": "tea",
        "price": "24.00",
        "image": "https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/bc8a711ee5074f915fe80696ea622a4ffa40d8ede2bb21500c2c86c015eb253c.png",
        "subtitle": "Metabolism Support",
        "description": "A precision blend that fires up metabolic rate. Catechins, ginger compounds and hibiscus anthocyanins support fat oxidation and thermogenesis.",
        "ingredients": ["Hibiscus", "Green Tea", "Ginger", "Cinnamon", "Clove"],
        "allergenInfo": "Naturally caffeine-bearing (green tea). Gluten-free.",
        "comingSoon": False,
    },
    {
        "id": "tea-bloom-flush",
        "name": "Bloom & Flush",
        "category": "tea",
        "type": "tea",
        "price": "24.00",
        "image": "https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/1d23b7c55108024ac2a29b010ba9e3dcb206d38e881c56b8d5dd494f75dfe741.png",
        "subtitle": "Digestive Detox",
        "description": "A gentle yet powerful digestive companion. Dandelion stimulates bile, fennel soothes bloating, peppermint relaxes the GI tract.",
        "ingredients": ["Hibiscus", "Dandelion", "Fennel", "Peppermint", "Ginger"],
        "allergenInfo": "Caffeine-free. Gluten-free.",
        "comingSoon": False,
    },
    {
        "id": "tea-glucose-guard",
        "name": "Glucose Guard",
        "category": "tea",
        "type": "tea",
        "price": "24.00",
        "image": "https://static.prod-images.emergentagent.com/jobs/a32939dc-1aea-4860-99bb-b62686aca83e/images/05553693a6931f0d2a90e1ad3563af96db340d1bdb4df1c5a66cebecb5cfb13b.png",
        "subtitle": "Crave Control",
        "description": "Engineered for blood sugar stability. Cinnamon improves insulin sensitivity, chicory provides prebiotic inulin, liquorice satisfies cravings.",
        "ingredients": ["Hibiscus", "Cinnamon", "Chicory", "Liquorice", "Clove"],
        "allergenInfo": "Caffeine-free. Gluten-free. Liquorice — consult GP if pregnant or hypertensive.",
        "comingSoon": False,
    },
]


async def seed():
    client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    inserted = updated = 0
    for tea in TEA_BLENDS:
        tea["created_at"] = datetime.now(timezone.utc).isoformat()
        existing = await db.products.find_one({"id": tea["id"]})
        if existing:
            await db.products.update_one({"id": tea["id"]}, {"$set": tea})
            updated += 1
        else:
            await db.products.insert_one(tea)
            inserted += 1
    print(f"Tea blends seed complete: {inserted} inserted, {updated} updated.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
