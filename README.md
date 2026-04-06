# ⚡ Synchro

> **Role-based Academic Assignment & Group Management System**  
> Built for Joineazy Full Stack Internship — Task 1

---

## What is Synchro?

Synchro is a full-stack web application that bridges the gap between professors and students in academic group-based workflows.

Professors post assignments, students form groups, collaborate, and confirm submissions — all in one unified dark-themed interface.

---

## ✦ Features

### Student
- Register & login with JWT-secured sessions
- Create groups and invite members by email
- View all assignments with due dates and OneDrive links
- Confirm group submission with an optional submission link
- Track group progress with a live progress bar and completion badges

### Admin (Professor)
- Create, edit, and delete assignments
- Assign to all groups or specific groups only
- Monitor group-wise submission status
- Analytics dashboard — total groups, assignments, submitted, pending

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS v3 |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL (raw `pg` — no ORM) |
| Auth | JWT (role-based: student / admin) |
| Containers | Docker + docker-compose |

---

## 🚀 Setup & Run

### Prerequisites
- Docker & Docker Compose installed

### One command to run everything

```bash
git clone https://github.com/Joy0810/Synchro.git
cd Synchro
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:4000 |
| PostgreSQL | localhost:5432 |

> The DB schema is auto-applied on first run via `docker-entrypoint-initdb.d`.

### Local frontend dev (optional)

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register     { name, email, password, role }
POST   /api/auth/login        { email, password }
GET    /api/auth/me           → current user from JWT
```

### Groups
```
GET    /api/groups                        → all groups (student: own, admin: all)
POST   /api/groups                        { name }
POST   /api/groups/:id/members            { email }
DELETE /api/groups/:id/members/:userId
DELETE /api/groups/:id
PATCH  /api/groups/:id/owner              { newOwnerId }
```

### Assignments
```
GET    /api/assignments                   → visible assignments
POST   /api/assignments                   [admin] { title, description, due_date, drive_link, assigned_to, group_ids? }
PUT    /api/assignments/:id               [admin]
DELETE /api/assignments/:id               [admin]
```

### Submissions
```
POST   /api/submissions                   { assignment_id, group_id, submission_link }
GET    /api/submissions/group/:group_id   → group's submissions
GET    /api/submissions/admin             [admin] → all submissions
```

### Analytics
```
GET    /api/analytics/overview            [admin] → { total_groups, total_assignments, submitted_count, pending_count }
```

> All responses follow: `{ success: true, data: { ... } }`

---

## 🗄 Database Schema

```sql
users           → id, name, email, password (bcrypt), role (student|admin)
groups          → id, name, owner_id (→ users)
group_members   → group_id, user_id  [composite PK]
assignments     → id, title, description, due_date, drive_link, assigned_to (all|specific)
assignment_groups → assignment_id, group_id  [for specific assignments]
submissions     → id, assignment_id, group_id, confirmed_by, confirmed_at, submission_link
                  UNIQUE (assignment_id, group_id)
```

### Relationships

```
users ──< group_members >── groups
groups ──< assignment_groups >── assignments
submissions ──> assignments
submissions ──> groups
submissions ──> users (confirmed_by)
```

---

## 🏗 Architecture

```
Browser (React + Vite)
    │
    │  HTTP + JWT Bearer
    ▼
Express API (Node.js)
    │  auth.middleware  →  verifyToken + requireRole
    │
    ├── routes/
    ├── services/   (business logic)
    └── models/     (raw SQL via pg)
         │
         ▼
    PostgreSQL (Docker volume)
```

**Auth Flow:**
1. Register → bcrypt hash → store in DB
2. Login → compare hash → sign JWT (5h expiry)
3. Frontend stores token in `localStorage`
4. Every request sends `Authorization: Bearer <token>`
5. Middleware verifies → attaches `req.user`
6. `requireRole('admin')` guards admin-only routes

---

## 🐳 Deployment Decisions

- **Docker Compose** orchestrates all 3 services (frontend, backend, db) with a single command
- **Health check** on DB ensures backend only starts after PostgreSQL is ready
- **Raw SQL** over ORM for full control, transparency, and performance
- **JWT** stateless auth — no sessions, scales horizontally
- **Vite + serve** for optimized static frontend build served in container
- **Role-based routing** — students and admins land on different dashboards post-login
- **Response envelope** `{ success, data }` pattern for consistent API responses

---

## 📁 Project Structure

```
synchro/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   └── src/
│       ├── api/          axios instance + JWT interceptor
│       ├── contexts/     AuthContext (login, logout, session restore)
│       ├── pages/
│       │   ├── auth/     Login, Register
│       │   ├── student/  Dashboard, Assignments, MyGroup, Submissions
│       │   └── admin/    Dashboard, Assignments, Groups, Submissions
│       └── components/   Navbar, AdminNavbar, Cards, Tables
└── backend/
    ├── Dockerfile
    └── src/
        ├── config/       DB connection pool
        ├── middleware/   auth, error handling
        ├── models/       raw SQL queries
        ├── services/     business logic layer
        └── routes/       Express routers
```

---

## 👤 Test Credentials

Register via `/register` with role `student` or `admin`.

---

<div align="center">
  <sub>Built with focus by Joy — Joineazy Internship Task 1, April 2026</sub>
</div>