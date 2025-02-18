from typing import Dict, Any, List, Optional
import os
import motor.motor_asyncio
import logging

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Database:
    """Singleton class to manage MongoDB connection."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("DATABASE_URI"))
            cls._instance.db = cls._instance.client.get_default_database()
        return cls._instance

async def get_database():
    """Get the database instance, ensuring a single connection is used."""
    try:
        db = Database().db
        await db.command('ping')  # Test connection
        return db
    except Exception as e:
        logging.error(f"Database connection error: {e}")
        raise RuntimeError("Could not connect to the database.")
