const bcrypt = require('bcryptjs');
const pool = require('./db');
const { usersQueries } = require('./sql/users');

async function register(req, res) {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields required' });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  
  try {
    const existing = await pool.query(usersQueries.findByEmail, [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const result = await pool.query(usersQueries.create, [email, passwordHash, name]);
    
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  try {
    const result = await pool.query(usersQueries.findByEmail, [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function adminLogin(req, res) {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query(usersQueries.findAdminByEmail, [email, 'admin']);
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login, adminLogin };
