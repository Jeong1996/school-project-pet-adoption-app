# Pet Adoption Platform

A full-stack web application connecting animal shelters and rescues with potential adopters.

---

## Software Versions

### Development Software
| Software | Version |
|----------|---------|
| Node.js | 25.x |
| npm | 10.x |
| React | 19.x |
| Express.js | 5.x |
| PostgreSQL | 16.x |
| bcryptjs | 3.x |
| jsonwebtoken | 9.x |

### Testing Software
| Software | Version |
|----------|---------|
| Jest | 30.x |
| React Testing Library | 16.x |
| supertest | 7.x |

---

## Quick Start

### Prerequisites
- Node.js 20 or higher
- PostgreSQL 14 or higher

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Jeong1996/school-project-pet-adoption-app.git
cd school-project-pet-adoption-app
```

### Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configure Environment

Create a `.env` file in the `backend` folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_adoption
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key
```

### Start the Application

```bash
# Terminal 1 - Start backend (http://localhost:3001)
cd backend
npm start

# Terminal 2 - Start frontend (http://localhost:3000)
cd frontend
npm start
```

Open http://localhost:3000 in your browser.

---

## Run Tests

```bash
# Backend tests (153 tests)
cd backend
npm test

# Frontend tests (25 tests)
cd frontend
npm test
```

---

## Default Admin Account
- Email: admin@test.com
- Password: admin123

---

## Features
- User registration and login
- Admin authentication
- View available pets
- Submit adoption applications
- Search/filter pets