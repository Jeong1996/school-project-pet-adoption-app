const bcrypt = require('bcryptjs');
const pool = require('../db');
const { usersQueries } = require('../sql/users');

async function registerUser(email, password, name) {
  const existing = await pool.query(usersQueries.findByEmail, [email]);
  if (existing.rows.length > 0) {
    throw new Error('Email already registered');
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(usersQueries.create, [email, passwordHash, name]);
  
  return result.rows[0];
}

async function loginUser(email, password) {
  const result = await pool.query(usersQueries.findByEmail, [email]);
  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }
  
  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }
  
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function loginAdmin(email, password) {
  const result = await pool.query(usersQueries.findAdminByEmail, [email, 'admin']);
  if (result.rows.length === 0) {
    throw new Error('Invalid admin credentials');
  }
  
  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!validPassword) {
    throw new Error('Invalid admin credentials');
  }
  
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function validateRegistrationInput(email, password, name) {
  const errors = [];
  
  if (!email || !password || !name) {
    errors.push('All fields required');
  }
  
  if (email && !email.includes('@')) {
    errors.push('Invalid email format');
  }
  
  if (password && password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  return errors;
}

function validateLoginInput(email, password) {
  const errors = [];
  
  if (!email || !password) {
    errors.push('Email and password required');
  }
  
  return errors;
}

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  validateRegistrationInput,
  validateLoginInput
};
