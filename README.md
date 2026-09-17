# Taskflow MVP

Taskflow is a streamlined task management dashboard built with React, Vite, plain CSS, Node.js, and Express. It provides a Kanban board for a small product launch team without authentication, Redux, Tailwind, Docker, or real-time collaboration.

## What Was Built

The application was implemented in focused layers:

1. A Vite React frontend was created with a development proxy from `/api` to the Express server.
2. The Express backend was split into routes, controllers, middleware, and a data-access layer.
3. The initial data layer uses an in-memory JavaScript store so the app runs without setup.
4. Optional PostgreSQL/Neon support was added behind `DATABASE_URL` using parameterized queries.
5. The starter Kanban board was expanded into a dashboard with task CRUD, users, filters, assignments, and workload calculations.
6. The frontend was built and the API was exercised with health, user, create-task, update-task, and delete-task checks.

## Features

- Three-column Kanban board: To-Do, In Progress, and Done
- Native HTML5 drag-and-drop status changes
- Task creation, editing, deletion, and assignment
- Priority filter across the board
- Due dates, descriptions, priority badges, and assignee avatars
- Team workload section with total assigned and in-progress counts
- Red pulsing workload warning when a user has more than 5 in-progress tasks
- Loading and API error states
- Seed data with 6 users and 12 tasks
- Optional Neon PostgreSQL integration

The workload warning is derived from current task state. The condition is strictly `inProgressCount > 5`, so a user with exactly 5 in-progress tasks is not marked over capacity.

## Project Structure

```text
.
├── backend/
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── data/
│   │   └── tasks.js
│   ├── db/
│   │   └── db.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── schema.sql
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

From the project root:

```powershell
npm install --prefix frontend
npm install --prefix backend
```

The frontend uses React, React DOM, Vite, and the Vite React plugin. The backend uses Express, CORS, and `pg` for optional PostgreSQL support.

## Running Locally

Start the backend in one terminal:

```powershell
npm run server
```

The API runs at `http://localhost:3001`.

Start the frontend in a second terminal:

```powershell
npm run dev
```

Open `http://localhost:5173` in a browser. The Vite proxy forwards frontend `/api` requests to port 3001.

The root `package.json` also provides:

```powershell
npm run build
```

This creates the production frontend build in `frontend/dist`.

## Environment Variables and Neon

The default configuration requires no environment variables. The backend uses the in-memory store when `DATABASE_URL` is not set.

To enable Neon PostgreSQL:

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to the Neon connection string.
3. Run `backend/models/schema.sql` against the database.
4. Start the backend normally with `npm run server`.

Never commit `.env`. The `.gitignore` file excludes it.

The database adapter switches to PostgreSQL automatically when `DATABASE_URL` exists. SQL values are passed through parameterized queries and the connection string is never hard-coded.

## API Endpoints

### Health

- `GET /api/health`

### Tasks

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`

### Projects

- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`

## Validation Completed

- Frontend production build completed successfully with Vite.
- Express server started successfully on port 3001.
- `GET /api/health` returned `{ "status": "ok", "database": "in-memory" }` without Neon configuration.
- Seeded users and tasks loaded successfully.
- Temporary task create, update, and delete requests completed successfully.
- Vite served the frontend entry page with HTTP 200.
- Main frontend and backend files reported no editor diagnostics.

## Current Assumptions

- The project remains organized as the existing `frontend` and `backend` folders rather than being renamed to `client` and `server`.
- The MVP runs the frontend and backend in separate terminals; no process runner was added.
- Projects are available through the API and seed data, but the dashboard currently focuses on the seeded Product launch project.
- PostgreSQL schema execution and Neon credentials are intentionally left to the developer because the in-memory mode is the default working configuration.
