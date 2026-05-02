# Pet Adoption Platform - Implementation Plan

## Project Overview
- **Project Name**: Pet Adoption Platform
- **Type**: Full-stack web application (React + Express.js)
- **Architecture**: Client-server-database
- **Purpose**: Connect animal shelters/rescues with potential adopters
- **Target Users**: Pet shelters, rescue organizations, individuals seeking to adopt pets

---

## Team Roles & Feature Assignments

| Team Member | Role | Features |
|-------------|------|----------|
| Yu Gyeom Jeong | Lead Full Stack Developer | Authenticate, Apply |
| You Wu | Full Stack Developer | Search |
| Xinyi Gu | Full Stack Developer | Front-end UI, input validation, responsive design |

---

## Major Features

### 1. Authenticate (Yu Gyeom Jeong)
- User signup with email and password
- Secure login functionality
- Profile creation and management
- Password hashing with validation

### 2. View
- Display all available pet listings
- Show latest pet information
- Grid/list view of available pets

### 3. Search (You Wu)
- Filter by species (dog, cat, other)
- Filter by breed
- Filter by age
- Filter by location
- Efficient database queries

### 4. Apply (Yu Gyeom Jeong)
- Submit adoption applications
- Form validation (required fields, format)
- Application approval/rejection logic
- Business logic implementation

### 5. Manage
- Update pet listings after adoption
- Archive adopted pets
- Remove from available list

---

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- CSS (responsive design)
- Jest + React Testing Library

### Backend
- Express.js
- Node.js
- PostgreSQL (relational database)
- bcrypt (password hashing)
- Jest (unit testing)

---

## API Endpoints

### Authentication
```
POST   /api/auth/register   - User registration
POST   /api/auth/login      - User login
GET    /api/auth/profile    - Get user profile
```

### Pets
```
GET    /api/pets             - Get all available pets (with search filters)
GET    /api/pets/:id         - Get pet details
```

### Applications
```
POST   /api/applications     - Submit adoption application
GET    /api/applications     - Get all applications (admin)
PUT    /api/applications/:id - Update application status
```

### Listings
```
PUT    /api/pets/:id         - Update pet listing (archive/adopt)
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Pets Table
```sql
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  age INTEGER,
  location TEXT,
  description TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Applications Table
```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  pet_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id)
);
```

---

## Unit Testing Focus Areas

### Authentication Tests (Yu Gyeom Jeong)
- Valid login
- Invalid login
- Duplicate email registration
- Password hashing verification
- Input validation

### Search Tests (You Wu)
- Valid filters (species, breed, age, location)
- Multiple filters combined
- Empty results handling
- Invalid input handling

### Adopter Profile Validation Tests (Xinyi Gu)
- Missing required fields
- Invalid email format
- Invalid phone format

### Adoption Application Tests (Yu Gyeom Jeong)
- Complete valid application
- Incomplete form submission
- Invalid field entries
- Application approval workflow
- Application rejection workflow

---

## End-to-End Workflow Test
1. Account creation
2. Login
3. Pet search with filters
4. Application submission
5. Error handling for invalid input

---

## Implementation Phases

### Phase 1: Backend Setup
1. Initialize Node.js/Express project
2. Set up PostgreSQL database
3. Implement authentication (signup/login)
4. Implement pet CRUD operations
5. Implement application submission
6. Write unit tests for auth and applications

### Phase 2: Search Feature (You Wu)
1. Implement search/filter endpoints
2. Database query optimization
3. Write unit tests for search

### Phase 3: Frontend (Xinyi Gu)
1. Initialize React project
2. Set up routing
3. Build authentication UI
4. Build pet listing and search UI
5. Build application form
6. Input validation
7. Responsive design
8. Write unit tests

### Phase 4: Management Feature
1. Update pet status after adoption
2. Archive functionality
3. Integration testing

---

## Project Structure
```
/backend
  /src
    /routes       - API routes
    /controllers  - Request handlers
    /models       - Data models
    /tests        - Unit tests
  server.js
  package.json

/frontend
  /src
    /components   - React components
    /pages        - Page components
    /services     - API calls
    /tests        - Unit tests
  App.js
  package.json
```

---

## Acceptance Criteria
- [ ] Users can register and login securely
- [ ] All pet listings display correctly
- [ ] Search filters work (species, breed, age, location)
- [ ] Adoption applications submit with validation
- [ ] Application approval/rejection works
- [ ] Adopted pets archived and removed from available list
- [ ] All unit tests pass
- [ ] End-to-end workflow functions correctly

