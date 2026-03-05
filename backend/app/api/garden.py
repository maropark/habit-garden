from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, date
from typing import List
import calendar

from app.database import get_db
from app import models, schemas
from app.services import growth

router = APIRouter(prefix="/api/garden", tags=["garden"])


@router.get("", response_model=schemas.GardenResponse)
def get_garden(month: int = None, year: int = None, db: Session = Depends(get_db)):
    """Get garden view for a month - shows all habits and their watering status per day."""
    # Default to current month
    today = date.today()
    month = month or today.month
    year = year or today.year
    
    # TODO: Get actual user_id from auth
    user_id = 1
    
    # Get all habits for user
    habits = db.query(models.Habit).filter(models.Habit.user_id == user_id).all()
    
    # Get logs for the month
    _, last_day = calendar.monthrange(year, month)
    start_date = datetime(year, month, 1)
    end_date = datetime(year, month, last_day, 23, 59, 59)
    
    logs = db.query(models.HabitLog).filter(
        models.HabitLog.habit_id.in_([h.id for h in habits]),
        models.HabitLog.date >= start_date,
        models.HabitLog.date <= end_date
    ).all()
    
    # Group logs by date
    logs_by_date = {}
    for log in logs:
        log_date = log.date.date()
        if log_date not in logs_by_date:
            logs_by_date[log_date] = []
        logs_by_date[log_date].append(log)
    
    # Build calendar days
    days = []
    for day in range(1, last_day + 1):
        day_date = date(year, month, day)
        
        # Get habits that were watered on this day
        day_logs = logs_by_date.get(day_date, [])
        watered_habit_ids = {log.habit_id for log in day_logs if log.completed}
        
        # Get habit states for this day (clone for display)
        day_habits = []
        for habit in habits:
            # Check if thirsty (not watered today or previous days)
            is_thirsty = growth.is_plant_thirsty(habit) and day_date != today
            
            # Check if watered today
            has_watered = habit.id in watered_habit_ids
            
            # Create display version
            day_habit = schemas.HabitResponse(
                id=habit.id,
                user_id=habit.user_id,
                name=habit.name,
                description=habit.description,
                plant_type=schemas.PlantTypeEnum[habit.plant_type.name],
                plant_color=schemas.PlantColorEnum[habit.plant_color.name],
                is_binary=habit.is_binary,
                quantity_target=habit.quantity_target,
                growth_stage=schemas.GrowthStageEnum[habit.growth_stage.name],
                current_watering=habit.current_watering,
                last_watered_at=habit.last_watered_at,
                streak_count=habit.streak_count,
                is_shared=habit.is_shared,
                created_at=habit.created_at,
            )
            day_habits.append(day_habit)
        
        days.append(schemas.GardenDay(
            date=datetime.combine(day_date, datetime.min.time()),
            habits=day_habits,
            has_watered_today=day_date == today and any(h.id in watered_habit_ids for h in habits)
        ))
    
    return schemas.GardenResponse(
        user_id=user_id,
        month=month,
        year=year,
        days=days
    )


@router.get("/today")
def get_today_garden(db: Session = Depends(get_db)):
    """Get today's garden view - simpler endpoint for daily check-in."""
    today = date.today()
    
    # TODO: Get actual user_id from auth
    user_id = 1
    
    habits = db.query(models.Habit).filter(models.Habit.user_id == user_id).all()
    
    today_start = datetime.combine(today, datetime.min.time())
    today_logs = db.query(models.HabitLog).filter(
        models.HabitLog.habit_id.in_([h.id for h in habits]),
        models.HabitLog.date >= today_start
    ).all()
    
    watered_ids = {log.habit_id for log in today_logs if log.completed}
    
    result = []
    for habit in habits:
        is_watered = habit.id in watered_ids
        is_thirsty = not is_watered
        
        result.append({
            "id": habit.id,
            "name": habit.name,
            "plant_type": habit.plant_type.value,
            "plant_color": habit.plant_color.value,
            "growth_stage": habit.growth_stage.value,
            "is_watered": is_watered,
            "is_thirsty": is_thirsty,
            "streak": habit.streak_count,
            "is_binary": habit.is_binary,
        })
    
    return {
        "date": today.isoformat(),
        "habits": result
    }
