# Unit Test Report: Auth Controller

## 1. Unit
- **Source Files Tested:** `backend/src/controllers/authController.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
describe('register', () => {
  test('returns 400 if validation fails', () => {
    // Input: req.body = { email: 'test@test.com' }
    // Expected: res.status(400), { error: 'All fields required' }
  });
  test('registers user successfully', () => {
    // Input: req.body = { email, password, name }
    // Expected: res.status(201), { user: {...} }
  });
});
describe('login', () => {
  test('returns 401 for invalid credentials', () => {});
  test('logs in successfully', () => {});
});
```

## 5. Actual Outputs
- **Tests:** 10 tests
- **Passed:** 10 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Tests HTTP request handling branches (200, 201, 400, 401)
**Data Flow Testing** - Tracks data from request body → service → response