from fastapi import APIRouter, WebSocket, HTTPException
from services.ai_mentor_service import AIMentorService
from pydantic import BaseModel

from typing import List
from models.ai_mentor import AIMentorModel
from database.database import get_database

router = APIRouter()
ai_mentor_service = AIMentorService()


@router.get("/ai-mentor", response_model=List[AIMentorModel])
async def get_all_ai_chats(userId: str):
    """
    Retrieves all previous AI mentor chat interactions for a specific user.
    """
    try:
        db = await get_database()
        chats = await db["AiMentor"].find({"userId": userId}).sort("createdAt", -1).to_list(100)  # Sort by newest first
        return chats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))