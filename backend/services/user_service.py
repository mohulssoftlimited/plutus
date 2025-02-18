from typing import Dict, Any, List, Optional
import os
import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException
from models.user import UserModel
from database.database import get_database
from bson import ObjectId

# ✅ Use an environment variable for SECRET_KEY (Security best practice)
SECRET_KEY = os.getenv("SECRET_KEY", "8923812030USKAH(HUI*shohi)")  
ALGORITHM = "HS256"


class UserService:
    """Service class for user-related operations."""
    
    async def get_user_by_token(self, token: str) -> UserModel:
        """
        Decodes the JWT token and fetches the user from the database.
        """
        try:
            # ✅ Strip "Bearer " if present
            token = token.replace("Bearer ", "")
            
            # ✅ Decode JWT
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            
            user_id = payload.get("sub")

            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token")
            
            db = await get_database()
            user_data = await db["Users"].find_one({"_id": user_id})

            if not user_data:
                raise HTTPException(status_code=401, detail="User not found")

            return UserModel(**user_data)  # Convert MongoDB data to UserModel

        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    
    async def register_user(self, email: str, username: str, password: str) -> UserModel:
        """
        Registers a new user, hashes their password, and stores them in the database.
        """
        db = await get_database()

        # ✅ Check if email already exists
        existing_user = await db["Users"].find_one({"email": email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email is already registered")

        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        user = UserModel(
            username=username,
            email=email,
            passwordHash=hashed_password,
            createdAt=datetime.utcnow(),
            updatedAt=datetime.utcnow(),
        )
        await db["Users"].insert_one(user.dict(by_alias=True))
        return user

    
    async def login_user(self, email: str, password: str) -> str:
        """
        Logs in a user by validating credentials and returning a JWT token.
        """
        db = await get_database()
        user = await db["Users"].find_one({"email": email})

        if user is None:
            raise HTTPException(status_code=400, detail="Invalid email or password")

        # ✅ Verify password
        if not bcrypt.checkpw(password.encode(), user["passwordHash"].encode()):
            raise HTTPException(status_code=400, detail="Invalid email or password")

        # ✅ Generate JWT Token with expiration
        token = jwt.encode(
            {"sub": str(user["_id"]), "exp": datetime.utcnow() + timedelta(hours=200)},
            SECRET_KEY,
            algorithm=ALGORITHM
        )

        return token


    async def update_profile(self, userId: str, profileData: dict) -> UserModel:
        """
        Updates a user's profile data in the database.
        """
        db = await get_database()

        try:
            object_id = ObjectId(userId)  # ✅ Ensure it's a valid ObjectId
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid user ID format")

        updated_user = await db["Users"].find_one_and_update(
            {"_id": object_id},
            {"$set": {"profile": profileData, "updatedAt": datetime.utcnow()}},
            return_document=True
        )

        if updated_user is None:
            raise HTTPException(status_code=404, detail="User not found")

        return UserModel(**updated_user)
