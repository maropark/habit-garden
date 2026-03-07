from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.api import habits, garden, tags

app = FastAPI(title="Habit Garden API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://172.18.0.0/16"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(habits.router)
app.include_router(garden.router)
app.include_router(tags.router)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/")
def read_root():
    return {"message": "Welcome to Habit Garden"}
