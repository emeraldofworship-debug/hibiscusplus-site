from pydantic import BaseModel, Field
from datetime import datetime
import uuid


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    price: float
    description: str
    weight: str
    image: str
    in_stock: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    description: str
    weight: str
    image: str
    in_stock: bool = True
