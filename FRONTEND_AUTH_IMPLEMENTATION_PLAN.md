# Frontend Authentication Implementation Plan

## Feature: User Authentication (Frontend)
- **Developer**: Xinyi Gu
- **Scope**: Registration form, login form, user session management, input validation, responsive UI

---

## Prerequisites
- Node.js (v18 or higher)
- npm
- Backend server running on port 3001
- PostgreSQL database running

---

## Step 1: Frontend Setup

### 1.1 Initialize React Project
```bash
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### 1.2 Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── PrivateRoute.js
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
│   │   └── AuthContext.test.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

### 1.3 Configure Environment
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:3001/api
```

---

## Step 2: API Service

### `src/services/api.js`
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const register = (email, password, name) => 
  api.post('/auth/register', { email, password, name });

export const login = (email, password) => 
  api.post('/auth/login', { email, password });

export const adminLogin = (email, password) => 
  api.post('/auth/admin/login', { email, password });

export default api;
```

---

## Step 3: Auth Context

### `src/context/AuthContext.js`
```javascript
import { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, adminLogin as apiAdminLogin } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const userData = response.data.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (email, password, name) => {
    const response = await apiRegister(email, password, name);
    return response.data.user;
  };

  const adminLogin = async (email, password) => {
    const response = await apiAdminLogin(email, password);
    const userData = response.data.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

---

## Step 4: Pages

### 4.1 Register Page (`src/pages/Register.js`)
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
```

### 4.2 Login Page (`src/pages/Login.js`)
```javascript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
```

### 4.3 Profile Page (`src/pages/Profile.js`)
```javascript
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
```

---

## Step 5: Components

### 5.1 Navbar (`src/components/Navbar.js`)
```javascript
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Pet Adoption</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
```

### 5.2 Private Route (`src/components/PrivateRoute.js`)
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
```

---

## Step 6: App Setup

### `src/App.js`
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<div>Home - Pet Listings Coming Soon</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

## Step 7: Frontend Unit Tests

### 7.1 Register Tests (`src/tests/Register.test.js`)
- Render register form
- Show validation errors for empty name
- Show validation errors for invalid email
- Show validation errors for short password
- Show validation errors for password mismatch
- Submit with valid data
- Handle registration error (duplicate email)
- Navigate to login on success

### 7.2 Login Tests (`src/tests/Login.test.js`)
- Render login form
- Show validation errors for empty fields
- Submit with valid credentials
- Handle login error (invalid credentials)
- Navigate to home on success

### 7.3 AuthContext Tests (`src/tests/AuthContext.test.js`)
- Provide user context
- Login updates user state
- Logout clears user state
- Persist user to localStorage

---

## Step 8: Running the Application

### Start Backend (in one terminal)
```bash
cd backend
npm run dev
```

### Start Frontend (in another terminal)
```bash
cd frontend
npm start
```

### Test Endpoints
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

---

## Quick Start Commands

```bash
# 1. Start PostgreSQL
brew services start postgresql
createdb pet_adoption

# 2. Start backend
cd backend
npm run dev

# 3. Start frontend (in new terminal)
cd frontend
npx create-react-app frontend
cd frontend
npm install axios react-router-dom
npm start
```

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── PrivateRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Profile.js
│   ├── services/
│   │   └── api.js
│   ├── tests/
│   │   ├── Register.test.js
│   │   ├── Login.test.js
│   │   └── AuthContext.test.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```
