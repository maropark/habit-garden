# Docker Development Notes

## CORS Configuration

The frontend and backend run in Docker with these hostnames:
- Frontend: `http://frontend:5173`
- Backend: `http://backend:8000`

### API Base URL
The frontend uses `VITE_API_URL` from `.env` (defaults to `http://backend:8000/api` for Docker).

### CORS Origins
The backend (`backend/main.py`) must allow both:
- `http://localhost:5173` - for local development
- `http://frontend:5173` - for Docker development

If you add new frontend origins, update `allow_origins` in `backend/main.py`.
