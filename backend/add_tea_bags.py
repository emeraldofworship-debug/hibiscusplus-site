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

# Tea Bag Products
tea_bag_products = [
    {
        "id": "p7",
        "name": "Signature Zobo Tea Bags (Original)",
        "category": "Tea Bags",
        "price": 12.99,
        "description": "Pre-portioned authentic Nigerian Zobo with clove and ginger. 20 biodegradable tea bags. Perfect portions, no measuring needed!",
        "weight": "20 tea bags (40g)",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p8",
        "name": "Stress Relief Tea Bags",
        "category": "Tea Bags",
        "price": 11.99,
        "description": "Calming hibiscus, chamomile, and lavender blend. 20 tea bags for easy brewing. Perfect for bedtime relaxation.",
        "weight": "20 tea bags (35g)",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p9",
        "name": "Immunity Boost Tea Bags",
        "category": "Tea Bags",
        "price": 13.99,
        "description": "Powerful hibiscus, ginger, turmeric blend. 20 convenient tea bags. Vitamin C packed for cold season.",
        "weight": "20 tea bags (40g)",
        "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p10",
        "name": "Digestive Comfort Tea Bags",
        "category": "Tea Bags",
        "price": 11.99,
        "description": "Soothing hibiscus, mint, and fennel. 20 tea bags for after-meal comfort. Aids digestion naturally.",
        "weight": "20 tea bags (35g)",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p11",
        "name": "Heart Health Tea Bags",
        "category": "Tea Bags",
        "price": 14.99,
        "description": "Hibiscus rose blend for cardiovascular wellness. 20 tea bags. Antioxidant-rich, supports healthy blood pressure.",
        "weight": "20 tea bags (38g)",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p12",
        "name": "Sweet Dreams Tea Bags",
        "category": "Tea Bags",
        "price": 13.99,
        "description": "Hibiscus valerian sleep blend. 20 tea bags for restful nights. Natural sleep support without grogginess.",
        "weight": "20 tea bags (40g)",
        "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p13",
        "name": "Tropical Pineapple Zobo Tea Bags",
        "category": "Tea Bags",
        "price": 12.99,
        "description": "Refreshing hibiscus with pineapple and ginger. 20 tea bags. Tropical immunity booster, delicious hot or iced.",
        "weight": "20 tea bags (38g)",
        "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p14",
        "name": "Caramel Vanilla Zobo Tea Bags",
        "category": "Tea Bags",
        "price": 13.99,
        "description": "Indulgent dessert tea with natural caramel and vanilla. 20 tea bags. Satisfies sweet cravings healthily.",
        "weight": "20 tea bags (36g)",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p15",
        "name": "Wellness Variety Pack - Tea Bags",
        "category": "Tea Bags",
        "price": 34.99,
        "description": "Sample all our blends! Contains 3 tea bags each of 6 different blends (18 total). Perfect for trying new flavors.",
        "weight": "18 tea bags (mixed)",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p16",
        "name": "Signature Zobo Collection - Tea Bags",
        "category": "Tea Bags",
        "price": 38.99,
        "description": "All our Zobo varieties! Original, Tropical Pineapple, and Caramel Vanilla. 20 bags each (60 total). Save £2.98!",
        "weight": "60 tea bags (3 x 20)",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "p17",
        "name": "Monthly Wellness Box - Tea Bags",
        "category": "Tea Bags",
        "price": 42.99,
        "description": "One month supply! 80 tea bags total - all our popular blends. Perfect for daily wellness routine. Best value!",
        "weight": "80 tea bags (mixed)",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "in_stock": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def add_tea_bag_products():
    print("🍵 Adding tea bag products...")
    
    # Add tea bag products
    result = await db.products.insert_many(tea_bag_products)
    print(f"✅ Added {len(result.inserted_ids)} tea bag products:")
    for product in tea_bag_products:
        print(f"   • {product['name']} - £{product['price']}")
    
    # Get total count
    total_count = await db.products.count_documents({})
    print(f"\n📊 Total products in database: {total_count}")
    
    # Show category breakdown
    tea_bag_count = await db.products.count_documents({"category": "Tea Bags"})
    print(f"   - Tea Bags: {tea_bag_count}")
    
    print("\n🎉 All tea bag products added successfully!")
    print("\n💡 Product Benefits:")
    print("   • Pre-portioned - no measuring needed")
    print("   • Convenient for customers")
    print("   • Perfect for Manchester stalls")
    print("   • Great for gifts and samplers")
    print("   • Biodegradable packaging option")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(add_tea_bag_products())
