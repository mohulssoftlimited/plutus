import openai
import os
from datetime import datetime
from dotenv import load_dotenv  # ✅ Import dotenv
from models.ai_mentor import AIMentorModel
from database.database import get_database
from typing import AsyncGenerator

# ✅ Load OpenAI API key from environment variables
load_dotenv()
OPENAI_API_KEY = "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"

class AIMentorService:
    """Service class for AI mentor-related operations."""

    async def stream_ai_response(self, userId: str, prompt: str) -> AsyncGenerator[str, None]:
        """
        Streams AI responses dynamically via OpenAI's API.
        """
        db = await get_database()

        if not OPENAI_API_KEY:
            raise ValueError("Missing OpenAI API Key. Set OPENAI_API_KEY in .env")

        # ✅ Use OpenAI's latest API client
        client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)

        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            stream=True  # ✅ Enables streaming responses
        )

        full_response = ""
        async for chunk in response:
            if chunk.choices:
                text = chunk.choices[0].delta.content
                if text:
                    full_response += text
                    yield text  # ✅ Stream response in chunks

        # ✅ Save the full response after streaming is complete
        ai_mentor = AIMentorModel(
            userId=userId,
            prompt=prompt,
            response=full_response,
            createdAt=datetime.utcnow()
        )
        await db["AiMentor"].insert_one(ai_mentor.dict(by_alias=True))

    
    