const authService = require('../services/authService');

async function register(req, res) {
  const { email, password, name } = req.body;
  
  const errors = authService.validateRegistrationInput(email, password, name);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }
  
  try {
    const user = await authService.registerUser(email, password, name);
    res.status(201).json({ user });
  } catch (err) {
    if (err.message === 'Email already registered') {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  
  const errors = authService.validateLoginInput(email, password);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }
  
  try {
    const user = await authService.loginUser(email, password);
    res.json({ user });
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function adminLogin(req, res) {
  const { email, password } = req.body;
  
  try {
    const user = await authService.loginAdmin(email, password);
    res.json({ user });
  } catch (err) {
    if (err.message === 'Invalid admin credentials') {
      return res.status(401).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login, adminLogin };
