import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Refined recipes with research-backed health benefits and beetroot inclusion
refined_recipes = [
    {
        "id": "7",
        "name": "Original Hibiscus Wellness Zobo",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "heart health", "digestive health", "blood pressure"],
        "ingredients": [
            "3 cups dried hibiscus flowers (zobo leaves)",
            "2 inches fresh ginger, sliced",
            "6-8 whole cloves",
            "1 cinnamon stick",
            "1 tbsp beetroot powder (or 1 small fresh beetroot, grated)",
            "6 cups water",
            "Honey or agave to taste"
        ],
        "instructions": [
            "Rinse hibiscus flowers thoroughly in cold water",
            "In a large pot, combine hibiscus, ginger, cloves, and cinnamon",
            "Add beetroot powder or grated beetroot to the pot",
            "Pour water over ingredients and bring to a rolling boil",
            "Reduce heat and simmer for 20-25 minutes until deeply coloured",
            "Remove from heat and let steep for an additional 15 minutes",
            "Strain through fine mesh sieve or cheesecloth",
            "Sweeten to taste while still warm",
            "Serve warm or chill in refrigerator and serve cold over ice"
        ],
        "benefits": "A powerhouse wellness blend backed by science. Hibiscus anthocyanins (delphinidin and cyanidin) provide potent antioxidant protection and clinical studies show 2-3 cups daily can reduce systolic blood pressure by 7-13 mmHg. Ginger adds anti-inflammatory gingerols, cloves deliver eugenol for antimicrobial defence, and cinnamon supports healthy blood sugar levels. Beetroot contributes dietary nitrates that convert to nitric oxide, further supporting cardiovascular health and improving blood flow.",
        "prepTime": "45 minutes",
        "prep_time": "45 minutes",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "8",
        "name": "Vanilla Comfort Zobo",
        "category": "Stress Relief",
        "ailments": ["stress relief", "anxiety", "relaxation", "comfort"],
        "ingredients": [
            "2 tbsp dried hibiscus flowers",
            "1 cinnamon stick",
            "1 tsp pure vanilla extract (or 1/2 vanilla pod, split)",
            "1/2 tsp ground cinnamon",
            "1 tsp raw honey or maple syrup",
            "2 cups hot water (not boiling, around 90C)"
        ],
        "instructions": [
            "Heat water to about 90C (just before boiling) to preserve delicate flavours",
            "Add hibiscus flowers and cinnamon stick to a teapot or infuser",
            "Pour hot water over the blend and steep for 5-6 minutes",
            "Add vanilla extract or split vanilla pod and stir gently",
            "Steep for an additional 2-3 minutes covered",
            "Strain into your favourite mug",
            "Sweeten with honey or maple syrup to taste",
            "Enjoy warm as an evening ritual to unwind"
        ],
        "benefits": "A soothing, aromatic blend designed for relaxation. Hibiscus is rich in flavonoids and phenolic acids that combat oxidative stress, which is linked to elevated cortisol (the stress hormone). Cinnamon contains cinnamaldehyde, shown to have anti-inflammatory properties that promote calm. Vanilla has been traditionally used in aromatherapy for its comforting, mood-enhancing scent. The ritual of warm tea drinking itself activates the parasympathetic nervous system, promoting rest and recovery.",
        "prepTime": "10 minutes",
        "prep_time": "10 minutes",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "9",
        "name": "Tropical Ginger Pineapple Zobo",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "anti-inflammatory", "energy", "digestive health"],
        "ingredients": [
            "2 tbsp dried hibiscus flowers",
            "1/2 cup fresh pineapple chunks",
            "1 inch fresh ginger, sliced",
            "1 tsp beetroot powder",
            "1 tsp raw honey",
            "2 cups hot water",
            "Fresh mint leaves for garnish",
            "Lime wedge for serving"
        ],
        "instructions": [
            "Lightly muddle pineapple chunks in the bottom of a heatproof jug",
            "Add hibiscus flowers, sliced ginger, and beetroot powder",
            "Pour hot water over the mixture and stir gently",
            "Steep covered for 8-10 minutes for full extraction",
            "Strain thoroughly through a fine mesh sieve",
            "Add honey while still warm and stir until dissolved",
            "Chill in refrigerator for at least 1 hour",
            "Serve over ice, garnished with fresh mint and a lime wedge"
        ],
        "benefits": "A tropical immunity powerhouse. Pineapple provides bromelain, a natural enzyme with proven anti-inflammatory and digestive benefits, along with a high dose of vitamin C (79mg per cup). Ginger contains gingerols and shogaols which reduce inflammation and support immune cell function. Hibiscus adds anthocyanin antioxidants. Beetroot powder contributes dietary nitrates for improved circulation and oxygen delivery to cells, enhancing overall vitality.",
        "prepTime": "15 minutes + 1 hour chill",
        "prep_time": "15 minutes + 1 hour chill",
        "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "10",
        "name": "Beetroot Lime Zobo Reviver",
        "category": "Heart Health",
        "ailments": ["heart health", "blood pressure", "hydration", "detox", "energy"],
        "ingredients": [
            "2 tbsp dried hibiscus flowers",
            "1 tbsp beetroot powder (or 1 small beetroot, finely grated)",
            "Juice of 2 fresh limes",
            "1 tsp lime zest",
            "1/2 inch fresh ginger, grated",
            "1 tsp agave nectar or honey",
            "2 cups water",
            "Pinch of sea salt",
            "Ice cubes and lime slices for serving"
        ],
        "instructions": [
            "Bring water to a boil, then remove from heat",
            "Add hibiscus flowers, beetroot powder, and grated ginger",
            "Steep covered for 10 minutes for a deep, rich extraction",
            "Strain through a fine sieve into a jug",
            "Add fresh lime juice, lime zest, and a pinch of sea salt",
            "Sweeten with agave or honey to taste",
            "Refrigerate for at least 2 hours for best flavour",
            "Serve over ice with fresh lime slices"
        ],
        "benefits": "A heart health supercharger, replacing watermelon with beetroot for superior shelf-stability and concentrated benefits. Beetroot is one of the richest dietary sources of nitrates, which the body converts to nitric oxide — a molecule that relaxes blood vessels and improves blood flow. Studies show beetroot supplementation can increase nitric oxide levels by 21% within 45 minutes. Combined with hibiscus (clinically proven to reduce systolic blood pressure by 7-13 mmHg), this blend delivers a double cardiovascular benefit. Lime adds vitamin C for enhanced iron absorption and immune support. The sea salt provides essential electrolytes for proper hydration.",
        "prepTime": "15 minutes + 2 hours chill",
        "prep_time": "15 minutes + 2 hours chill",
        "image": "https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "11",
        "name": "Spiced Cinnamon Vanilla Zobo",
        "category": "Digestive Health",
        "ailments": ["digestive health", "blood sugar", "warming", "comfort", "heart health"],
        "ingredients": [
            "2 tbsp dried hibiscus flowers",
            "2 cinnamon sticks",
            "1 tsp pure vanilla extract",
            "3-4 whole cloves",
            "1 whole star anise",
            "1 tsp beetroot powder",
            "1 tsp raw honey",
            "2 cups hot water",
            "Cinnamon stick for garnish"
        ],
        "instructions": [
            "Combine hibiscus, cinnamon sticks, cloves, star anise, and beetroot powder in a teapot",
            "Pour freshly boiled water over the spice blend",
            "Cover and steep for 10-12 minutes to fully extract the warming spices",
            "Add vanilla extract and stir gently",
            "Strain into a cup through a fine mesh sieve",
            "Sweeten with honey while warm",
            "Serve with a cinnamon stick for garnish",
            "Best enjoyed warm on cold evenings for digestive comfort"
        ],
        "benefits": "A deeply warming digestive tonic. Cinnamon contains cinnamaldehyde, shown in studies to improve insulin sensitivity and support healthy blood sugar regulation. Cloves are rich in eugenol, a potent antimicrobial compound that aids gut health and fights harmful bacteria. Star anise provides anethole, which has been used in traditional medicine for centuries to relieve bloating and gas. Beetroot adds betalain pigments with anti-inflammatory and detoxification properties. Together with hibiscus anthocyanins, this spiced blend supports digestion, circulation, and metabolic balance.",
        "prepTime": "15 minutes",
        "prep_time": "15 minutes",
        "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "12",
        "name": "Citrus Lime Zing Zobo",
        "category": "Immunity Boost",
        "ailments": ["immunity boost", "detox", "energy", "digestion"],
        "ingredients": [
            "2 tbsp dried hibiscus flowers",
            "Juice of 2 fresh limes",
            "1 tsp lime zest",
            "1 inch fresh ginger, grated",
            "1 tsp beetroot powder",
            "1 tsp honey or agave nectar",
            "2 cups water",
            "Fresh lime slices for garnish",
            "Ice cubes"
        ],
        "instructions": [
            "Steep hibiscus flowers with grated ginger and beetroot powder in hot water for 7-8 minutes",
            "Remove from heat and add lime zest while still warm",
            "Let cool to room temperature",
            "Add fresh lime juice and stir thoroughly",
            "Sweeten with honey or agave to taste",
            "Strain well through a fine sieve",
            "Serve chilled over ice cubes",
            "Garnish with fresh lime slices for a vibrant presentation"
        ],
        "benefits": "A zesty detox and immunity booster. Limes are packed with vitamin C (about 30% of daily requirement per lime), essential for immune cell production and collagen synthesis. Ginger's bioactive compound gingerol has been shown to inhibit inflammatory pathways and support the body's natural detoxification processes. Beetroot nitrates boost nitric oxide production, improving oxygen delivery to muscles and organs — giving you natural, sustained energy. Hibiscus adds its signature anthocyanin antioxidants, which studies show can reduce markers of oxidative stress. This blend is an alkalising, refreshing tonic for daily vitality.",
        "prepTime": "12 minutes",
        "prep_time": "12 minutes",
        "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
]


async def update_recipes():
    print("Updating 6 signature Zobo recipes with research-backed refinements...")
    
    for recipe in refined_recipes:
        result = await db.recipes.replace_one(
            {"id": recipe["id"]},
            recipe,
            upsert=True
        )
        status = "Updated" if result.modified_count > 0 else "Inserted"
        print(f"  {status}: {recipe['name']}")
    
    total = await db.recipes.count_documents({})
    print(f"\nTotal recipes in database: {total}")
    print("Recipe refinement complete!")
    
    client.close()


if __name__ == "__main__":
    asyncio.run(update_recipes())
