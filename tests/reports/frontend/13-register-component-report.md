# Unit Test Report: Register Component

## 1. Unit
**Source Files Tested:**
- `frontend/src/pages/Register.js` - User registration form

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Renders Registration Form
- **Expected:** Name, email, password inputs visible
- **Actual:** ✅ PASS

### Test Case 2: Handles Name Input
- **Input:** Type 'John' in name field
- **Expected:** Name state updated
- **Actual:** ✅ PASS

### Test Case 3: Handles Email Input
- **Input:** Type email in email field
- **Expected:** Email state updated
- **Actual:** ✅ PASS

### Test Case 4: Handles Password Input
- **Input:** Type password
- **Expected:** Password state updated
- **Actual:** ✅ PASS

### Test Case 5: Submits Form with Valid Data
- **Input:** Name, email, password + submit
- **Expected:** register function called
- **Actual:** ✅ PASS

### Test Case 6: Shows Validation Errors
- **Input:** Invalid data submitted
- **Expected:** Error messages displayed
- **Actual:** ✅ PASS

## 5. Actual Outputs
- **Tests:** 6 | **Passed:** 6 ✅

## 6. Methodology
**Control Flow:** Form rendering, input, validation, submission
**Triangle:** Input validation equivalence classes