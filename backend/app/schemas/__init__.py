from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum


class PlantTypeEnum(str, Enum):
    SUNFLOWER = "sunflower"
    ROSE = "rose"
    TULIP = "tulip"
    SUCCULENT = "succulent"
    HERB = "herb"
    TREE = "tree"
    CACTUS = "cactus"
    DAISY = "daisy"
    LAVENDER = "lavender"


class PlantColorEnum(str, Enum):
    YELLOW = "yellow"
    PINK = "pink"
    RED = "red"
    WHITE = "white"
    PURPLE = "purple"
    ORANGE = "orange"
    BLUE = "blue"
    GREEN = "green"


class GrowthStageEnum(str, Enum):
    SEED = "seed"
    SPROUT = "sprout"
    GROWING = "growing"
    BLOOMING = "blooming"
    MATURE = "mature"


# --- User Schemas ---
class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# --- Habit Schemas ---
class HabitBase(BaseModel):
    name: str
    description: Optional[str] = None
    plant_type: PlantTypeEnum = PlantTypeEnum.SUNFLOWER
    plant_color: PlantColorEnum = PlantColorEnum.YELLOW
    is_binary: bool = True
    quantity_target: int = 1


class HabitCreate(HabitBase):
    pass


class HabitUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    plant_type: Optional[PlantTypeEnum] = None
    plant_color: Optional[PlantColorEnum] = None
    is_binary: Optional[bool] = None
    quantity_target: Optional[int] = None
    is_shared: Optional[bool] = None


class HabitResponse(HabitBase):
    id: int
    user_id: int
    growth_stage: GrowthStageEnum
    current_watering: int
    last_watered_at: Optional[datetime]
    streak_count: int
    is_shared: bool
    created_at: datetime

    class Config:
        from_attributes = True


# --- HabitLog Schemas ---
class HabitLogBase(BaseModel):
    date: datetime
    completed: bool = False
    quantity: int = 0
    notes: Optional[str] = None


class HabitLogCreate(HabitLogBase):
    pass


class HabitLogResponse(HabitLogBase):
    id: int
    habit_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# --- Watering Schema ---
class WateringRequest(BaseModel):
    quantity: int = 1


class WateringResponse(BaseModel):
    habit_id: int
    quantity: int
    new_watering_level: int
    new_growth_stage: GrowthStageEnum
    streak_count: int


# --- Garden View Schema ---
class GardenDay(BaseModel):
    date: datetime
    habits: List[HabitResponse]
    has_watered_today: bool


class GardenResponse(BaseModel):
    user_id: int
    month: int
    year: int
    days: List[GardenDay]


# --- Tag Schemas ---
class TagBase(BaseModel):
    name: str


class TagCreate(TagBase):
    pass


class TagResponse(TagBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# --- Journal Schemas ---
class JournalEntryBase(BaseModel):
    date: datetime
    content: str


class JournalEntryCreate(JournalEntryBase):
    pass


class JournalEntryUpdate(BaseModel):
    content: Optional[str] = None


class JournalEntryResponse(JournalEntryBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
