from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

from app.database import Base


class PlantType(enum.Enum):
    SUNFLOWER = "sunflower"
    ROSE = "rose"
    TULIP = "tulip"
    SUCCULENT = "succulent"
    HERB = "herb"
    TREE = "tree"
    CACTUS = "cactus"
    DAISY = "daisy"
    LAVENDER = "lavender"


class GrowthStage(enum.Enum):
    SEED = "seed"
    SPROUT = "sprout"
    GROWING = "growing"
    BLOOMING = "blooming"
    MATURE = "mature"


class PlantColor(enum.Enum):
    YELLOW = "yellow"
    PINK = "pink"
    RED = "red"
    WHITE = "white"
    PURPLE = "purple"
    ORANGE = "orange"
    BLUE = "blue"
    GREEN = "green"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    habits = relationship("Habit", back_populates="user")
    journal_entries = relationship("JournalEntry", back_populates="user")
    tags = relationship("Tag", back_populates="user")


class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    
    # Garden-specific fields
    plant_type = Column(SQLEnum(PlantType), default=PlantType.SUNFLOWER)
    plant_color = Column(SQLEnum(PlantColor), default=PlantColor.YELLOW)
    is_binary = Column(Boolean, default=True)
    quantity_target = Column(Integer, default=1)
    
    # Growth tracking (snapshot)
    growth_stage = Column(SQLEnum(GrowthStage), default=GrowthStage.SEED)
    current_watering = Column(Integer, default=0)
    last_watered_at = Column(DateTime, nullable=True)
    streak_count = Column(Integer, default=0)
    
    # Sharing (future feature)
    is_shared = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="habits")
    logs = relationship("HabitLog", back_populates="habit", cascade="all, delete-orphan")
    tags = relationship("HabitTag", back_populates="habit")


class HabitLog(Base):
    __tablename__ = "habit_logs"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    completed = Column(Boolean, default=False)
    quantity = Column(Integer, default=0)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    habit = relationship("Habit", back_populates="logs")


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="journal_entries")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="tags")
    habits = relationship("HabitTag", back_populates="tag")


class HabitTag(Base):
    __tablename__ = "habit_tags"

    habit_id = Column(Integer, ForeignKey("habits.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id"), primary_key=True)

    habit = relationship("Habit", back_populates="tags")
    tag = relationship("Tag", back_populates="habits")
