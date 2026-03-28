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
| Xinyi Gu | Full Stack Developer | View, Manage |

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

### 5. Manage (Xinyi Gu)
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

### View & Manage Tests (Xinyi Gu)
- Pet listing display
- Pet details rendering
- Listing update functionality
- Archive functionality
- Available list management

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

### Phase 3: View Feature (Xinyi Gu)
1. Initialize React project
2. Set up routing
3. Build pet listing UI
4. Build pet details page
5. Responsive design
6. Write unit tests

### Phase 4: Manage Feature (Xinyi Gu)
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
