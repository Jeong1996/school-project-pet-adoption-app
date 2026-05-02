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

### Methodology Used: Control Flow Testing + Triangle Testing

#### Why This Methodology:
Control Flow Testing was applied because the pet controller handles multiple HTTP response paths that must all work correctly. The controller must return appropriate status codes for successful operations such as retrieving pets with 200, creating new pets with 201, client errors like validation failures with 400, not found errors with 404, and server errors with 500. Testing each response path ensures the API correctly communicates the outcome of each request to frontend clients, enabling proper user feedback and error handling in the UI.

Triangle Testing was used for input validation because the controller validates required fields before processing requests. The name and species fields are required and must be present in the request body for pet creation to succeed. By testing both valid inputs where both fields are present and invalid inputs where either name, species, or both are missing, we ensure the validation logic correctly rejects improper requests and accepts valid ones. This approach covers the equivalence classes of missing field combinations.