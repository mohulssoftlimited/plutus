from typing import Dict, Any, List, Optional
import os
import uvicorn
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from config.config import Config
from database.database import get_database
from middleware.middleware import setup_middleware
from routes.api_router import api_router

from services.ai_mentor_service import AIMentorService
from pydantic import BaseModel

ai_mentor_service = AIMentorService()

class GenerateAIResponseRequest(BaseModel):
    userId: str
    prompt: str


# Configure logger
logging.basicConfig(level=logging.INFO)
appLogger = logging.getLogger(__name__)

# Load global configuration
Config.log_config()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws/ai/mentor")
async def websocket_ai_mentor(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            userId = data.get("userId")
            prompt = data.get("prompt")

            if not userId or not prompt:
                await websocket.send_text("Invalid request format")
                continue

            async for chunk in ai_mentor_service.stream_ai_response(userId, prompt):
                await websocket.send_text(chunk)

            await websocket.send_text("[END]")  # ✅ Add END marker when response is finished

    except WebSocketDisconnect:
        print("WebSocket disconnected")
        
        
# Setup middleware
setup_middleware(app)




# Register routes
app.include_router(api_router)

@app.on_event("startup")
async def startup_event():
    # Initialize database connection
    await get_database()
    appLogger.info("Database connection established.")

@app.on_event("shutdown")
async def shutdown_event():
    # Close database connection if needed
    appLogger.info("Shutting down the application.")

if __name__ == '__main__':
    appLogger.info(f"Starting application on port 5000 with BACKEND_URL={os.environ.get('BACKEND_URL', 'Not Set')} and FRONTEND_URL={os.environ.get('FRONTEND_URL', 'Not Set')}")
    uvicorn.run(app, host="0.0.0.0", port=5000)
