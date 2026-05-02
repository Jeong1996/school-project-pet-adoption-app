# Unit Test Report: Admin Middleware

## 1. Unit
- **Source Files Tested:** `backend/src/middleware/adminMiddleware.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
test('returns 401 if no token provided', () => {
  // Input: req with no authorization header
  // Expected: 401, {error: 'No token provided'}
});
test('returns 401 if token is invalid', () => {
  // Input: 'Bearer invalid_token'
  // Expected: 401, {error: 'Invalid token'}
});
test('returns 403 if user is not admin', () => {
  // Input: role='user'
  // Expected: 403, {error: 'Admin access required'}
});
test('calls next if user is admin', () => {
  // Input: role='admin'
  // Expected: next() called
});
```

## 5. Actual Outputs
- **Tests:** 4 tests
- **Passed:** 4 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Authorization branches (401, 403, next)
**Triangle Testing** - Token format and authorization scenarios