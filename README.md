# Pet Adoption Platform

A full‑stack web application connecting animal shelters and rescues with potential adopters. Users can register, browse and filter adoptable pets, and submit adoption applications. Admins review and approve / reject those applications.

The app is **PetGram**: a React 19 single‑page app talking to an Express 5 JSON API backed by PostgreSQL 15. The database (schema + 12 pets + 5 demo users + default admin + 5 sample applications) is created and seeded automatically the first time the backend starts.

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Tech Stack](#2-tech-stack)
3. [Get It Running in 5 Minutes](#3-get-it-running-in-5-minutes)
4. [Environment Variables](#4-environment-variables)
5. [Useful Commands](#5-useful-commands)
6. [Demo Accounts](#6-demo-accounts)
7. [What You Should See](#7-what-you-should-see)
8. [Project Layout](#8-project-layout)
9. [Running the Tests](#9-running-the-tests)

---

## 1. Prerequisites

Install these first. The commands below show the minimum supported versions.

| Tool | Min version | Check | Install (macOS) |
|------|-------------|-------|-----------------|
| Node.js | 20.x (developed on 25.x) | `node -v` | `brew install node` |
| npm | 10.x (bundled with Node) | `npm -v` | comes with Node |
| PostgreSQL | 14.x (developed on 15.x) | `psql --version` | `brew install postgresql@15 && brew services start postgresql@15` |
| Git | any recent | `git --version` | `brew install git` |

> **PostgreSQL note:** the app's startup code calls `CREATE DATABASE pet_adoption` against the user you put in `DB_USER` (see `backend/migrations/createDatabase.js`). That user therefore needs the `CREATEDB` privilege. The default macOS install creates a role that matches your username with superuser powers, which is fine.

Make sure Postgres is actually running before you start the backend:

```bash
brew services list            # should show postgresql@15 as "started"
# or, on Linux / non-brew:
sudo service postgresql status
```

Sanity check the connection (replace `yoyo` with your role / the value you'll put in `DB_USER`):

```bash
psql -U yoyo -d postgres -c "SELECT 1"
```

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend framework | React | 19.x |
| Frontend routing | React Router | 6.x |
| HTTP client | Axios | 1.x |
| Backend framework | Express | 5.x |
| Auth | jsonwebtoken + bcryptjs | 9.x / 3.x |
| Database | PostgreSQL | 15.x |
| DB driver | node-postgres (`pg`) | 8.x |
| Backend testing | Jest + supertest | 30.x / 7.x |
| Frontend testing | React Testing Library | 16.x |

---

## 3. Get It Running in 5 Minutes

You will need **two terminal tabs** open: one for the backend, one for the frontend.

### Step 1 — Clone

```bash
git clone https://github.com/Jeong1996/school-project-pet-adoption-app.git
cd school-project-pet-adoption-app
```

### Step 2 — Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### Step 3 — Create the two `.env` files

**`backend/.env`** (create it; the repo only contains a working example for the original author):

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_adoption
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

> The server signs auth tokens with a built‑in development secret. Since this app is intended for local use only, you do not need to set `JWT_SECRET` yourself.

**`frontend/.env`** (create it; the React app reads `REACT_APP_API_URL` at build time):

```env
REACT_APP_API_URL=http://localhost:3001/api
```

> The frontend `.env` is **required** for a fresh clone. Without it, the SPA will boot but every API call will fail.

### Step 4 — Start the backend (Terminal 1)

```bash
cd backend
npm start
```

On first start you should see, in order:

```
Database "pet_adoption" already exists    # or: Database "pet_adoption" created
Users table ready
Pets table ready
Applications table ready
Seeding pets...
Pets seeded (12)
Seeding users...
Users seeded (5)
Seeding admin user...
Admin user seeded (admin@test.com / admin123)
Seeding applications...
Applications seeded (5)
Seed complete!
Server running on port 3001
```

The server is ready when you see `Server running on port 3001`. Leave this terminal running.

Smoke test from a third terminal:

```bash
curl http://localhost:3001/
# {"message":"Pet Adoption API"}

curl http://localhost:3001/api/pets | head -c 200
# {"success":true,"count":12,"pets":[{"id":1,"name":"Buddy",...
```

### Step 5 — Start the frontend (Terminal 2)

```bash
cd frontend
npm start
```

This compiles the React app and opens it in your browser at <http://localhost:3000>. (If it doesn't open automatically, just go there manually.) When the bundle is ready you'll see:

```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
```

That's it — you should land on the PetGram landing page with a **Sign up** / **Log in** form.

---

## 4. Environment Variables

| File | Variable | Required? | Default | Purpose |
|------|----------|-----------|---------|---------|
| `backend/.env` | `PORT` | no | `5000` | HTTP port for the API. The README assumes `3001`. |
| `backend/.env` | `DB_HOST` | yes | — | Postgres host (usually `localhost`). |
| `backend/.env` | `DB_PORT` | yes | — | Postgres port (usually `5432`). |
| `backend/.env` | `DB_NAME` | yes | — | Database name. App will create it on first run. |
| `backend/.env` | `DB_USER` | yes | — | Postgres role. Needs `CREATEDB`. |
| `backend/.env` | `DB_PASSWORD` | yes | — | Password for that role. |
| `frontend/.env` | `REACT_APP_API_URL` | yes (for fresh clone) | — | Full base URL of the API, e.g. `http://localhost:3001/api`. |

---

## 5. Useful Commands

All commands assume you are in either `backend/` or `frontend/`.

| Action | Backend | Frontend |
|--------|---------|----------|
| Install deps | `npm install` | `npm install` |
| Start dev server | `npm start` (port 3001) | `npm start` (port 3000) |
| Run all tests | `npm test` | `npm test` |
| Watch tests (Jest) | `npm test -- --watch` | n/a (CRA watches) |
| Production build | n/a | `npm run build` |

> `npm run dev` (nodemon hot‑reload) is wired up in `backend/package.json` but not needed for the first run.

---

## 6. Demo Accounts

The seed script creates these accounts the first time the backend starts.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@test.com` | `admin123` |
| User | `user1@test.com` … `user5@test.com` | `password123` |

To log in as the admin in the UI, go to `/login` and click **"Login as Admin"** before submitting.

You can also register a brand‑new account at `/register` (password must be at least 8 characters).

---

## 7. What You Should See

A healthy stack produces this on screen:

| Check | Expected |
|-------|----------|
| Backend terminal | ends with `Server running on port 3001` |
| `GET http://localhost:3001/` | `{"message":"Pet Adoption API"}` |
| `GET http://localhost:3001/api/pets` | `{"success":true,"count":12,…}` (12 available pets on first run) |
| `psql -d pet_adoption -c "\dt"` | `applications`, `pets`, `users` |
| Browser at <http://localhost:3000> | PetGram landing page with "Sign up" / "Log in" |
| Browser tab title | `PetGram 🐕` |
| After admin login → Home | Card titled **"Applications"** (plural, no "My") — clicking it shows the admin's pending list |

If any of these are off, jump to [Troubleshooting](#10-troubleshooting).

---

## 8. Project Layout

```
school-project-pet-adoption-app/
├── backend/                    Express 5 API server
│   ├── migrations/             Auto‑run SQL (createDatabase, createTables)
│   ├── seed.js                 Demo data: pets, users, admin, applications
│   ├── src/
│   │   ├── server.js           App entry — runs migrations, seeds, then listens
│   │   ├── db.js               Shared `pg` Pool
│   │   ├── routes/             authRoutes, applicationRoutes, petRoutes
│   │   ├── controllers/        HTTP handlers
│   │   ├── services/           Business logic + SQL
│   │   ├── middleware/         adminMiddleware, userMiddleware (JWT)
│   │   └── sql/                Parameterized query strings
│   ├── tests/                  10 Jest suites (175 tests)
│   └── .env                    ← you create this
│
├── frontend/                   React 19 SPA (Create React App)
│   ├── public/                 Static assets
│   ├── src/
│   │   ├── App.js              Router + auth provider
│   │   ├── pages/              Landing, Login, Register, Home, PetList,
│   │   │                       ApplicationForm, ApplicationSuccess,
│   │   │                       Applications, AdminDashboard, Profile
│   │   ├── components/         Navbar, PrivateRoute
│   │   ├── context/            AuthContext (login state, localStorage)
│   │   ├── services/api.js     Axios instance + endpoint helpers
│   │   └── tests/              4 React Testing Library suites (25 tests)
│   └── .env                    ← you create this
│
├── tests/reports/              Test reports (system + unit)
├── README.md                   this file
└── System Testing Plan.md      Manual E2E test specification
```

---

## 9. Running the Tests

```bash
# Backend — 175 tests across 10 suites
cd backend && npm test

# Frontend — 25 tests across 4 suites
cd frontend && CI=true npm test -- --watchAll=false
```

Latest results (as of 2026‑06‑04):

| Suite | Tests | Status |
|-------|-------|--------|
| Backend Jest | 175 | ✅ all pass |
| Frontend RTL | 25 | ✅ all pass |

For the manual end‑to‑end test plan covering the 5 use cases, see `System Testing Plan.md` and the report at `tests/reports/00-system-test-report.md`.
