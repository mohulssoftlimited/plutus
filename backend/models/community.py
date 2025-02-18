from typing import Dict, Any, List, Optional
import os
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List, Optional
import datetime

class CommunityModel(BaseModel):
    """Model representing a community in the application."""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias='_id')
    name: str = Field(..., max_length=100)
    description: Optional[str] = None
    members: List[str] = []
    posts: List[str] = Field(default_factory=list)
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
