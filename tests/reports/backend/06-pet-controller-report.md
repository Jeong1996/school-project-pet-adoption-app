# Unit Test Report: Pet Controller

## 1. Unit
**Source Files Tested:**
- `backend/src/controllers/petController.js` - HTTP handlers for pet endpoints

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code (Summary)
- **Search Pets:** Tests successful search, empty results, error handling
- **Get All Pets:** Tests success and error paths
- **Get Pet By ID:** Tests found, not found, and error cases
- **Create Pet:** Tests missing fields, success, and errors
- **Update Pet:** Tests success, not found, and errors
- **Delete Pet:** Tests success, not found, and errors

**Total Test Cases:** 18
**All Pass:** ✅

## 5. Actual Outputs
- **Total Tests:** 18
- **Passed:** 18 ✅
- **Failed:** 0

## 6. Test Methodology

### Control Flow Testing + Triangle Testing
- Tests all HTTP response codes (200, 201, 400, 404, 500)
- Input validation for required fields (name, species)
- Error handling for service failures