# AI Engineering Context - Habit Garden

## Project Overview
- **Name:** Habit Garden
- **Type:** Cozy cottage-core habit + journaling web app
- **Stack:** React+TS (frontend), FastAPI (backend), PostgreSQL (database)
- **Users:** 2 primary users (local-first, private)

## Version Constraints (DO NOT CHANGE without permission)
- **Node.js:** 18.x - Required for this environment
- **Vite:** 5.x - Vite 7.x requires Node.js 20.19+, do NOT upgrade to 6.x or 7.x without asking
- **Python:** 3.11
- **PostgreSQL:** 16

> **IMPORTANT:** Before updating any dependency to a new major version, you MUST ask for permission. Explain why the upgrade is necessary and what breaking changes it introduces.

## Docker Configuration (Critical)
- Frontend API calls must use `http://backend:8000` (not `localhost:8000`)
- Set `VITE_API_URL` in docker-compose.yml for frontend
- CORS must allow Docker network IPs (e.g., `http://172.18.0.0/16`)
- Use `postgresql://` not `postgres://` in DATABASE_URL

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
