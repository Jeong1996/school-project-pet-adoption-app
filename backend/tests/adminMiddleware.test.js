const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

const adminMiddleware = require('../src/middleware/adminMiddleware');

describe('Admin Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('returns 401 if no token provided', () => {
    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  test('returns 401 if token is invalid', () => {
    req.headers.authorization = 'Bearer invalid_token';
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('returns 403 if user is not admin', () => {
    req.headers.authorization = 'Bearer valid_token';
    jwt.verify.mockReturnValue({ id: 1, email: 'user@test.com', role: 'user' });

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
    expect(next).not.toHaveBeenCalled();
  });

  test('calls next if user is admin', () => {
    req.headers.authorization = 'Bearer valid_token';
    jwt.verify.mockReturnValue({ id: 1, email: 'admin@test.com', role: 'admin' });

    adminMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1, email: 'admin@test.com', role: 'admin' });
    expect(res.status).not.toHaveBeenCalled();
  });
});