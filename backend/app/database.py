from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://habit_garden:habit_garden_password@db:5432/habit_garden"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from app.models import User, Habit, HabitLog, JournalEntry, Tag, HabitTag
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        existing_user = db.query(User).filter(User.id == 1).first()
        if not existing_user:
            default_user = User(
                id=1,
                username="garden_keeper",
                password_hash="temp_password_hash"
            )
            db.add(default_user)
            db.commit()
            print("Created default user (id=1)")
    finally:
        db.close()
