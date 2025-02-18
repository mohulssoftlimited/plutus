from typing import Dict, Any, List, Optional
import os
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List, Optional
import datetime

class PortfolioModel(BaseModel):
    """Model representing a portfolio in the application."""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias='_id')
    userId: str
    title: str = Field(..., max_length=100)
    description: Optional[str] = None
    media: List[dict] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    likes: int = Field(default=0)
    comments: List[str] = Field(default_factory=list)
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
