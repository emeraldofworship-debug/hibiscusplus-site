import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

async def optimise():
    """Replace w=800 with w=400 in all image URLs for faster thumbnail loading."""
    for collection_name in ['recipes', 'products', 'blog_posts']:
        coll = db[collection_name]
        cursor = coll.find({"image": {"$regex": "w=800"}}, {"_id": 0, "id": 1, "image": 1})
        count = 0
        async for doc in cursor:
            new_url = doc['image'].replace('w=800', 'w=400')
            await coll.update_one({"id": doc['id']}, {"$set": {"image": new_url}})
            count += 1
        print(f"  {collection_name}: optimised {count} image URLs")
    
    client.close()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(optimise())
