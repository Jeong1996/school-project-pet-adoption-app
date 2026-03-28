jest.mock('../src/services/authService');

const { register, login, adminLogin } = require('../src/controllers/authController');
const authService = require('../src/services/authService');

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
    test('returns 400 if validation fails', async () => {
      authService.validateRegistrationInput.mockReturnValue(['All fields required']);
      req.body = { email: 'test@test.com' };
      
      await register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'All fields required' });
    });

    test('returns 400 if email already registered', async () => {
      authService.validateRegistrationInput.mockReturnValue([]);
      authService.registerUser.mockRejectedValue(new Error('Email already registered'));
      req.body = { email: 'test@test.com', password: 'password123', name: 'John' };
      
      await register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already registered' });
    });

    test('registers user successfully', async () => {
      authService.validateRegistrationInput.mockReturnValue([]);
      authService.registerUser.mockResolvedValue({ id: 1, email: 'test@test.com', name: 'John', role: 'user' });
      req.body = { email: 'test@test.com', password: 'password123', name: 'John' };
      
      await register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user: { id: 1, email: 'test@test.com', name: 'John', role: 'user' } });
    });
  });

  describe('login', () => {
    test('returns 400 if validation fails', async () => {
      authService.validateLoginInput.mockReturnValue(['Email and password required']);
      req.body = { email: 'test@test.com' };
      
      await login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email and password required' });
    });

    test('returns 401 for invalid credentials', async () => {
      authService.validateLoginInput.mockReturnValue([]);
      authService.loginUser.mockRejectedValue(new Error('Invalid credentials'));
      req.body = { email: 'test@test.com', password: 'wrongpass' };
      
      await login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    test('logs in successfully', async () => {
      authService.validateLoginInput.mockReturnValue([]);
      authService.loginUser.mockResolvedValue({ id: 1, email: 'test@test.com', name: 'John', role: 'user' });
      req.body = { email: 'test@test.com', password: 'correctpass' };
      
      await login(req, res);
      
      expect(res.json).toHaveBeenCalledWith({ user: { id: 1, email: 'test@test.com', name: 'John', role: 'user' } });
    });
  });

  describe('adminLogin', () => {
    test('returns 401 for invalid admin credentials', async () => {
      authService.loginAdmin.mockRejectedValue(new Error('Invalid admin credentials'));
      req.body = { email: 'admin@test.com', password: 'wrongpass' };
      
      await adminLogin(req, res);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid admin credentials' });
    });

    test('admin logs in successfully', async () => {
      authService.loginAdmin.mockResolvedValue({ id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin' });
      req.body = { email: 'admin@test.com', password: 'correctpass' };
      
      await adminLogin(req, res);
      
      expect(res.json).toHaveBeenCalledWith({ user: { id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin' } });
    });
  });
});
