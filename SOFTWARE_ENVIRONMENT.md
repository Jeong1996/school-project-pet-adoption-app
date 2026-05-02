# Software & Environment Documentation

## 1. Development Software

### Backend
| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 25.1.0 | Backend runtime environment |
| npm | 10.x | Package management |
| Express.js | 5.2.1 | Web application framework |
| PostgreSQL | 15.x | Relational database |
| bcryptjs | 3.0.3 | Password hashing |
| jsonwebtoken | 9.0.3 | Token-based authentication |
| cors | 2.8.6 | Cross-origin resource sharing |
| dotenv | 17.3.1 | Environment variable management |
| pg | 8.20.0 | PostgreSQL client |

### Frontend
| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 25.1.0 | Frontend build tool runtime |
| npm | 10.x | Package management |
| React | 19.2.4 | UI framework |
| React Router | 6.30.3 | Client-side routing |
| Axios | 1.14.0 | HTTP client |
| react-scripts | 5.0.1 | Create React App scripts |

---

## 2. Testing Software

### Backend Testing
| Software | Version | Purpose |
|----------|---------|---------|
| Jest | 30.3.0 | Unit testing framework |
| supertest | 7.2.2 | HTTP API testing |

### Frontend Testing
| Software | Version | Purpose |
|----------|---------|---------|
| @testing-library/react | 16.3.2 | React component testing |
| @testing-library/jest-dom | 6.9.1 | DOM testing utilities |
| @testing-library/user-event | 13.5.0 | User interaction simulation |
| @testing-library/dom | 10.4.1 | DOM testing |

---

## 3. Setup Instructions

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file with:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=pet_adoption
# DB_USER=your_user
# DB_PASSWORD=your_password
# JWT_SECRET=your_jwt_secret

# Run development server
npm run dev

# Run tests
npm test
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm start

# Run tests
npm test
```

---

## 4. Test Environment

### Backend Test Environment
- **Test Framework:** Jest 30.3.0
- **Test Command:** `npm test`
- **Mocking:** Jest mocks for database (pg) and authentication (jsonwebtoken, bcryptjs)
- **Coverage:** All service, controller, and middleware functions tested

### Frontend Test Environment
- **Test Framework:** React Testing Library 16.3.2 + Jest (via react-scripts)
- **Test Command:** `npm test` (runs in watch mode by default)
- **Browser Environment:** jsdom (simulated browser)

---

## 5. Test Results Summary

### Backend Tests
- **Total Tests:** 153
- **Passed:** 153
- **Failed:** 0
- **Test Suites:** 10

### Test Coverage by Module
| Module | Tests | Status |
|--------|-------|--------|
| Auth Service | 14 | ✅ Pass |
| Auth Controller | 10 | ✅ Pass |
| Application Service | 17 | ✅ Pass |
| Application Controller | 15 | ✅ Pass |
| Admin Middleware | 4 | ✅ Pass |
| Pet Service | 24 | ✅ Pass |
| Pet Controller | 18 | ✅ Pass |
| User Middleware | 13 | ✅ Pass |
| SQL Queries | 20 | ✅ Pass |
| Bcrypt | 4 | ✅ Pass |

---

## 6. Testing Methodologies Applied

1. **Triangle Testing (Equivalence Partitioning)**
   - Used for: Input validation, query parameter validation
   - Applied to: Auth inputs, application form fields, search filters

2. **Control Flow Testing**
   - Used for: Business logic, decision-making functions
   - Applied to: Application approval logic, search filtering, CRUD operations

3. **Data Flow Testing**
   - Used for: Data processing, state management
   - Applied to: User registration flow, application submission, API response handling