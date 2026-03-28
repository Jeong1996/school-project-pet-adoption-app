# Pet Adoption Platform - Backend

## Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)

---

## Installation

### 1. Install dependencies

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

### 2. Configure environment variables

Edit `backend/.env`:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_adoption
```

---

## Starting the Database

### Option A: Using Homebrew (macOS)

```bash
# Start PostgreSQL
brew services start postgresql

# Create the database
createdb pet_adoption
```

### Option B: Using Docker

```bash
docker run --name pet-adoption-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pet_adoption \
  -p 5432:5432 \
  -d postgres
```

---

## Starting the Backend Server

```bash
cd backend
npm run dev
```

The server will:
1. Connect to PostgreSQL
2. Run automatic migrations (create `users` table if not exists)
3. Start on port 5000

**Output:**
```
Users table ready
Server running on port 5000
```

---

## Running Tests

```bash
cd backend
npm test
```

---

## API Endpoints

### Authentication
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
│   ├── migrations/
│   │   └── users.js       # Database migration
│   ├── authController.js  # Auth logic
│   ├── authRoutes.js      # API routes
│   ├── db.js              # Database connection
│   └── server.js          # Express server
├── tests/
│   └── auth.test.js       # Unit tests
├── .env                   # Environment variables
├── package.json
└── README.md
```
