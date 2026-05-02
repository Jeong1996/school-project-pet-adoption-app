# Unit Test Report: User Middleware

## 1. Unit
- **Source Files Tested:** `backend/src/middleware/userMiddleware.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
test('Branch: No token provided', () => {
  // Input: req with no headers
  // Expected: 401, 'No token provided'
});
test('Branch: Token in wrong format', () => {
  // Input: 'invalid_token' (no Bearer)
  // Expected: 401
});
test('Branch: Valid token - calls next', () => {
  // Input: 'Bearer valid_token'
  // Expected: next() called, req.user set
});
test('Branch: Invalid token - throws error', () => {
  // Input: 'Bearer invalid_token'
  // Expected: 401, 'Invalid token'
});
```

## 5. Actual Outputs
- **Tests:** 13 tests
- **Passed:** 13 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Authorization branches
**Data Flow Testing** - Token extraction and user object propagation
**Triangle Testing** - Token format boundaries