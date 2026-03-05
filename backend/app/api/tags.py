from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/api/tags", tags=["tags"])


@router.post("", response_model=schemas.TagResponse)
def create_tag(tag: schemas.TagCreate, db: Session = Depends(get_db)):
    """Create a new tag."""
    user_id = 1
    
    existing = db.query(models.Tag).filter(
        models.Tag.user_id == user_id,
        models.Tag.name == tag.name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Tag already exists")
    
    db_tag = models.Tag(user_id=user_id, name=tag.name)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


@router.get("", response_model=List[schemas.TagResponse])
def list_tags(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all tags for the current user."""
    tags = db.query(models.Tag).filter(models.Tag.user_id == 1).offset(skip).limit(limit).all()
    return tags


@router.put("/{tag_id}", response_model=schemas.TagResponse)
def update_tag(tag_id: int, tag_update: schemas.TagBase, db: Session = Depends(get_db)):
    """Update a tag."""
    tag = db.query(models.Tag).filter(
        models.Tag.id == tag_id,
        models.Tag.user_id == 1
    ).first()
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    
    tag.name = tag_update.name
    db.commit()
    db.refresh(tag)
    return tag


@router.delete("/{tag_id}")
def delete_tag(tag_id: int, db: Session = Depends(get_db)):
    """Delete a tag."""
    tag = db.query(models.Tag).filter(
        models.Tag.id == tag_id,
        models.Tag.user_id == 1
    ).first()
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    
    db.delete(tag)
    db.commit()
    return {"message": "Tag deleted"}


@router.post("/{tag_id}/habits/{habit_id}")
def tag_habit(tag_id: int, habit_id: int, db: Session = Depends(get_db)):
    """Add a tag to a habit."""
    tag = db.query(models.Tag).filter(
        models.Tag.id == tag_id,
        models.Tag.user_id == 1
    ).first()
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    
    habit = db.query(models.Habit).filter(
        models.Habit.id == habit_id,
        models.Habit.user_id == 1
    ).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    existing = db.query(models.HabitTag).filter(
        models.HabitTag.tag_id == tag_id,
        models.HabitTag.habit_id == habit_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Tag already applied to habit")
    
    habit_tag = models.HabitTag(habit_id=habit_id, tag_id=tag_id)
    db.add(habit_tag)
    db.commit()
    return {"message": "Tag added to habit"}


@router.delete("/{tag_id}/habits/{habit_id}")
def untag_habit(tag_id: int, habit_id: int, db: Session = Depends(get_db)):
    """Remove a tag from a habit."""
    habit_tag = db.query(models.HabitTag).filter(
        models.HabitTag.tag_id == tag_id,
        models.HabitTag.habit_id == habit_id
    ).first()
    if not habit_tag:
        raise HTTPException(status_code=404, detail="Tag not applied to habit")
    
    db.delete(habit_tag)
    db.commit()
    return {"message": "Tag removed from habit"}
