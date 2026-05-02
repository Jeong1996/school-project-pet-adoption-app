# Pet Adoption Platform

A full-stack web application connecting animal shelters and rescues with potential adopters.

---

## Software Versions

### Development Software

#### Backend
| Software | Version |
|----------|---------|
| Node.js | 25.x |
| npm | 10.x |
| Express.js | 5.x |
| PostgreSQL | 15.x |
| bcryptjs | 3.x |
| jsonwebtoken | 9.x |

#### Frontend
| Software | Version |
|----------|---------|
| Node.js | 25.x |
| npm | 10.x |
| React | 19.x |
| React Router | 6.x |
| Axios | 1.x |

---

### Testing Software

#### Backend
| Software | Version |
|----------|---------|
| Jest | 30.x |
| supertest | 7.x |

#### Frontend
| Software | Version |
|----------|---------|
| React Testing Library | 16.x |
| @testing-library/jest-dom | 6.x |
| @testing-library/user-event | 13.x |

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
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## Test Results

### Backend Tests
- **Total:** 153 tests
- **Passed:** 153 ✅
- **Failed:** 0

### Frontend Tests
- **Total:** 25 tests
- **Passed:** 25 ✅

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