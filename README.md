# Task Manager

A simple task manager app with a React frontend and Express backend.

## Setup

**Backend**

```
cd backend
npm install
npm run dev
```

Runs on http://localhost:4000

**Frontend**

```
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173

## Features

- Create, edit, and delete tasks
- Set priority: low, medium, high
- Mark tasks as complete
- Filter by all / completed / pending
- Tasks display in a carousel

## API

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| PATCH | /api/tasks/:id/toggle | Toggle completed |
