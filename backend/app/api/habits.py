from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app import models, schemas
from app.services import growth

router = APIRouter(prefix="/api/habits", tags=["habits"])


# --- Habit CRUD ---
@router.post("", response_model=schemas.HabitResponse)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    """Create a new habit with plant settings."""
    # TODO: Get actual user_id from auth (temp: use placeholder)
    user_id = 1
    
    db_habit = models.Habit(
        user_id=user_id,
        name=habit.name,
        description=habit.description,
        plant_type=models.PlantType[habit.plant_type.name],
        plant_color=models.PlantColor[habit.plant_color.name],
        is_binary=habit.is_binary,
        quantity_target=habit.quantity_target,
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit


@router.get("", response_model=List[schemas.HabitResponse])
def list_habits(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all habits for the current user."""
    # TODO: Get actual user_id from auth
    habits = db.query(models.Habit).filter(models.Habit.user_id == 1).offset(skip).limit(limit).all()
    return habits


@router.get("/{habit_id}", response_model=schemas.HabitResponse)
def get_habit(habit_id: int, db: Session = Depends(get_db)):
    """Get a single habit by ID."""
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit


@router.put("/{habit_id}", response_model=schemas.HabitResponse)
def update_habit(habit_id: int, habit_update: schemas.HabitUpdate, db: Session = Depends(get_db)):
    """Update habit details."""
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    update_data = habit_update.model_dump(exclude_unset=True)
    
    # Handle enum conversions
    if "plant_type" in update_data:
        update_data["plant_type"] = models.PlantType[update_data["plant_type"].name]
    if "plant_color" in update_data:
        update_data["plant_color"] = models.PlantColor[update_data["plant_color"].name]
    
    for field, value in update_data.items():
        setattr(habit, field, value)
    
    db.commit()
    db.refresh(habit)
    return habit


@router.delete("/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    """Delete a habit."""
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    db.delete(habit)
    db.commit()
    return {"message": "Habit deleted"}


# --- Watering (Garden) ---
@router.post("/{habit_id}/water", response_model=schemas.WateringResponse)
def water_habit(habit_id: int, watering: schemas.WateringRequest, db: Session = Depends(get_db)):
    """Water a habit (log completion)."""
    habit = db.query(models.Habit).filter(models.Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    # For binary habits, quantity is ignored (just mark complete)
    quantity = watering.quantity if not habit.is_binary else 1
    
    new_watering, new_stage, new_streak = growth.log_watering(
        db, habit, completed=True, quantity=quantity
    )
    
    return schemas.WateringResponse(
        habit_id=habit_id,
        quantity=quantity,
        new_watering_level=new_watering,
        new_growth_stage=schemas.GrowthStageEnum[new_stage.name],
        streak_count=new_streak
    )


# --- Logs ---
@router.get("/{habit_id}/logs", response_model=List[schemas.HabitLogResponse])
def get_habit_logs(
    habit_id: int,
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db)
):
    """Get logs for a specific habit."""
    query = db.query(models.HabitLog).filter(models.HabitLog.habit_id == habit_id)
    
    if start_date:
        query = query.filter(models.HabitLog.date >= start_date)
    if end_date:
        query = query.filter(models.HabitLog.date <= end_date)
    
    return query.order_by(models.HabitLog.date.desc()).all()
