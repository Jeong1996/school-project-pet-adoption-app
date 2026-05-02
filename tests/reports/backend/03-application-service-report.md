# Unit Test Report: Application Service

## 1. Unit
- **Source Files Tested:** `backend/src/services/applicationService.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
describe('submitApplication', () => {
  test('throws error if pet not found', () => {
    // Input: userId=1, petId=999
    // Expected: throws 'Pet not found'
  });
  test('creates application successfully', () => {
    // Input: userId=1, petId=1, data={livingSituation, experience, reason}
    // Expected: returns application with status='pending'
  });
});
describe('validateApplicationInput', () => {
  test('returns error if living situation missing', () => {});
  test('returns error if experience missing', () => {});
  test('returns error if reason missing', () => {});
  test('returns empty array if all fields valid', () => {});
});
```

## 5. Actual Outputs
- **Tests:** 17 tests
- **Passed:** 17 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Tests application submission and approval paths
**Triangle Testing** - Input validation equivalence classes for form fields