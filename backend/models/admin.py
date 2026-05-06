"""Pydantic models for admin user authentication."""
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminUserPublic(BaseModel):
    """Admin user object returned to the frontend (never includes password_hash)."""
    model_config = ConfigDict(extra="ignore")

    email: EmailStr
    name: str
    role: str = "admin"
    created_at: Optional[datetime] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AdminUserPublic
