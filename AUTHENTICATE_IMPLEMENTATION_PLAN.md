# Authenticate Feature Implementation Plan

## Feature: User Authentication
- **Developer**: Yu Gyeom Jeong
- **Scope**: User signup, login, profile management, password hashing

---

## Prerequisites
- Node.js installed
- PostgreSQL installed and running

---

## Step 1: Backend Setup

### 1.1 Initialize Backend Project
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv pg bcryptjs
npm install --save-dev nodemon jest supertest
```

### 1.2 Project Structure
```
backend/
├── src/
│   ├── db.js              # Database connection
│   ├── authController.js   # Auth logic
│   ├── authRoutes.js      # Routes
│   └── server.js          # Express server
├── tests/
│   └── auth.test.js
├── .env
└── package.json
```

### 1.3 Create Express Server (`src/server.js`)
- Set up Express app
- Add cors and json parser
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Step 3: Backend Implementation

### 3.1 Database Connection (`src/db.js`)
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});
module.exports = pool;
```

### 3.2 Auth Controller (`src/authController.js`)

```javascript
const bcrypt = require('bcryptjs');
const pool = require('./db');

// POST /api/auth/register
async function register(req, res) {
  const { email, password, name } = req.body;
  
  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields required' });
  }
  
  // Check email format
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Check password strength (min 8 chars)
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  
  try {
    // Check if email exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role',
      [email, passwordHash, name]
    );
    
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// POST /api/auth/admin/login
async function adminLogin(req, res) {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'admin']);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login, adminLogin };
```

### 3.3 Auth Routes (`src/authRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { register, login, adminLogin } = require('./authController');

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);

module.exports = router;
```

---

## Step 4: Backend Unit Tests

### tests/auth.test.js
```javascript
const bcrypt = require('bcryptjs');

describe('Auth Controller', () => {
  // Test valid registration
  // Test duplicate email
  // Test invalid email format
  // Test weak password
  // Test valid login
  // Test invalid password
  // Test non-existent email
  // Test admin login
});

describe('Password Hashing', () => {
  // Test hash is created
  // Test hash is different each time
  // Test comparePassword works
});
```

Run tests: `npm test`

---

## Step 5: Frontend Setup

### 5.1 Initialize React Project
```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
```

### 5.2 Project Structure
```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── App.js
│   └── index.js
└── package.json
```

---

## Step 6: Frontend Implementation

### 6.1 API Service (`src/api.js`)
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = (email, password, name) => 
  axios.post(`${API_URL}/register`, { email, password, name });

export const login = (email, password) => 
  axios.post(`${API_URL}/login`, { email, password });

export const adminLogin = (email, password) => 
  axios.post(`${API_URL}/admin/login`, { email, password });
```

### 6.2 Register Page (`src/pages/Register.js`)
- Form: name, email, password, confirm password
- Validate: name required, valid email, password min 8 chars, passwords match
- Call register API
- Redirect to login on success

### 6.3 Login Page (`src/pages/Login.js`)
- Form: email, password
- Validate: fields required
- Call login API
- Store user in localStorage
- Redirect to home on success

---

## Step 7: Frontend Unit Tests

Run tests: `npm test`

---

## How to Run

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run dev
# Server runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

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
```
