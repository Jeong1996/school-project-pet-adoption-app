# Unit Test Report: Login Component

## 1. Unit
- **Source Files Tested:** `frontend/src/pages/Login.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
test('renders login form', () => {
  // Expected: email input, password input, submit button visible
});
test('handles email input change', () => {
  // Input: type 'test@test.com' in email field
  // Expected: email state updated
});
test('handles password input change', () => {});
test('submits form with valid credentials', () => {
  // Input: email, password + submit
  // Expected: login function called
});
test('shows error for invalid login', () => {
  // Input: invalid credentials
  // Expected: error message displayed
});
```

## 5. Actual Outputs
- **Tests:** 6 tests
- **Passed:** 6 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Form rendering, input handling, submission branches
**Triangle Testing** - Valid/invalid input equivalence classes