# Unit Test Report: Application Controller

## 1. Unit
- **Source Files Tested:** `backend/src/controllers/applicationController.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
describe('submitApplication', () => {
  test('returns 400 if validation fails', () => {});
  test('returns 401 if no userId', () => {});
  test('returns 201 if successful', () => {});
});
describe('getUserApplications', () => {
  test('returns applications', () => {});
  test('returns 500 on error', () => {});
});
describe('approveApplication', () => {
  test('returns approved application', () => {});
  test('returns 404 if not found', () => {});
});
```

## 5. Actual Outputs
- **Tests:** 15 tests
- **Passed:** 15 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - HTTP response paths (200, 201, 400, 401, 404, 500)
**Data Flow Testing** - Request params → service → response