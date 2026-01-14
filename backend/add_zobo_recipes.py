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

# New Signature Recipes
new_recipes = [
    {
        "id": "7",
        "name": "Signature Nigerian Zobo (Original)",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "energy", "digestive health"],
        "ingredients": [
            "3 cups dried hibiscus flowers (zobo leaves)",
            "2 inches fresh ginger, sliced",
            "6-8 whole cloves",
            "1 cinnamon stick",
            "1/2 pineapple, chopped (optional for sweetness)",
            "6 cups water",
            "Honey or sugar to taste"
        ],
        "instructions": [
            "Rinse hibiscus flowers thoroughly in cold water",
            "In a large pot, add hibiscus, ginger, cloves, and cinnamon",
            "Add pineapple pieces if using for natural sweetness",
            "Pour water over ingredients and bring to boil",
            "Reduce heat and simmer for 20-25 minutes",
            "Remove from heat and let steep for additional 15 minutes",
            "Strain through fine mesh or cheesecloth",
            "Add sweetener to taste while still warm",
            "Chill in refrigerator and serve cold with ice"
        ],
        "benefits": "Traditional Nigerian wellness drink. Boosts immunity, aids digestion, natural energy boost, rich in antioxidants and vitamin C",
        "prep_time": "45 minutes",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "8",
        "name": "Caramel Vanilla Zobo Delight",
        "category": "Stress Relief",
        "ailments": ["stress relief", "comfort", "relaxation"],
        "ingredients": [
            "2 tsp dried hibiscus flowers",
            "1 tsp vanilla extract or 1 vanilla pod",
            "1 tsp caramel syrup (natural)",
            "1/2 tsp cinnamon powder",
            "1 tsp honey",
            "2 cups hot water",
            "Dash of cream (optional)"
        ],
        "instructions": [
            "Steep hibiscus in hot water for 5 minutes",
            "Add vanilla extract or split vanilla pod",
            "Stir in cinnamon powder",
            "Add caramel syrup and honey",
            "Steep for additional 3 minutes",
            "Strain and serve warm",
            "Top with cream for indulgent version",
            "Perfect as dessert tea"
        ],
        "benefits": "Comforting and indulgent while maintaining health benefits. Reduces stress, promotes relaxation, satisfies sweet cravings naturally",
        "prep_time": "10 minutes",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "9",
        "name": "Tropical Pineapple Zobo Splash",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "energy", "refreshing"],
        "ingredients": [
            "2 tsp dried hibiscus flowers",
            "1/2 cup fresh pineapple chunks",
            "1/2 tsp fresh ginger, grated",
            "1 tsp honey",
            "2 cups hot water",
            "Fresh mint leaves for garnish",
            "Lime wedge"
        ],
        "instructions": [
            "Muddle pineapple chunks in bottom of pitcher",
            "Add hibiscus flowers and grated ginger",
            "Pour hot water over mixture",
            "Steep for 8-10 minutes",
            "Strain thoroughly",
            "Add honey and stir well",
            "Chill and serve over ice",
            "Garnish with mint and lime wedge"
        ],
        "benefits": "Tropical immunity booster packed with vitamin C and bromelain. Aids digestion, anti-inflammatory, refreshing and energizing",
        "prep_time": "15 minutes",
        "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "10",
        "name": "Watermelon Lime Zobo Cooler",
        "category": "Heart Health",
        "ailments": ["heart health", "hydration", "refreshing"],
        "ingredients": [
            "2 tsp dried hibiscus flowers",
            "1 cup fresh watermelon, cubed",
            "Juice of 1 lime",
            "1/2 tsp fresh mint leaves",
            "1 tsp agave or honey",
            "2 cups water",
            "Ice cubes"
        ],
        "instructions": [
            "Blend watermelon until smooth, strain if desired",
            "Steep hibiscus in hot water for 5 minutes",
            "Mix steeped tea with watermelon juice",
            "Add fresh lime juice and mint",
            "Sweeten with agave or honey",
            "Refrigerate for 2 hours",
            "Serve over ice",
            "Perfect summer refreshment"
        ],
        "benefits": "Ultimate hydration drink. Supports heart health, rich in lycopene and antioxidants, refreshing and cooling",
        "prep_time": "10 minutes + 2 hours chill",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "11",
        "name": "Spiced Cinnamon Vanilla Zobo",
        "category": "Digestive Health",
        "ailments": ["digestive health", "warming", "comfort"],
        "ingredients": [
            "2 tsp dried hibiscus flowers",
            "2 cinnamon sticks",
            "1 tsp vanilla extract",
            "3-4 whole cloves",
            "1 star anise",
            "1 tsp honey",
            "2 cups hot water",
            "Cinnamon stick for garnish"
        ],
        "instructions": [
            "Combine hibiscus, cinnamon sticks, cloves, and star anise",
            "Pour hot water over spices",
            "Steep covered for 10 minutes",
            "Add vanilla extract",
            "Strain into cup",
            "Sweeten with honey",
            "Serve warm with cinnamon stick",
            "Perfect for cold evenings"
        ],
        "benefits": "Warming digestive aid. Regulates blood sugar, improves circulation, comforting and aromatic",
        "prep_time": "15 minutes",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "12",
        "name": "Citrus Lime Zing Zobo",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "detox", "energy"],
        "ingredients": [
            "2 tsp dried hibiscus flowers",
            "Juice of 2 limes",
            "1 tsp lime zest",
            "1/2 inch fresh ginger",
            "1 tsp honey or agave",
            "2 cups water",
            "Fresh lime slices",
            "Ice"
        ],
        "instructions": [
            "Steep hibiscus with ginger in hot water for 7 minutes",
            "Remove from heat and add lime zest",
            "Let cool slightly",
            "Add fresh lime juice",
            "Sweeten to taste",
            "Strain well",
            "Serve chilled over ice",
            "Garnish with lime slices"
        ],
        "benefits": "Powerful detox and immunity booster. High vitamin C content, aids digestion, alkalizing and refreshing",
        "prep_time": "12 minutes",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def add_new_recipes():
    print("🌺 Adding new signature Zobo recipes...")
    
    # Add new recipes
    result = await db.recipes.insert_many(new_recipes)
    print(f"✅ Added {len(result.inserted_ids)} new recipes:")
    for recipe in new_recipes:
        print(f"   • {recipe['name']}")
    
    # Get total count
    total_count = await db.recipes.count_documents({})
    print(f"\n📊 Total recipes in database: {total_count}")
    
    print("\n🎉 All new Zobo recipes added successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(add_new_recipes())
