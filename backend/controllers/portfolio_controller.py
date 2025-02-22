from typing import Dict, Any, List, Optional
import os
from fastapi import APIRouter, HTTPException
from services.portfolio_service import PortfolioService
from models.portfolio import PortfolioModel
from pydantic import BaseModel
from database.database import get_database

router = APIRouter()
portfolio_service = PortfolioService()

class CreatePortfolioRequest(BaseModel):
    userId: str
    title: str
    description: str

class GetPortfolioResponse(PortfolioModel):
    pass

@router.post("/portfolios", response_model=PortfolioModel)
async def create_portfolio(request: CreatePortfolioRequest):
    try:
        db = await get_database()

        # ✅ Check if portfolio already exists for the user
        existing_portfolio = await db["Portfolios"].find_one({"userId": request.userId})
        if existing_portfolio:
            raise HTTPException(status_code=400, detail="Portfolio already exists for this user.")

        # ✅ If no portfolio exists, create a new one
        portfolio = await portfolio_service.create_portfolio(request.userId, request.title, request.description)
        return portfolio

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/portfolios/{userId}", response_model=GetPortfolioResponse)
async def get_portfolio(userId: str):
    try:
        portfolio = await portfolio_service.get_portfolio(userId)
        return portfolio
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/portfolios/{portfolioId}/like")
async def like_portfolio(portfolioId: str, userId: str):
    try:
        likes = await portfolio_service.like_portfolio(portfolioId, userId)
        return {"likes": likes}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
