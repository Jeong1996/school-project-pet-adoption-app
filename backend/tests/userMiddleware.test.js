const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

const userMiddleware = require('../src/middleware/userMiddleware');

describe('User Middleware - Control Flow & Data Flow Testing', () => {
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

  describe('Control Flow Testing', () => {
    test('Branch: No token provided', () => {
      userMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
      expect(next).not.toHaveBeenCalled();
    });

    test('Branch: Token in wrong format (no Bearer)', () => {
      req.headers.authorization = 'invalid_token';

      userMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    test('Branch: Basic auth format fails verification', () => {
      req.headers.authorization = 'Basic abc123';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      userMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      expect(next).not.toHaveBeenCalled();
    });

    test('Branch: Valid token - calls next', () => {
      req.headers.authorization = 'Bearer valid_token';
      jwt.verify.mockReturnValue({ id: 1, email: 'test@test.com', role: 'user' });

      userMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toEqual({ id: 1, email: 'test@test.com', role: 'user' });
      expect(res.status).not.toHaveBeenCalled();
    });

    test('Branch: Invalid token - throws error', () => {
      req.headers.authorization = 'Bearer invalid_token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      userMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      expect(next).not.toHaveBeenCalled();
    });

    test('Path: Empty Bearer token', () => {
      req.headers.authorization = 'Bearer ';

      userMiddleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Data Flow Testing', () => {
    test('Data Flow: Extract token from Authorization header - DEF in header, USE in split', () => {
      req.headers.authorization = 'Bearer mytoken123';
      
      userMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('mytoken123', 'defaultsecret');
    });

    test('Data Flow: Set decoded user on req - DEF from jwt.verify, USE in req.user', () => {
      req.headers.authorization = 'Bearer token';
      const decodedUser = { id: 5, email: 'user@test.com', role: 'user' };
      jwt.verify.mockReturnValue(decodedUser);

      userMiddleware(req, res, next);

      expect(req.user).toBe(decodedUser);
    });

    test('Data Flow: Pass through token when using custom secret', () => {
      process.env.JWT_SECRET = 'customsecret';
      req.headers.authorization = 'Bearer token';
      jwt.verify.mockReturnValue({ id: 1 });

      userMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('token', 'customsecret');
      delete process.env.JWT_SECRET;
    });
  });

  describe('Triangle Testing - Input Validation', () => {
    describe('Equivalence Classes', () => {
      test('Valid: Proper Bearer token format', () => {
        req.headers.authorization = 'Bearer abc123xyz';
        jwt.verify.mockReturnValue({ id: 1 });

        userMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
      });

      test('Invalid: No authorization header', () => {
        userMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
      });

      test('Invalid: Authorization header without Bearer - treated as token', () => {
        req.headers.authorization = 'Basic abc123';
        jwt.verify.mockImplementation(() => {
          throw new Error('Invalid token');
        });

        userMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
      });
    });

    describe('Boundary Values', () => {
      test('Boundary: Very long token', () => {
        const longToken = 'a'.repeat(1000);
        req.headers.authorization = `Bearer ${longToken}`;
        jwt.verify.mockReturnValue({ id: 1 });

        userMiddleware(req, res, next);

        expect(jwt.verify).toHaveBeenCalled();
      });

      test('Boundary: Token with special characters', () => {
        req.headers.authorization = 'Bearer token!@#$%^&*()';
        jwt.verify.mockReturnValue({ id: 1 });

        userMiddleware(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('token!@#$%^&*()', 'defaultsecret');
      });

test('Boundary: Multiple Bearer tokens - takes first token after Bearer', () => {
      req.headers.authorization = 'Bearer first second';
      jwt.verify.mockReturnValue({ id: 1 });

      userMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('first', 'defaultsecret');
    });
    });
  });
});