const bcrypt = require('bcryptjs');

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

jest.mock('../src/db', () => ({
  query: jest.fn()
}));

jest.mock('../src/sql/users', () => ({
  usersQueries: {
    findByEmail: 'SELECT * FROM users WHERE email = $1',
    findAdminByEmail: 'SELECT * FROM users WHERE email = $1 AND role = $2',
    create: 'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, role'
  }
}));

const { register, login, adminLogin } = require('../src/authController');
const pool = require('../src/db');

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('returns 400 if fields missing', async () => {
      req.body = { email: 'test@test.com' };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields required' });
    });

    test('returns 400 for invalid email', async () => {
      req.body = { email: 'invalid', password: 'password123', name: 'John' };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('returns 400 for weak password', async () => {
      req.body = { email: 'test@test.com', password: 'short', name: 'John' };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('returns 400 if email exists', async () => {
      req.body = { email: 'test@test.com', password: 'password123', name: 'John' };
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already registered' });
    });

    test('creates user successfully', async () => {
      req.body = { email: 'new@test.com', password: 'password123', name: 'John' };
      pool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ id: 1, email: 'new@test.com', name: 'John', role: 'user' }] });
      bcrypt.hash.mockResolvedValue('hashed');
      
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('login', () => {
    test('returns 400 if fields missing', async () => {
      req.body = { email: 'test@test.com' };
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email and password required' });
    });

    test('returns 401 for non-existent email', async () => {
      req.body = { email: 'notfound@test.com', password: 'password123' };
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    test('returns 401 for wrong password', async () => {
      req.body = { email: 'test@test.com', password: 'wrongpass' };
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, password_hash: 'hashed' }] });
      bcrypt.compare.mockResolvedValueOnce(false);
      
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('logs in successfully', async () => {
      req.body = { email: 'test@test.com', password: 'correctpass' };
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 1, email: 'test@test.com', name: 'John', role: 'user', password_hash: 'hashed' }] 
      });
      bcrypt.compare.mockResolvedValueOnce(true);
      
      await login(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('adminLogin', () => {
    test('returns 401 for non-admin user', async () => {
      req.body = { email: 'test@test.com', password: 'password123' };
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      await adminLogin(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid admin credentials' });
    });

    test('admin logs in successfully', async () => {
      req.body = { email: 'admin@test.com', password: 'correctpass' };
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin', password_hash: 'hashed' }] 
      });
      bcrypt.compare.mockResolvedValueOnce(true);
      
      await adminLogin(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
