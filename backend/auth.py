"""Auth helpers: bcrypt password hashing, JWT token issuance, brute-force counter,
and a FastAPI dependency that resolves the current admin user from the
Authorization Bearer header."""
from __future__ import annotations

import os
import time
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException, Request, status

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_TTL_HOURS = 24

# In-memory brute-force counter (process-local; sufficient for single-admin v1).
# Key: f"{ip}:{email}". Value: {"count": int, "locked_until": float (epoch seconds)}.
_LOGIN_ATTEMPTS: dict[str, dict] = {}
_MAX_ATTEMPTS = 5
_LOCKOUT_SECONDS = 15 * 60


def _jwt_secret() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET environment variable must be set")
    return secret


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def create_access_token(email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": email,
        "role": "admin",
        "iat": int(now.timestamp()),
        "exp": now + timedelta(hours=ACCESS_TOKEN_TTL_HOURS),
        "type": "access",
    }
    return jwt.encode(payload, _jwt_secret(), algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")
    return payload


# ---------- Brute-force helpers ----------

def _key(ip: str, email: str) -> str:
    return f"{ip}:{email.lower()}"


def check_lockout(ip: str, email: str) -> None:
    rec = _LOGIN_ATTEMPTS.get(_key(ip, email))
    if rec and rec.get("locked_until", 0) > time.time():
        wait = int(rec["locked_until"] - time.time())
        raise HTTPException(
            status_code=429,
            detail=f"Too many failed attempts. Try again in {wait // 60 + 1} minute(s).",
        )


def record_failed_attempt(ip: str, email: str) -> None:
    k = _key(ip, email)
    rec = _LOGIN_ATTEMPTS.get(k, {"count": 0, "locked_until": 0})
    rec["count"] += 1
    if rec["count"] >= _MAX_ATTEMPTS:
        rec["locked_until"] = time.time() + _LOCKOUT_SECONDS
        rec["count"] = 0  # reset counter, keep lockout
    _LOGIN_ATTEMPTS[k] = rec


def clear_attempts(ip: str, email: str) -> None:
    _LOGIN_ATTEMPTS.pop(_key(ip, email), None)


# ---------- FastAPI dependency factory ----------

def admin_dependency(get_db):
    """Return a FastAPI dependency that resolves the current admin user.

    `get_db` is a callable returning the motor database instance.
    """
    async def get_current_admin(request: Request) -> dict:
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Not authenticated")
        token = auth[7:].strip()
        payload = decode_access_token(token)
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        db = get_db()
        user = await db.admin_users.find_one({"email": email}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User no longer exists")
        return user

    return get_current_admin
