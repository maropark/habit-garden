# Agents Instructions

## Project: Habit Garden

A cozy cottage-core habit + journaling web app using React+TS (frontend), FastAPI (backend), and PostgreSQL.

---

## Version Constraints

**DO NOT change these without explicit permission:**

| Dependency | Version | Reason |
|------------|---------|--------|
| Node.js | 18.x | Current environment constraint |
| Vite | 5.x | Vite 6+/7.x require Node 20.19+ |
| Python | 3.11 | |
| PostgreSQL | 16 | |

**Rule:** Before updating any dependency to a new major version, you MUST:
1. Ask for permission
2. Explain why the upgrade is necessary
3. Note any breaking changes

---

## Running the App

### Development
```bash
# Backend
cd backend && uvicorn app.main:app --reload

# Frontend
cd frontend && npm run dev
```

### With Docker
```bash
docker-compose up --build
```

---

## API Configuration

### Environment Variables for Docker
- `VITE_API_URL`: Frontend API base URL (use `http://backend:8000/api` in Docker)
- `DATABASE_URL`: Backend database connection (use `postgresql://` not `postgres://`)

### CORS
- When running in Docker, add Docker network IPs to backend CORS allow_origins
- Example: `allow_origins=["http://localhost:5173", "http://172.18.0.0/16"]`

---

## Key Files

- `frontend/src/App.tsx` - Main app component
- `frontend/src/components/garden/GardenToday.tsx` - Main garden view
- `backend/app/main.py` - FastAPI app entry
- `backend/app/database.py` - SQLAlchemy setup
- `docker-compose.yml` - Service orchestration

---

## Code Conventions

- Type hints everywhere (Python & TS)
- Docstrings on key models/services
- Pydantic for Python validation
- SQLAlchemy ORM
- Cottage-core aesthetic: muted greens, warm browns, cream, dusty pink/lavender

---

## Common Issues

### Blank white page on frontend
- Check browser console for errors
- Likely cause: Node/Vite version mismatch (see Version Constraints)
- Run `npm run build` locally to verify
- If using Docker: rebuild with `docker-compose up --build`

### Database connection errors
- Ensure PostgreSQL container is running
- Check `DATABASE_URL` uses `postgresql://` not `postgres://`

### Import errors in frontend
- Vite requires ESM. Use `import { x } from './module'` not `require()`

### API calls fail in Docker ("Failed to load garden")
- Frontend in Docker cannot reach host's localhost:8000
- Use Docker internal network: `http://backend:8000`
- Set `VITE_API_URL` environment variable in docker-compose.yml
- Update CORS in backend to allow Docker network IPs
