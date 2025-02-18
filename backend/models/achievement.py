from typing import Dict, Any, List, Optional
import os
from pydantic import BaseModel, Field
from bson import ObjectId
import datetime

class AchievementModel(BaseModel):
    """Model representing an achievement in the application."""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias='_id')
    userId: str
    title: str
    description: Optional[str] = None
    points: int = Field(default=0)
    earnedAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
