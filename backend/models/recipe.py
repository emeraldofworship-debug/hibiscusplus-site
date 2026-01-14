from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import uuid


class Recipe(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    ailments: List[str]
    ingredients: List[str]
    instructions: List[str]
    benefits: str
    prep_time: str
    image: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class RecipeCreate(BaseModel):
    name: str
    category: str
    ailments: List[str]
    ingredients: List[str]
    instructions: List[str]
    benefits: str
    prep_time: str
    image: str
