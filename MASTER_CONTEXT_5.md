# MASTER CONTEXT — Synchro Full Stack Internship Task (Joineazy)

> Share this file at the start of any new chat to restore full context instantly.

---

## 📋 Task Summary

**App Name**: Synchro  
**Role**: Full Stack Intern @ Joineazy  
**Deadline**: Tuesday, 7th April 2026 — 10:30 AM IST  
**Submission**: PDF with GitHub repo link + demo video link  
**Filename**: `<FullName>-Task1.pdf`  
**Submission link**: https://forms.gle/WTeNzAxPpSkzqd3n7  
**GitHub Repo**: https://github.com/Joy0810/Synchro

---

## 🎯 What We're Building

A **role-based full-stack web app** — Student & Group & Assignment Management System.

### Two Roles
| Role | Can Do |
|------|--------|
| **Student** | Register/login, create group, add members, view assignments, access OneDrive links, confirm submission with submission link, track group progress |
| **Admin (Professor)** | Create/edit/view assignments, assign to all or specific groups, track submission status, view analytics |

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js + Vite + TypeScript + Tailwind CSS (v3) |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL (raw `pg` — NO ORM, NO Prisma) |
| Auth | JWT (role-based: student / admin) |
| Containerization | Docker + docker-compose |
| Frontend Design | Stitch by Google (design) + Antigravity (vibe coding with Stitch MCP) |

---

## 📁 Project Structure

```
synchro/
├── .gitignore                  ✅ done
├── docker-compose.yml          ✅ done
├── README.md
├── frontend/
│   ├── Dockerfile              ← fill after frontend done
│   ├── package.json            ✅ done (includes react-router-dom, tailwindcss@3)
│   ├── tailwind.config.js      ✅ done
│   ├── postcss.config.js       ✅ done
│   └── src/
│       ├── main.tsx
│       ├── App.tsx             ✅ done (routes configured)
│       ├── index.css           ✅ done (tailwind imports + custom styles)
│       ├── types/
│       ├── api/
│       ├── contexts/
│       ├── hooks/
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── Login.tsx         ✅ done
│       │   │   └── Register.tsx      ✅ done
│       │   ├── student/
│       │   │   ├── StudentDashboard.tsx  ✅ done
│       │   │   ├── Assignments.tsx       ✅ done
│       │   │   ├── MyGroup.tsx           ✅ done
│       │   │   └── Submissions.tsx       ✅ done
│       │   └── admin/
│       │       ├── AdminDashboard.tsx    ⏳ in progress (prompted, not verified yet)
│       │       ├── AdminAssignments.tsx  ← next
│       │       ├── AdminGroups.tsx       ← next
│       │       └── AdminSubmissions.tsx  ← next
│       └── components/
│           ├── layout/
│           └── ui/
│               ├── Navbar.tsx            ✅ done (student navbar, active state, logged in/out)
│               ├── AssignmentCard.tsx    ✅ done
│               ├── GroupCard.tsx         ✅ done
│               ├── SubmissionTable.tsx   ✅ done
│               └── EmptyState.tsx        ✅ done
└── backend/
    ├── .gitignore              ✅ done
    ├── Dockerfile              ✅ done
    ├── package.json            ✅ done
    ├── tsconfig.json           ✅ done
    └── src/
        ├── index.ts            ✅ done
        ├── db/
        │   └── schema.sql      ✅ done
        ├── config/
        │   └── db.ts           ✅ done
        ├── types/
        │   └── index.ts        ✅ done
        ├── middleware/
        │   ├── auth.middleware.ts   ✅ done
        │   └── error.middleware.ts  ✅ done
        ├── models/
        │   ├── user.model.ts        ✅ done
        │   ├── group.model.ts       ✅ done
        │   ├── assignment.model.ts  ✅ done
        │   └── submission.model.ts  ✅ done
        ├── services/
        │   ├── auth.service.ts      ✅ done
        │   ├── group.service.ts     ✅ done
        │   ├── assignment.service.ts✅ done
        │   ├── submission.service.ts✅ done
        │   └── analytics.service.ts ✅ done
        └── routes/
            ├── auth.routes.ts       ✅ done
            ├── group.routes.ts      ✅ done
            ├── assignment.routes.ts ✅ done
            ├── submission.routes.ts ✅ done
            └── analytics.routes.ts  ✅ done
```

