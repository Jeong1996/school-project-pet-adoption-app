# Pet Adoption Platform

A full-stack web application connecting animal shelters and rescues with potential adopters.

## Tech Stack

- **Frontend**: React 18, React Router v6, Axios, Jest
- **Backend**: Express.js, Node.js, PostgreSQL, bcryptjs
- **Database**: PostgreSQL

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeong1996/school-project-pet-adoption-app.git
cd school-project-pet-adoption-app

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### Start the Application

```bash
# 1. Start PostgreSQL
brew services start postgresql@16

# 2. Start backend (port 3001)
cd backend && npm start

# 3. Start frontend (port 3000)
cd frontend && npm start
```

Open http://localhost:3000 in your browser.

### Default Admin Account

- Email: admin@test.com
- Password: admin123

## Features

- User registration and login
- Admin authentication
- View available pets
- Submit adoption applications

## Testing

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```
