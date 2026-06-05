# System Test Plan

**Yu Gyeom Jeong, Xinyi Gu**
**CISC 593-90**
**Final Project: System Testing**


## 1. Background

This document explains the system test plans for the Pet Adoption Platform. It is a full-stack web application connecting animal shelters/rescues with potential adopters. The plan is to perform the system level tests are manually. We are going to run the front end application, backend server, and database locally. When they are running, we will perform an end-to-end testing from a user by interacting with the UI and validating expected behaviors. The plan covers the five major use cases. They are the following:

User Registration, User Login, Admin Login, View/Search Pets, and Submit Adoption Application.

## 2. Versioning

| Technology       | Version |
|------------------|---------|
| Node.js          | 25.x    |
| npm              | 10.x    |
| Express.js       | 5.x     |
| PostgreSQL       | 15.x    |
| bcryptjs         | 3.x     |
| jsonwebtoken     | 9.x     |
| React            | 19.x    |
| React Router     | 6.x     |
| Axios            | 1.x     |

## 3. Testing Libraries

| Library                  | Version |
|--------------------------|---------|
| Jest                     | 30.x    |
| supertest                | 7.x     |
| React Testing Library    | 16.x    |
| Manual browser testing   | Google Chrome |

## 4. Setup Instructions

1. Install prerequisites: Node.js 20+ and PostgreSQL 14+.
2. Clone the repo and enter both subfolders (`backend/`, `frontend/`) and run `npm install` in each.
3. In `backend/`, create a `.env` file with:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pet_adoption
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_jwt_secret_key
   ```
   > Note: `JWT_SECRET` is required. If omitted, the server falls back to the hard‑coded string `defaultsecret`, which is acceptable for local testing only and must be replaced before any non‑local deployment.

4. Create the PostgreSQL database `pet_adoption` and load the provided schema/seed data.
5. Start backend: `cd backend && npm start` (port 3001)
   Start frontend: `cd frontend && npm start` (port 3000)
6. Open <http://localhost:3000> in Chrome. Use the default admin account (`admin@test.com` / `admin123`) for admin tests.
7. To execute automated test suites: `npm test` in either folder.

## 5. Test Cases

### Use Case #1: A new user creates an account
**Steps:**
1. Navigate to `/register`
2. Enter a valid name, email, and password
3. Click "Register"
**Expected:** Check in postgres db using psql that the new user row exists in the `users` table. User can login in afterwards
**Negative tests:**
- Submit empty fields -> validation error shown, no record.
- Submit duplicate email -> "Email already in use" error.
- Submit password < 8 chars -> client-side validation blocks submit.


### Use Case #2: A registered user is able to sign in
**Preconditions:** User account already exists 
**Steps:**
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"
**Expected:** User is redirected to the home page, and protected pages become accessible. Logging out no longer allows protected pages
**Negative test:** Try logging in with wrong password and fail to login

### Use Case #3: A user browses available pets and filters the list
**Preconditions:** Database is populated with dummy data. This is part of the startup backend db startup migration.
**Steps:**
1. Open the `/pets` page
2. Verify all available pets. 
3. Apply a species filter or age filter.
**Expected:** Check in google chrome developer mode that `GET /api/pets` returns matching records. "Adopted" pets are hidden are not displayed. Filtering reduces the list accurately. Clearing filter shows the full list again.


### Use Case #4: A user applies to adopt a pet
**Preconditions:** User is logged in and there are potential pets to adopt
**Steps:**
1. Click on a pet card to open its detail page.
2. Click "Adopt", "Apply to Adopt".
3. Fill in the application form.
4. Submit the form.

**Expected:** Check in google chrome developer mode that`POST /api/applications` succeeds. Check in postgres db using psql that a new row appears in the `applications` table. 


### Use Case #5: An admin logins to manage pets and applications
**Preconditions:** Default admin (email:`admin@test.com` password:`admin123`) is created in DB. This is part of the startup backend db startup migration.
**Steps:**
1. Navigate to `/admin/login`
2. Enter admin email and password
**Expected:** Admin dashboard is displayed. Admin-only buttons and endpoints return works successfully. Verify that the application from use case #4 testing is visible in the admin dashboard saying "Pending Applications". Admin is able to approve. Verify the change in postgres db.
**Negative test:** Normal user cannot go to `/admin` page


## 6. Plan Summary
All 5 use cases pass their positive and negative test. 
All unit tests suites that is automated passes when ran.
