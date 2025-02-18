from typing import Dict, Any, List, Optional
import os
from pydantic import BaseModel, Field
from bson import ObjectId
import datetime

class AIMentorModel(BaseModel):
    """Model representing an AI mentor interaction."""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias='_id')
    userId: str
    prompt: str
    response: str
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
