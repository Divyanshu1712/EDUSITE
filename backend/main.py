
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.router import router as auth_router

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:7777"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # List of allowed origins
    allow_credentials=True,           # Allow cookies to be sent
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],              # Allow all headers
)

app.include_router(auth_router)

@app.get("/")
def main_root():
    return { "message":"Hello World",}
