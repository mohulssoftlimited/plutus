from typing import Dict, Any, List, Optional
import os
from fastapi import HTTPException
from models.achievement import AchievementModel
from database.database import get_database

class AchievementService:
    """Service class for achievement-related operations."""

    async def create_achievement(self, userId: str, title: str, description: str, points: int) -> AchievementModel:
        db = await get_database()
        achievement = AchievementModel(
            userId=userId,
            title=title,
            description=description,
            points=points,
            earnedAt=datetime.utcnow()
        )
        await db["Achievements"].insert_one(achievement.dict(by_alias=True))
        return achievement
