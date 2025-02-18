from typing import Dict, Any, List, Optional
import os
from pydantic import BaseModel, Field, EmailStr, validator
from bson import ObjectId
from typing import Optional, List
import datetime

class UserModel(BaseModel):
    """Model representing a user in the application."""
    id: str = Field(default_factory=lambda: str(ObjectId()), alias='_id')
    username: str = Field(..., max_length=50)
    email: EmailStr
    passwordHash: str
    profile: dict = Field(default_factory=dict)
    socialLinks: dict = Field(default_factory=dict)
    portfolio: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)
    role: str = Field(default='user')
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    updatedAt: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    @validator('username')
    def username_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Username must not be empty')
        return v

    @validator('email')
    def email_must_be_valid(cls, v):
        if not v:
            raise ValueError('Email must be valid')
        return v

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
