# Habit Garden

Local-first, cozy cottage-core habit and journaling app for two people, built as a learning playground for Python (FastAPI), Postgres, React, and LLMs.

## Stack

- **Frontend**: React + TypeScript + Vite (served via Node in dev mode)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Orchestration**: Docker Compose

## Running the project (dev)

From the project root:

```bash
docker compose up --build
```

Services:

- `frontend`: http://localhost:5173
- `backend`: http://localhost:8000 (health check at `/health`)
- `db` (Postgres): `postgres://habit_garden:habit_garden_password@localhost:5432/habit_garden`

> Note: For now the backend does not yet connect to the database; wiring models and migrations will come in a later milestone.

