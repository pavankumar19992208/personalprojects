from google import genai
from google.genai import types
from typing import Dict
from app.core.config import settings

class ChatService:
    """
    LLD Concept: Singleton / Service Pattern
    This class acts as a centralized service for AI interactions.
    It encapsulates the complexity of the Gemini API and session management.
    """
    def __init__(self):
        self.api_key = settings.GOOGLE_API_KEY
        if not self.api_key:
            print("Warning: GOOGLE_API_KEY not set. Chat features will not work.")
        self.client = genai.Client(api_key=self.api_key)
        self.sessions: Dict[str, list] = {}  # session_id -> list of messages

        self.model = "gemini-2.0-flash"  # Or "gemini-1.0-pro" if you don't have access to 1.5

        self.system_instruction = (
            "You are a Senior DSA (Data Structures and Algorithms) Tutor and an expert Software Development Engineer at Amazon. "
            "Your goal is to help students prepare for SDE interviews.\n\n"
            "Guidelines:\n"
            "1. Explain Concepts Clearly: Use analogies.\n"
            "2. Code Examples: Provide clean, optimized code in Python or Java.\n"
            "3. Socratic Method: Guide students with hints before giving answers.\n"
            "4. Complexity Analysis: Always mention Time/Space complexity."
        )

    def get_or_create_history(self, session_id: str):
        if session_id not in self.sessions:
            self.sessions[session_id] = [
                types.Content(
                    role="system",
                    parts=[types.Part(text=self.system_instruction)],
                )
            ]
        return self.sessions[session_id]

    async def send_message_stream(self, session_id: str, message: str):
        if not self.api_key:
            yield "Error: Server configuration missing API Key."
            return

        history = self.get_or_create_history(session_id)
        history.append(
            types.Content(
                role="user",
                parts=[types.Part(text=message)],
            )
        )

        try:
            # Stream the response (sync generator, not async)
            stream = self.client.models.generate_content_stream(
                model=self.model,
                contents=history,
            )
            full_response = ""
            for chunk in stream:  # <-- use regular for, not async for
                if chunk.text:
                    full_response += chunk.text
                    yield chunk.text
            history.append(
                types.Content(
                    role="model",
                    parts=[types.Part(text=full_response)],
                )
            )
        except Exception as e:
            yield f"Error communicating with AI: {str(e)}"
chat_service = ChatService()