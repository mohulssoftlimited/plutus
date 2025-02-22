from typing import Dict, Any, List, Optional
import os
from fastapi import APIRouter, HTTPException, Depends
from services.user_service import UserService
from models.user import UserModel
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel


router = APIRouter()
user_service = UserService()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class RegisterUserRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginUserRequest(BaseModel):
    email: str
    password: str

class UpdateProfileRequest(BaseModel):
    profile: dict


@router.get("/user", response_model=UserModel)
async def get_user(token: str = Depends(oauth2_scheme)):
    """
    Authenticate user using Bearer Token and return user details.
    """
    try:
        user = await user_service.get_user_by_token(token)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token or user not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/users/register", response_model=UserModel)
async def register_user(request: RegisterUserRequest):
    try:
        user = await user_service.register_user(request.email, request.username, request.password)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/users/login", response_model=str)
async def login_user(request: LoginUserRequest):
    try:
        token = await user_service.login_user(request.email, request.password)
        return token
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/users/profile", response_model=UserModel)
async def update_user_profile(userId: str, request: UpdateProfileRequest):
    try:
        updated_user = await user_service.update_profile(userId, request.profile)
        return updated_user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
