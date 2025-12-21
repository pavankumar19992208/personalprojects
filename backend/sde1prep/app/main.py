# filepath: p:\personalspace\projects\backend\sde1prep\app\main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import db
from app.api.v1.router import api_router

class SDEPrepServer:
    """
    Represents the Backend Server Application.
    
    LLD Concept: **Encapsulation**
    We encapsulate the creation, configuration, and lifecycle management of the 
    FastAPI application within this class. This prevents global namespace pollution
    and groups related startup logic together.
    """
    
    def __init__(self):
        # LLD Concept: **Single Responsibility Principle (SRP)**
        # The __init__ method acts as a 'Director' in a Builder-like pattern,
        # orchestrating the setup steps but delegating the actual work to private methods.
        self._app = FastAPI(
            title="Amazon SDE Prep Backend",
            root_path="/api/sde1prep"
        )
        
        # Initialize components
        self._configure_middleware()
        self._configure_routes()
        self._configure_db_lifecycle()

    @property
    def app(self) -> FastAPI:
        """
        Getter for the FastAPI application instance.
        Allows controlled access to the internal _app object.
        """
        return self._app

    def _configure_middleware(self):
        """
        Configures application middleware (CORS, Security, etc.).
        Encapsulates security policy details.
        """
        self._app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def _configure_routes(self):
        """
        Registers API routers.
        LLD Concept: **Modularity**
        The main application doesn't know the details of the routes, 
        it just knows how to include the high-level 'api_router'.
        """
        self._app.include_router(api_router, prefix="/api/v1")
        
        @self._app.get("/")
        async def root():
            return {"message": "System Operational"}

    def _configure_db_lifecycle(self):
        """
        Sets up Database connection event handlers.
        LLD Concept: **Separation of Concerns**
        Database connection logic is isolated from the request processing logic.
        """
        @self._app.on_event("startup")
        async def startup_db_client():
            db.connect()

        @self._app.on_event("shutdown")
        async def shutdown_db_client():
            db.close()

# LLD Concept: **Singleton Pattern** (Implicit)
# We instantiate the server class once. This instanceserves as the entry point for the ASGI server (Uvicorn).
server_instance = SDEPrepServer()

#Expose the internal FastAPI app object for Uvicorn to run
app = server_instance.app