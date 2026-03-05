# AI Engineering Context - Habit Garden

## Project Overview
- **Name:** Habit Garden
- **Type:** Cozy cottage-core habit + journaling web app
- **Stack:** React+TS (frontend), FastAPI (backend), PostgreSQL (database)
- **Users:** 2 primary users (local-first, private)

## Framework: ARROA + HRA

### Roles
- **Planner:** Breaks down milestones into executable tasks
- **Actor:** Executes the planned tasks  
- **Reflector:** Reviews quality, enables self-correction

### Task Queue Pattern
Tasks move through: PLANNING → EXECUTION → REFLECTION

---

## Milestones

| # | Milestone | Status | Notes |
|---|-----------|--------|-------|
| 0 | Project Skeleton | ✅ Complete | Vite+TS, FastAPI, Postgres, ORM, all models |
| 1 | Core Habit Tracking | ✅ Complete | CRUD, Tags API, Today checklist, Calendar view |
| 2 | Journaling & Insights | ⏳ Pending | |
| 3 | Polish & Cottage-Core UI | ⏳ Pending | |
| 4 | LLM Integration (Local) | ⏳ Pending | |
| 5 | GraphQL & Vector Search | ⏳ Pending | |

---

## Current Focus: Milestone 1 - COMPLETE

### Completed Work
- Backend: Tags CRUD API (full CRUD + habit tagging)
- Backend: Today's habits endpoint (was pre-existing)
- Backend: Garden/Calendar API (was pre-existing)
- Frontend: API services (habits, tags, garden)
- Frontend: TodayChecklist component (daily watering UI)
- Frontend: CalendarView component (monthly view)

### Reflections
- Backend was well-structured from Milestone 0
- Growth service already had streak computation
- Main effort: Tags API + Frontend UI components
- Cottage-core aesthetic: muted greens (#90BE6D), warm browns (#4a3b2e), cream backgrounds

---

## Active Task Tracking
See: `.ai-engineering/milestone-1-tracking.md`

## Code Conventions
- Type hints everywhere (Python & TS)
- Docstrings on key models/services
- Pydantic for validation
- SQLAlchemy ORM
- Cottage-core aesthetic: muted greens, warm browns, cream, dusty pink/lavender
