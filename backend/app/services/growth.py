from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models import Habit, HabitLog, GrowthStage


WATERING_PER_STAGE = {
    GrowthStage.SEED: 1,
    GrowthStage.SPROUT: 3,
    GrowthStage.GROWING: 7,
    GrowthStage.BLOOMING: 14,
    GrowthStage.MATURE: 30,
}


def get_next_growth_stage(current_stage: GrowthStage) -> GrowthStage:
    stages = [
        GrowthStage.SEED,
        GrowthStage.SPROUT,
        GrowthStage.GROWING,
        GrowthStage.BLOOMING,
        GrowthStage.MATURE,
    ]
    current_idx = stages.index(current_stage)
    if current_idx < len(stages) - 1:
        return stages[current_idx + 1]
    return GrowthStage.MATURE


def calculate_growth(
    habit: Habit,
    completed: bool,
    quantity: int
) -> tuple[int, GrowthStage, int]:
    """
    Calculate new watering level and growth stage.
    Returns: (new_watering, new_growth_stage, new_streak_count)
    """
    new_watering = habit.current_watering
    new_streak = habit.streak_count
    
    if completed:
        if habit.is_binary:
            new_watering += 1
        else:
            # For quantitative habits, add proportion of target achieved
            progress = min(quantity / habit.quantity_target, 1.0)
            new_watering += progress
        
        new_streak += 1
    else:
        # Missed day - gentle: streak resets, but watering stays
        # Plant looks thirsty (handled in UI via last_watered_at)
        new_streak = 0
    
    # Calculate growth stage based on watering count
    new_stage = habit.growth_stage
    waterings_needed = WATERING_PER_STAGE.get(habit.growth_stage, 30)
    
    # Check if we should advance to next stage
    if new_watering >= waterings_needed and habit.growth_stage != GrowthStage.MATURE:
        new_stage = get_next_growth_stage(habit.growth_stage)
        # Reset watering counter for new stage (carrying over excess)
        excess = new_watering - waterings_needed
        new_watering = excess  # Start fresh at new stage
    
    return new_watering, new_stage, new_streak


def log_watering(
    db: Session,
    habit: Habit,
    completed: bool = True,
    quantity: int = 1
) -> tuple[int, GrowthStage, int]:
    """Log a watering event and update plant growth."""
    
    # Calculate new values
    new_watering, new_growth, new_streak = calculate_growth(habit, completed, quantity)
    
    # Update habit
    habit.current_watering = new_watering
    habit.growth_stage = new_growth
    habit.streak_count = new_streak
    habit.last_watered_at = datetime.utcnow()
    
    # Create log entry
    log = HabitLog(
        habit_id=habit.id,
        date=datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0),
        completed=completed,
        quantity=quantity if not habit.is_binary else 0
    )
    db.add(log)
    db.commit()
    db.refresh(habit)
    
    return new_watering, new_growth, new_streak


def is_plant_thirsty(habit: Habit) -> bool:
    """Check if plant should show as wilted/thirsty."""
    if habit.last_watered_at is None:
        return True
    
    # Plant is thirsty if not watered today
    today = datetime.utcnow().date()
    last_watered = habit.last_watered_at.date()
    
    return last_watered < today


def get_growth_progress(habit: Habit) -> float:
    """Get percentage progress to next growth stage (0.0 to 1.0)."""
    current_stage_idx = [
        GrowthStage.SEED,
        GrowthStage.SPROUT,
        GrowthStage.GROWING,
        GrowthStage.BLOOMING,
        GrowthStage.MATURE,
    ].index(habit.growth_stage)
    
    if current_stage_idx >= 4:  # Already mature
        return 1.0
    
    waterings_needed = WATERING_PER_STAGE[habit.growth_stage]
    progress = habit.current_watering / waterings_needed
    
    return min(progress, 1.0)
