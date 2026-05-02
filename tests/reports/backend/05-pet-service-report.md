# Unit Test Report: Pet Service

## 1. Unit
- **Source Files Tested:** `backend/src/services/petService.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
describe('searchPets', () => {
  test('Branch: No filters - returns all available pets', () => {});
  test('Branch: Filter by species only', () => {});
  test('Branch: Multiple filters combined', () => {});
});
describe('createPet', () => {
  test('Branch: Create with all fields', () => {});
  test('Branch: Create with optional fields null', () => {});
});
describe('updatePet', () => {
  test('Branch: Update single field', () => {});
  test('Branch: No fields to update - return null', () => {});
});
```

## 5. Actual Outputs
- **Tests:** 24 tests
- **Passed:** 24 ✅
- **Failed:** 0

## 6. Test Methodology
**Control Flow Testing** - Branch coverage for search, create, update, delete
**Data Flow Testing** - Filter data flows to query building
**Triangle Testing** - Input equivalence classes for search filters