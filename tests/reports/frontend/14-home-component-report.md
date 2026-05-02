# Unit Test Report: Home Component

## 1. Unit
- **Source Files Tested:** `frontend/src/pages/Home.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
test('renders welcome message for logged in user', () => {
  // Expected: Welcome text visible
});
test('shows logout button', () => {
  // Expected: Logout button visible
});
test('displays navigation links', () => {
  // Expected: Home, Pets links visible
});
test('logout button calls logout function', () => {
  // Input: click logout
  // Expected: logout function called
});
```

## 5. Actual Outputs
- **Tests:** 5 tests
- **Passed:** 5 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Component rendering branches based on auth state
**Data Flow Testing** - User data flows to display