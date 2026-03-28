# Pet Adoption Platform - Backend

## Quick Start

```bash
# 1. Start PostgreSQL
brew services start postgresql

# 2. Create database
createdb pet_adoption

# 3. Install dependencies
cd backend
npm install

# 4. Start server
npm run dev

# 5. Verify it works
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test User"}'
```

---

## Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)

---

## Installation

```bash
cd backend
npm install
```

**Dependencies (with versions):**
- express: ^5.2.1
- cors: ^2.8.6
- dotenv: ^17.3.1
- pg: ^8.20.0
- bcryptjs: ^3.0.3

**Dev dependencies (with versions):**
- nodemon: ^3.1.14
- jest: ^30.3.0
- supertest: ^7.2.2

---

## Configuration

Edit `backend/.env`:

```env
PORT=3001
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_adoption
```

---

## Running the Application

### Start Database
```bash
# Using Homebrew
brew services start postgresql
createdb pet_adoption

# Or using Docker
docker run --name pet-adoption-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pet_adoption -p 5432:5432 -d postgres
```

### Start Server
```bash
cd backend
npm run dev
```

---

## Running Tests

```bash
cd backend
npm test
```

**26 unit tests** covering:
- Password Hashing (bcrypt)
- Auth Service (business logic)
- Auth Controller (request/response)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| POST | /api/auth/admin/login | Admin login |

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── authController.js   # Request/response handling
│   ├── services/
│   │   └── authService.js      # Business logic
│   ├── routes/
│   │   └── authRoutes.js       # API endpoints
│   ├── sql/
│   │   └── users.js            # SQL queries
│   ├── db.js                   # Database connection
│   └── server.js               # Express server
├── migrations/
│   └── createTables.js         # Database migrations
├── tests/
│   ├── bcrypt.test.js
│   ├── authService.test.js
│   └── authController.test.js
├── .env
└── package.json
```

### Code Architecture

| Layer | File | Responsibility |
|-------|------|----------------|
| Routes | `routes/authRoutes.js` | Define API endpoints |
| Controller | `controllers/authController.js` | Handle request/response |
| Service | `services/authService.js` | Business logic |
| SQL | `sql/users.js` | Database queries |
