const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createPetsTable = `
  CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    location TEXT,
    image TEXT,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createApplicationsTable = `
  CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    pet_id INTEGER REFERENCES pets(id),
    living_situation TEXT NOT NULL,
    experience TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

module.exports = {
  createUsersTable,
  createPetsTable,
  createApplicationsTable
};
