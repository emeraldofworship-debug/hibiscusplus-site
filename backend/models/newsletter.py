from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import uuid


class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    source: str = "website"


class NewsletterSubscribe(BaseModel):
    email: EmailStr
