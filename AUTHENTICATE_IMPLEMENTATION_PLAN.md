# Authenticate Feature Implementation Plan

## Feature: User Authentication
- **Developer**: Yu Gyeom Jeong
- **Scope**: User signup, login, profile management, password hashing

---

## Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Git repository initialized

---

## Step 1: Backend Setup

### 1.1 Initialize Backend Project
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv pg bcryptjs jsonwebtoken jest supertest
npm install --save-dev nodemon
```

### 1.2 Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── validation.js
│   └── index.js
├── tests/
│   └── auth.test.js
├── .env
└── package.json
```

### 1.3 Create Express Server (`src/index.js`)
- Set up Express app
- Add middleware: cors, json parser
- Add routes
- Connect to database
- Start server on port 5000

---

## Step 2: Database Setup

### 2.1 Create Database
```bash
psql -U postgres
CREATE DATABASE pet_adoption;
```

### 2.2 Create Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 Database Connection (`src/config/db.js`)
- Use `pg` library to connect to PostgreSQL
- Export pool connection

---

## Step 3: Backend Implementation

### 3.1 User Model (`src/models/userModel.js`)
```javascript
// Functions:
- createUser(email, passwordHash, name, role)
- findUserByEmail(email)
- findUserById(id)
- updateUser(id, updates)
- deleteUser(id)
```

### 3.2 Validation Utils (`src/utils/validation.js`)
```javascript
// Functions:
- validateEmail(email)        // Returns boolean
- validatePassword(password)  // Returns { valid: boolean, errors: string[] }
- validateName(name)         // Returns boolean
- hashPassword(password)      // Returns hash
- comparePassword(password, hash)  // Returns boolean
```

### 3.3 Auth Controller (`src/controllers/authController.js`)
```javascript
// POST /api/auth/register
- Validate input (email, password, name)
- Check if email already exists
- Hash password
- Create user
- Return token + user data

// POST /api/auth/login
- Validate input
- Find user by email
- Compare password
- Generate JWT token
- Return token + user data

// GET /api/auth/profile
- Get user from request (middleware)
- Return user data (excluding password)
```

### 3.4 Auth Middleware (`src/middleware/auth.js`)
```javascript
// verifyToken middleware
- Get token from header
- Verify JWT token
- Attach user to request
- Call next()
```

### 3.5 Auth Routes (`src/routes/authRoutes.js`)
```
POST   /api/auth/register   - User registration
POST   /api/auth/login     - User login
GET    /api/auth/profile   - Get user profile (protected)
POST   /api/auth/admin/login - Admin login
```

---

## Step 4: Backend Unit Tests

### 4.1 Auth Tests (`tests/auth.test.js`)

#### Authentication Tests
- Valid registration with email and password
- Registration with duplicate email (should fail)
- Registration with invalid email format
- Registration with weak password (too short)
- Registration with missing name

- Valid login with correct credentials
- Login with incorrect password
- Login with non-existent email

#### Password Hashing Tests
- Password is hashed correctly
- Hash is different each time (salt)
- comparePassword returns true for correct password
- comparePassword returns false for wrong password

#### Profile Tests
- Get profile with valid token
- Get profile without token (401)
- Get profile with invalid token (401)

---

## Step 5: Frontend Setup

### 5.1 Initialize React Project
```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### 5.2 Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── PrivateRoute.js
│   │   └── AuthForm.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Profile.js
│   ├── services/
│   │   └── api.js
│   ├── tests/
│   │   ├── Login.test.js
│   │   ├── Register.test.js
│   │   └── Profile.test.js
│   ├── App.js
│   └── index.js
└── package.json
```

---

## Step 6: Frontend Implementation

### 6.1 API Service (`src/services/api.js`)
```javascript
// Axios instance with baseURL
// Interceptors for adding token to requests
// Functions:
- register(email, password, name)
- login(email, password)
- getProfile()
- updateProfile(data)
```

### 6.2 Auth Context (`src/context/AuthContext.js`)
```javascript
// State: user, token, loading
// Functions:
- login(email, password)
- register(email, password, name)
- logout()
- updateUser(data)
```

### 6.3 Register Page (`src/pages/Register.js`)
- Form fields: name, email, password, confirm password
- Validation:
  - Name required (min 2 characters)
  - Email format validation
  - Password min 8 characters
  - Passwords match
- Submit to register API
- Redirect to login on success
- Show error messages

### 6.4 Login Page (`src/pages/Login.js`)
- Form fields: email, password
- Validation:
  - Email required
  - Password required
- Submit to login API
- Store token in localStorage
- Redirect to home on success
- Show error messages

### 6.5 Profile Page (`src/pages/Profile.js`)
- Display user information (name, email)
- Edit profile form
- Update profile functionality

### 6.6 Navbar Component (`src/components/Navbar.js`)
- Show Login/Register when not logged in
- Show Profile/Logout when logged in

### 6.7 Private Route (`src/components/PrivateRoute.js`)
- Redirect to login if not authenticated
- Render children if authenticated

---

## Step 7: Frontend Unit Tests

### 7.1 Register Tests
- Render register form
- Show validation errors for empty fields
- Show error for invalid email
- Show error for weak password
- Show error for password mismatch
- Submit with valid data
- Handle registration error (duplicate email)
- Navigate to login on success

### 7.2 Login Tests
- Render login form
- Show validation errors for empty fields
- Submit with valid credentials
- Handle login error (invalid credentials)
- Store token in localStorage
- Navigate to home on success

### 7.3 Profile Tests
- Show loading while fetching
- Display user information
- Handle unauthorized access (redirect to login)

---

## Implementation Order

### Day 1: Backend Setup
- [ ] Initialize backend project
- [ ] Set up Express server
- [ ] Connect to PostgreSQL

### Day 2: Database & Models
- [ ] Create users table
- [ ] Implement user model
- [ ] Create validation utilities

### Day 3: Backend Controllers & Routes
- [ ] Implement auth controller
- [ ] Create routes
- [ ] Add JWT middleware

### Day 4: Backend Tests
- [ ] Write authentication tests
- [ ] Write password hashing tests
- [ ] Run all tests

### Day 5: Frontend Setup
- [ ] Initialize React project
- [ ] Set up routing

### Day 6-7: Frontend Implementation
- [ ] Create API service
- [ ] Implement AuthContext
- [ ] Build Register/Login/Profile pages

### Day 8: Frontend Tests
- [ ] Write component tests
- [ ] Run all tests

---

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_adoption
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```
