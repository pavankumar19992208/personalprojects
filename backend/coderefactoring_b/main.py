from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import routes
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create required directories (only for local development)
if not os.getenv("AWS_LAMBDA_FUNCTION_NAME"):
    try:
        os.makedirs("./logs", exist_ok=True)
        os.makedirs("./temp", exist_ok=True)
        logger.info("Created logs and temp directories")
    except Exception as e:
        logger.error(f"Failed to create directories: {e}")

app = FastAPI(
    title="Code Refactoring Service",
    description="AI-powered code refactoring and package upgrade service",
    version="1.0.0"
)

# Add CORS middleware to allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router
app.include_router(routes.router)

@app.get("/")
def read_root():
    return {"message": "Upgrade Agent Backend is running"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "code-refactoring",
        "version": "1.0.0"
    }

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=int(os.getenv("PORT", 8000)),
        log_level="info"
    )