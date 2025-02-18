from typing import Dict, Any, List, Optional
import os
from fastapi import APIRouter, HTTPException
from services.achievement_service import AchievementService
from models.achievement import AchievementModel
from pydantic import BaseModel

router = APIRouter()
achievement_service = AchievementService()

class CreateAchievementRequest(BaseModel):
    userId: str
    title: str
    description: str
    points: int

@router.post("/achievements", response_model=AchievementModel)
async def create_achievement(request: CreateAchievementRequest):
    try:
        achievement = await achievement_service.create_achievement(request.userId, request.title, request.description, request.points)
        return achievement
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
