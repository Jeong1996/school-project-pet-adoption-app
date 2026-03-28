const usersQueries = {
  findByEmail: 'SELECT * FROM users WHERE email = $1',
  
  findById: 'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
  
  create: 'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role',
  
  findAdminByEmail: 'SELECT * FROM users WHERE email = $1 AND role = $2',
};

module.exports = { usersQueries };
