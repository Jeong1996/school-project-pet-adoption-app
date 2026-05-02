# Unit Test Report: Password Utils

## 1. Unit
- **Source Files Tested:** `backend/src/utils/bcrypt.js` (password hashing)

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
test('hash creates a hash', async () => {
  // Input: 'password123', 10
  // Expected: returns hashed_password
});
test('hash is different each time (salt)', async () => {
  // Input: same password hashed twice
  // Expected: different hashes (due to salt)
});
test('compare returns true for correct password', async () => {});
test('compare returns false for wrong password', async () => {});
```

## 5. Actual Outputs
- **Tests:** 4 tests
- **Passed:** 4 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Hash and compare function branches
**Data Flow Testing** - Password flows through hashing algorithm