---

## Unit Test Reports Requirements

### Automated Testing Strategy
- All units must have automated tests using Jest (backend) and React Testing Library (frontend)
- Tests must cover all functions, routes, and components
- Each unit test report must be a separate document

### Unit Selection Criteria
- Each unit should have **high cohesion** (single responsibility)
- Each unit should **not be too large** (manageable scope)
- Units are defined by source files with related functionality

### Unit Test Report Structure

Each unit test report must contain the following sections:

#### 1. Unit
- List all source files being tested
- Group by functionality (e.g., Authentication, Search, Applications)

#### 2. Date
- Date when the unit test was performed

#### 3. Engineers
- Name(s) of software engineer(s) who performed the test

#### 4. Automated Test Code
- Document inputs and expected outputs
- Include code snippets showing test cases

#### 5. Actual Outputs
- Actual test results from running the tests
- Pass/fail status for each test case

#### 6. Test Methodology
- Describe the testing methodology used (Triangle, Control Flow, or Data Flow)
- Explain why the methodology was chosen
- List all applicable test cases created

### Units to Test

#### Backend Units
| Unit | Source Files | Description |
|------|--------------|-------------|
| Authentication Service | `authService.js`, `bcrypt.js` | Password hashing, user registration, login |
| Authentication Controller | `authController.js` | HTTP request handling for auth |
| Application Service | `applicationService.js` | Business logic for adoption applications |
| Application Controller | `applicationController.js` | HTTP request handling for applications |
| Application Routes | `applicationRoutes.js` | API route definitions |
| Pet Routes | `petRoutes.js` | API route definitions for pets |
| Admin Middleware | `adminMiddleware.js` | Authorization checks |
| SQL Queries | `users.js`, `pets.js`, `applications.js` | Database operations |

#### Frontend Units
| Unit | Source Files | Description |
|------|--------------|-------------|
| Auth Forms | `Login.jsx`, `Register.jsx` | User authentication forms |
| Pet Components | `PetCard.jsx`, `PetList.jsx` | Pet display components |
| Search Component | `SearchBar.jsx` | Search and filter functionality |
| Application Form | `ApplicationForm.jsx` | Adoption application form |
| Navigation | `Navbar.jsx` | Navigation and routing |
| API Service | `api.js` | API communication layer |

---

## Test Documentation

### Unit Test Reports Directory Structure
```
/tests
  /reports
    /backend
      auth-service-report.md
      auth-controller-report.md
      application-service-report.md
      application-controller-report.md
      admin-middleware-report.md
      sql-queries-report.md
    /frontend
      auth-forms-report.md
      pet-components-report.md
      search-component-report.md
      application-form-report.md
      navigation-report.md
      api-service-report.md
```

### Software & Environment Documentation

Create a separate document (`SOFTWARE_ENVIRONMENT.md`) containing:

#### 1. Development Software
| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | LTS version | Backend runtime |
| npm | 10.x | Package management |
| React | 19.x | Frontend framework |
| Express.js | 5.x | Backend framework |
| PostgreSQL | 15.x | Database |
| bcryptjs | 3.x | Password hashing |
| jsonwebtoken | 9.x | Token-based auth |

#### 2. Testing Software
| Software | Version | Purpose |
|----------|---------|---------|
| Jest | 30.x | Backend unit testing |
| React Testing Library | 16.x | Frontend component testing |
| supertest | 7.x | HTTP API testing |
| @testing-library/jest-dom | 6.x | Frontend DOM testing |
| @testing-library/user-event | 13.x | User interaction simulation |

#### 3. Setup Instructions

**Backend Setup:**
```bash
cd backend
npm install
# Configure .env file with database credentials
npm run dev
npm test
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
npm test
```

**Test Environment:**
- Node.js environment for running tests
- Jest configuration in `package.json`
- React Testing Library configuration
- Supertest for API endpoint testing

---

## Testing Methodologies

### Triangle Testing (Equivalence Partitioning)
Used for: Input validation, form fields, API parameters
- Identify equivalence classes (valid/invalid inputs)
- Test boundary values
- Example: Email format validation, password strength

### Control Flow Testing
Used for: Business logic, decision-making functions
- Statement coverage
- Branch coverage
- Path coverage
- Example: Application approval logic, discount calculation

### Data Flow Testing
Used for: Data processing, state management
- Track variable definitions and uses
- Find uninitialized variables, unreachable code
- Example: Form data propagation, API response handling
