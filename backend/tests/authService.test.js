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

const pool = require('../src/db');
const authService = require('../src/services/authService');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    test('throws error if email already exists', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });
      
      await expect(authService.registerUser('test@test.com', 'password123', 'John'))
        .rejects.toThrow('Email already registered');
    });

    test('creates user successfully', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@test.com', name: 'John', role: 'user' }] });
      bcrypt.hash.mockResolvedValue('hashed_password');
      
      const result = await authService.registerUser('test@test.com', 'password123', 'John');
      
      expect(result).toEqual({ id: 1, email: 'test@test.com', name: 'John', role: 'user' });
    });
  });

  describe('loginUser', () => {
    test('throws error if user not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      await expect(authService.loginUser('test@test.com', 'password123'))
        .rejects.toThrow('Invalid credentials');
    });

    test('throws error if password invalid', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, password_hash: 'hashed' }] });
      bcrypt.compare.mockResolvedValueOnce(false);
      
      await expect(authService.loginUser('test@test.com', 'wrongpass'))
        .rejects.toThrow('Invalid credentials');
    });

    test('returns user without password', async () => {
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 1, email: 'test@test.com', name: 'John', role: 'user', password_hash: 'hashed' }] 
      });
      bcrypt.compare.mockResolvedValueOnce(true);
      
      const result = await authService.loginUser('test@test.com', 'password123');
      
      expect(result.id).toBe(1);
      expect(result.email).toBe('test@test.com');
      expect(result.name).toBe('John');
      expect(result.role).toBe('user');
      expect(result.token).toBeDefined();
    });
  });

  describe('loginAdmin', () => {
    test('throws error if admin not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      await expect(authService.loginAdmin('admin@test.com', 'password123'))
        .rejects.toThrow('Invalid admin credentials');
    });

    test('throws error if password invalid', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, password_hash: 'hashed' }] });
      bcrypt.compare.mockResolvedValueOnce(false);
      
      await expect(authService.loginAdmin('admin@test.com', 'wrongpass'))
        .rejects.toThrow('Invalid admin credentials');
    });

    test('returns admin without password', async () => {
      pool.query.mockResolvedValueOnce({ 
        rows: [{ id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin', password_hash: 'hashed' }] 
      });
      bcrypt.compare.mockResolvedValueOnce(true);
      
      const result = await authService.loginAdmin('admin@test.com', 'password123');
      
      expect(result.id).toBe(1);
      expect(result.email).toBe('admin@test.com');
      expect(result.name).toBe('Admin');
      expect(result.role).toBe('admin');
      expect(result.token).toBeDefined();
    });
  });

  describe('validateRegistrationInput', () => {
    test('returns error if fields missing', () => {
      const errors = authService.validateRegistrationInput('', 'pass123', 'John');
      expect(errors).toContain('All fields required');
    });

    test('returns error if email invalid', () => {
      const errors = authService.validateRegistrationInput('invalid', 'password123', 'John');
      expect(errors).toContain('Invalid email format');
    });

    test('returns error if password too short', () => {
      const errors = authService.validateRegistrationInput('test@test.com', 'short', 'John');
      expect(errors).toContain('Password must be at least 8 characters');
    });

    test('returns empty array if valid', () => {
      const errors = authService.validateRegistrationInput('test@test.com', 'password123', 'John');
      expect(errors).toEqual([]);
    });
  });

  describe('validateLoginInput', () => {
    test('returns error if fields missing', () => {
      const errors = authService.validateLoginInput('', 'pass123');
      expect(errors).toContain('Email and password required');
    });

    test('returns empty array if valid', () => {
      const errors = authService.validateLoginInput('test@test.com', 'password123');
      expect(errors).toEqual([]);
    });
  });
});