---

## 🗄️ Database Schema (FINAL)

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    UNIQUE NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    role        VARCHAR(50)     NOT NULL CHECK (role IN ('student', 'admin')),
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS groups (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    owner_id    UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
    group_id    UUID            NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id     UUID            NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at   TIMESTAMPTZ     DEFAULT NOW(),
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS assignments (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255)    NOT NULL,
    description TEXT,
    due_date    TIMESTAMPTZ     NOT NULL,
    drive_link  VARCHAR(500),
    created_by  UUID            REFERENCES users(id) ON DELETE SET NULL,
    assigned_to VARCHAR(10)     DEFAULT 'all' CHECK (assigned_to IN ('all', 'specific')),
    created_at  TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_groups (
    assignment_id   UUID        NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id        UUID        NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (assignment_id, group_id)
);

CREATE TABLE IF NOT EXISTS submissions (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id   UUID        NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_id        UUID        NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    confirmed_by    UUID        REFERENCES users(id) ON DELETE SET NULL,
    confirmed_at    TIMESTAMPTZ,
    submission_link VARCHAR(500),
    UNIQUE (assignment_id, group_id)
);
```

> ⚠️ `submission_link` was added via migration after initial schema:
> `ALTER TABLE submissions ADD COLUMN submission_link VARCHAR(500);`

---

## 🔌 API Endpoints

### Auth
```
POST /api/auth/register    { name, email, password, role }
POST /api/auth/login       { email, password }  → { token, user }
GET  /api/auth/me          → current user (from JWT)
```

### Groups (student + admin)
```
GET    /api/groups                   → my groups with members (admin sees all)
POST   /api/groups                   { name } → create group (student only)
POST   /api/groups/:id/members       { email } → add member
DELETE /api/groups/:id/members/:uid  → remove member
DELETE /api/groups/:id               → delete group (owner or admin)
PATCH  /api/groups/:id/owner         { newOwnerId } → transfer ownership (owner or admin)
```

### Assignments
```
GET    /api/assignments              → all assignments visible to me
POST   /api/assignments              [admin] { title, description, due_date, drive_link, assigned_to, group_ids? }
PUT    /api/assignments/:id          [admin] update
DELETE /api/assignments/:id          [admin] delete
```

### Submissions
```
POST /api/submissions                      { assignment_id, group_id, submission_link }
GET  /api/submissions/group/:group_id      → my group's submissions
GET  /api/submissions/admin               [admin] → all submissions
```

### Analytics (admin only)
```
GET /api/analytics/overview   → { total_groups, total_assignments, submitted_count, pending_count }
GET /api/analytics/groups     → per-group: { id, name, submitted_count, total_assignments, pending_count }
```

---

## 🔐 Auth Flow

1. Register → bcrypt hash password → store in DB
2. Login → compare hash → sign JWT `{ userId, role, email }` 5h expiry
3. Frontend stores token in `localStorage`
4. Every request sends `Authorization: Bearer <token>`
5. `auth.middleware.ts` verifies → attaches `req.user`
6. `requireRole('admin')` guards admin routes

---

## 🖥️ Frontend Routes (configured in App.tsx)

```
/                   → redirect to /login
/login              → Login.tsx
/register           → Register.tsx
/dashboard          → StudentDashboard.tsx
/assignments        → Assignments.tsx (student)
/my-group           → MyGroup.tsx (student)
/submissions        → Submissions.tsx (student)
/admin/dashboard    → AdminDashboard.tsx ⏳
/admin/assignments  → AdminAssignments.tsx ← next
/admin/groups       → AdminGroups.tsx ← next
/admin/submissions  → AdminSubmissions.tsx ← next
```

---

## 🎨 Frontend Build Pattern (HOW WE WORK)

We use **Stitch by Google** for UI design and **Antigravity** (with Stitch MCP connected) for vibe coding.

### Workflow per page:
1. Design page in Stitch (desktop, 1280x1060, dark theme matching "Synchro Dashboard Refined")
2. Screenshot shared → decide what to keep/remove based on backend
3. Give Antigravity a prompt to implement directly

### Antigravity Prompt Rules (ALWAYS include these):
- Skip the implementation plan and directly implement everything without asking for approval
- Do NOT run `npm run dev` under any circumstances, not even once
- Do NOT start dev server
- Do NOT create multiple running instances
- Do NOT create a new project
- Only create/update files inside current frontend codebase
- Run `npm run build` at the end to verify no errors

### Design Rules for Stitch:
- Always 1280x1060 canvas
- Desktop layout only, no mobile
- Dark theme matching "Synchro Dashboard Refined"
- Same fonts: Space Grotesk, Manrope, Inter
- Same sidebar navbar style

### Things ALWAYS removed from Stitch designs (not in our backend):
- Search bar
- Bell / notification icon
- Settings icon
- Any subtitle under brand name ("Academic Portal", "Academic Architect" etc.)
- Any AI tip / insight cards
- Any analytics charts or graphs
- Pagination
- Export CSV buttons
- Floating "+" buttons
- Footer text

### Dummy state toggle:
Every page has a debug toggle button (bottom-right corner) to switch between filled and empty states for testing. Same style across all pages.

### Navbar behavior:
- Student navbar: Dashboard, Assignments, My Group, Submissions, Logout
- Admin navbar: Dashboard, Assignments, Groups, Submissions, Logout (separate component from student navbar)
- If NOT logged in → show Sign In + Register buttons
- If logged in → show circular profile avatar + name
- Active page is highlighted in cyan

---

## 🌿 Git Branching Strategy

```
main   ← final, only merge from dev at the end
dev    ← integration branch

feat/docker-compose       ✅ merged to dev
feat/db-schema            ✅ merged to dev
feat/backend-scaffold     ✅ merged to dev
feat/backend-types        ✅ merged to dev
feat/auth                 ✅ merged to dev
feat/groups               ✅ merged to dev
feat/assignments          ✅ merged to dev
feat/submissions          ✅ merged to dev
feat/analytics            ✅ merged to dev
feat/frontend-auth        ✅ merged to dev
feat/frontend-student     ✅ merged to dev
feat/frontend-admin       ← in progress
```

### Commit message format
```
feat: add ...       ← new feature/file
fix: correct ...    ← bug fix
chore: add ...      ← config, gitignore, lockfile
refactor: ...       ← restructuring
```

### Git workflow (direct local merge — no PR)
```bash
git add .
git commit -m "feat: add <page>"
git push origin feat/<branch>
git checkout dev
git merge feat/<branch>
git push origin dev
git checkout -b feat/<next-branch>
```

---

## ✅ What's Done

### Backend (100% complete)
- All models, services, routes for auth, groups, assignments, submissions, analytics
- JWT auth middleware, error middleware
- Docker + docker-compose configured

### Frontend (in progress)
- Tailwind CSS v3 installed and configured
- react-router-dom installed and configured
- Auth pages: Login ✅, Register ✅
- Student pages: Dashboard ✅, Assignments ✅, My Group ✅, Submissions ✅
- Admin pages: AdminDashboard ⏳ (prompted, verify with npm run dev), AdminAssignments ❌, AdminGroups ❌, AdminSubmissions ❌

---

## ⏭️ What's Next

1. Verify AdminDashboard looks correct (run `npm run dev`)
2. Design + build Admin Assignments page (Stitch → Antigravity)
3. Design + build Admin Groups page (Stitch → Antigravity)
4. Design + build Admin Submissions page (Stitch → Antigravity)
5. Wire up auth (replace dummy states with real JWT + API calls)
6. Connect all pages to backend API
7. Fill frontend Dockerfile
8. Test full flow with Docker
9. Record demo video
10. Submit PDF with GitHub link + demo video link

---

## 💬 How to Resume in a New Chat

Paste this message:
> "Here's my master context for the Synchro / Joineazy internship project: [attach this file].
> Backend is 100% done. Frontend student pages all done (Dashboard, Assignments, MyGroup, Submissions, Login, Register). Currently building admin pages.
> Stack: React + Vite + TS (frontend), Node + Express + TS (backend), PostgreSQL raw pg, Docker, JWT.
> NO Prisma, NO ORM. Raw SQL only. Zod for validation in routes.
> We design in Stitch (Google), vibe code with Antigravity (has Stitch MCP connected).
> Deadline: Tuesday 7th April 2026 10:30 AM IST."
