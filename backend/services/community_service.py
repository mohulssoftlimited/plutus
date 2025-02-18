from typing import Dict, Any, List, Optional
import os
from fastapi import HTTPException
from models.community import CommunityModel
from database.database import get_database
from datetime import datetime

class CommunityService:
    """Service class for community-related operations."""

    async def create_community(self, name: str, description: str) -> CommunityModel:
        db = await get_database()
        community = CommunityModel(
            name=name,
            description=description,
            createdAt=datetime.now()
        )
        await db["Communities"].insert_one(community.dict(by_alias=True))
        return community

    async def join_community(self, userId: str, communityId: str) -> CommunityModel:
        db = await get_database()
        community = await db["Communities"].find_one_and_update(
            {"_id": communityId},
            {"$addToSet": {"members": str(userId)}}  # ✅ Fix: Ensure userId is stored as a string
        )

        if community is None:
            raise HTTPException(status_code=404, detail="Community not found")
        
        return CommunityModel(**community)

    async def get_all_communities(self, userId: str) -> List[CommunityModel]:
        """
        Retrieves a list of all available communities where the user is NOT a member.
        """
        db = await get_database()
        
        # ✅ Fetch only communities where userId is NOT in members array
        communities = await db["Communities"].find({"members": {"$ne": userId}}).to_list(100)

        return [CommunityModel(**community) for community in communities]

    async def get_user_joined_communities(self, userId: str) -> List[CommunityModel]:
        """
        Retrieves a list of communities that the user has joined.
        """
        db = await get_database()
        communities = await db["Communities"].find({"members": userId}).to_list(100)
        return [CommunityModel(**community) for community in communities]
