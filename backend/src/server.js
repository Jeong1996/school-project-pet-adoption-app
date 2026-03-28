require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const authRoutes = require('./authRoutes');
const { createUsersTable } = require('./migrations/users');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(createUsersTable);
    console.log('Users table ready');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    client.release();
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pet Adoption API' });
});

const PORT = process.env.PORT || 5000;

migrate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
