# Habit Garden – Plan

## 1. Vision & Product

**Goal**: A cozy, cottage-core inspired habit + journaling web app for two people (and maybe a few friends later). It should feel like a digital bullet journal with soft illustrations, cats, yarn, and seasonal vibes, not a cold productivity tool.

**Key principles**
- Gentle, non-punitive tracking (room for off days).
- Reflection is as important as streaks.
- Private by default, running locally.
- Serve as a learning playground for Python, FastAPI, Postgres, and LLMs.

---

## 2. Core Use Cases (V1)

- **Daily checklist**
  - See today’s habits.
  - Mark habits as done/not done (optionally with quantity or notes).
- **Streaks with grace**
  - Show streaks per habit.
  - Support “grace days” or non-punitive streak rules (to define later).
- **Tags & organization**
  - Tag habits (e.g. Movement, Rest, Creative).
  - Filter views by tag.
- **History & insights**
  - Calendar view with color marks per habit/day.
  - Simple charts: completion over time, per tag/habit.
- **Journaling**
  - Free-form text per day, optionally linked to habits/tags.

---

## 3. Future Use Cases (Post-V1)

- **LLM reflections**
  - Chat about the day from any page.
  - Weekly summaries and insights.
  - Pattern spotting (e.g., “you rarely do creative work on Mondays”).
- **Advanced visualization**
  - Mood vs habits correlation.
  - Seasonal views (e.g. “Spring 2026” dashboard).
- **Customization**
  - Themes (different palettes, illustrations).
  - Custom habit templates / ritual flows.
- **Sharing**
  - Optional sharing with a small circle of friends.

---

## 4. UX & Visual Direction

- **Mood**: Cozy cottage-core, inspired by Odd Rabbit, yarn, cats, and soft chibi illustrations.
- **Color palette**: Muted greens, warm browns, cream, touches of dusty pink / lavender.
- **Components**
  - Illustrated calendar with small icons or color swatches for habits.
  - “Today” card with checkboxes and small doodles.
  - Slide-over chat panel accessible via a floating button.
- **Tone of copy**
  - Gentle, kind, non-judgmental, like a quiet friend or journal.

---

## 5. Technical Architecture (Agreed)

### 5.1 Frontend

- **Stack**: React + TypeScript + Vite.
- **Responsibilities**
  - UI for daily checklist, calendar, charts.
  - Local state management (e.g. React Query + backend API).
  - Global chat drawer / side panel.
- **API integration**
  - Start with REST endpoints from the backend.
  - Optionally add a GraphQL client later (e.g. Apollo or urql) for learning.

### 5.2 Backend

- **Stack**: Python + FastAPI.
- **Responsibilities**
  - REST API for habits, logs, journals, tags, and charts.
  - Auth for two users (simple session/JWT).
  - LLM integration endpoints (later).
- **GraphQL**
  - Phase 2: Introduce a GraphQL schema (via Strawberry or Ariadne) for more flexible frontend queries and to learn GraphQL.
  - Keep REST endpoints in parallel for simplicity and backwards compatibility.

### 5.3 Database & Data

- **Primary DB**: PostgreSQL.
  - Optionally start with SQLite in dev; migrate to Postgres once stable.
  - Use an ORM (likely SQLAlchemy) for type-safe models and migrations.
- **Vector support (LLM features, phase 2)**
  - Add `pgvector` extension to Postgres.
  - Store embeddings for journal entries and possibly habit descriptions.
  - Use similarity search for “find similar days” and pattern detection.

### 5.4 LLM / Chat

- **Model hosting**
  - Local model server on the same machine (e.g. Ollama / llama.cpp).
  - Backend calls this service via HTTP or CLI.
- **Features (later phases)**
  - Daily reflection prompts.
  - Weekly summaries over journal + habit logs.
  - Semantic search over past entries and patterns.

---

## 6. Hosting & DevOps

- **Local-only target (initial)**
  - Run everything via `docker-compose` on a single PC.
  - Services: `frontend`, `backend`, `db`, optional `llm`.
- **Access**
  - Local network access (e.g. `http://host-pc:port`).
  - Optionally add a secure tunnel for remote access (later).
- **Environments**
  - `dev`: hot reload for frontend and backend.
  - `prod-local`: a more locked-down configuration, still on the same machine.

---

## 7. Security & Privacy

- **Users**
  - Two primary users (you and partner); design for small-N.
- **Auth**
  - Simple login with username/password.
  - No third-party auth needed initially.
- **Data privacy**
  - All data stored locally in the Postgres database.
  - LLM runs locally; no journal/habit data leaves the machine.

---

## 8. Milestones / Roadmap

**Milestone 0 – Project Skeleton**
- Initialize Vite React TS frontend.
- Initialize FastAPI backend.
- Set up Postgres (or SQLite dev) and ORM.
- Define basic data models: User, Habit, HabitLog, JournalEntry, Tag.

**Milestone 1 – Core Habit Tracking**
- CRUD for habits, tags.
- Daily checklist UI + API.
- Basic streak computation on the backend.
- Calendar view with habit completion marks.

**Milestone 2 – Journaling & Insights**
- Daily journal entries linked to dates and optional habits.
- Simple charts (e.g. completion over time).
- Filters by tag/habit.

**Milestone 3 – Polish & Cottage-Core UI**
- Apply color palette, typography, and illustrations.
- Refine navigation and responsive layout.
- Add small microinteractions (hover states, transitions).

**Milestone 4 – LLM Integration (Local)**
- Set up local model server.
- Backend endpoints to chat with the model.
- Frontend chat drawer accessible from all pages.
- First simple reflection flow (e.g. “How was your day?”).

**Milestone 5 – GraphQL & Vector Search (Learning Focus)**
- Introduce GraphQL schema exposing core entities.
- Add pgvector to Postgres and store embeddings for journals.
- Build one or two LLM features on top of semantic search (e.g. “find similar weeks”).

---

## 9. Documentation & Learning

- **Code style**
  - Type hints everywhere in Python and TS.
  - Docstrings on key models and services.
- **Developer docs**
  - `README` with setup and run instructions.
  - Short “architecture overview` section explaining layers.
  - Inline comments that explain *why*, not just *what*, especially around LLM calls and data modeling.

