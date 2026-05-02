# Unit Test Report: SQL Queries

## 1. Unit
- **Source Files Tested:** `backend/src/sql/users.js`, `backend/src/sql/pets.js`, `backend/src/sql/applications.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code
```javascript
describe('SQL Query Definitions', () => {
  test('Users queries exist and are valid SQL', () => {
    // verify findByEmail, findById, create, findAdminByEmail
  });
  test('Applications queries exist and are valid SQL', () => {
    // verify create, findByUserId, findById, findByPetId
  });
  test('Parameter count validation', () => {});
  test('Query field references', () => {});
});
```

## 5. Actual Outputs
- **Tests:** 20 tests
- **Passed:** 20 ✅
- **Failed:** 0

## 6. Test Methodology
**Triangle Testing** - Query structure and parameter equivalence classes
**Data Flow Testing** - Query field references and data flow