#!/usr/bin/env python3
"""
Atlas seeding orchestrator. Runs the seed scripts + admin user upsert against MONGO_URL/DB_NAME from env.
Usage:
  MONGO_URL='mongodb+srv://...' DB_NAME='hibiscusplus' \
  ADMIN_EMAIL='emeraldofworship@hibiscusplus.co.uk' \
  ADMIN_PASSWORD='HP-Boldly-...' \
  python seed_all.py
"""
import asyncio, os
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
from dotenv import load_dotenv

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ.get("DB_NAME", "hibiscusplus")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "emeraldofworship@hibiscusplus.co.uk")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "HP-Boldly-Spiced-Beautifully-Balanced-2026")


async def ensure_admin():
    import bcrypt
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    hashed = bcrypt.hashpw(ADMIN_PASSWORD.encode(), bcrypt.gensalt()).decode()
    existing = await db.admin_users.find_one({"email": ADMIN_EMAIL})
    if existing:
        await db.admin_users.update_one(
            {"email": ADMIN_EMAIL},
            {
                "$set": {"password_hash": hashed, "role": "admin"},
                "$unset": {"hashed_password": ""},
            },
        )
        print(f"✅ Admin password reset for {ADMIN_EMAIL}")
    else:
        await db.admin_users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hashed,
            "name": "HibiscusPlus Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        print(f"✅ Admin user created: {ADMIN_EMAIL}")
    client.close()


async def run_all():
    print(f"🌍 Atlas target → db='{DB_NAME}' host='{MONGO_URL.split('@')[-1].split('/')[0]}'")

    # 1) Core data: recipes/products/blog
    print("\n=== 1/4 seed_data (recipes, products, blog) ===")
    from seed_data import seed_database
    await seed_database()

    # 2) Tea blends
    print("\n=== 2/4 seed_tea (signature blends) ===")
    from seed_tea import seed as seed_tea
    await seed_tea()

    # 3) Snacks
    print("\n=== 3/4 seed_snacks (Nigerian snacks) ===")
    from seed_snacks import seed as seed_snacks
    await seed_snacks()

    # 4) Admin user
    print("\n=== 4/4 admin user ===")
    await ensure_admin()

    print("\n🎉 Atlas fully seeded.")


if __name__ == "__main__":
    asyncio.run(run_all())
