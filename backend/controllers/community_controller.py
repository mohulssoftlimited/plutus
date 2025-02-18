from typing import Dict, Any, List, Optional
import os
from fastapi import APIRouter, HTTPException, Query
from services.community_service import CommunityService
from models.community import CommunityModel
from pydantic import BaseModel

router = APIRouter()
community_service = CommunityService()

class CreateCommunityRequest(BaseModel):
    name: str
    description: str

@router.post("/communities", response_model=CommunityModel)
async def create_community(request: CreateCommunityRequest):
    try:
        community = await community_service.create_community(request.name, request.description)
        return community
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/communities/{communityId}/join")
async def join_community(userId: str, communityId: str):
    try:
        community = await community_service.join_community(userId, communityId)
        return community
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


# ✅ GET ALL COMMUNITIES
@router.get("/communities", response_model=List[CommunityModel])
async def get_all_communities(userId: str = Query(..., description="User ID to filter communities")):
    """
    Retrieves a list of communities where the user is NOT a member.
    """
    try:
        return await community_service.get_all_communities(userId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ GET USER'S JOINED COMMUNITIES
@router.get("/communities/joined", response_model=List[CommunityModel])
async def get_user_joined_communities(userId: str = Query(..., description="User ID to fetch joined communities")):
    """
    Retrieves a list of communities that the user has joined.
    """
    try:
        return await community_service.get_user_joined_communities(userId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))