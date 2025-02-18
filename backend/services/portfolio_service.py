from typing import Dict, Any, List, Optional
import os
from datetime import datetime
from fastapi import HTTPException
from models.portfolio import PortfolioModel
from database.database import get_database

class PortfolioService:
    """Service class for portfolio-related operations."""
    async def create_portfolio(self, userId: str, title: str, description: str) -> PortfolioModel:
        db = await get_database()
        portfolio = PortfolioModel(
            userId=userId,
            title=title,
            description=description,
            createdAt=datetime.now()
        )
        await db["Portfolios"].insert_one(portfolio.dict(by_alias=True))
        return portfolio

    async def get_portfolio(self, portfolioId: str) -> PortfolioModel:
        db = await get_database()
        portfolio = await db["Portfolios"].find_one({"userId": portfolioId})
        if portfolio is None:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return PortfolioModel(**portfolio)

    
    async def like_portfolio(self, portfolioId: str, userId: str) -> int:
        db = await get_database()
        await db["Portfolios"].update_one({"_id": portfolioId}, {"$inc": {"likes": 1}})
        updated_portfolio = await db["Portfolios"].find_one({"_id": portfolioId})
        return updated_portfolio["likes"]
