from pydantic import BaseModel, Field
from datetime import datetime
import uuid


class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    date: datetime
    read_time: str
    image: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    date: datetime
    read_time: str
    image: str
