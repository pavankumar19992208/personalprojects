from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import db
from app.api.v1.router import api_router

# UPDATE: Add root_path so Swagger UI knows where it lives
app = FastAPI(
    title="Amazon SDE Prep Backend",
    root_path="/api/sde1prep"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    db.connect()

@app.on_event("shutdown")
async def shutdown_db_client():
    db.close()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "System Operational"}