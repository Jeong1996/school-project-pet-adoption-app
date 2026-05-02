# Unit Test Report: Login Component

## 1. Unit
**Source Files Tested:**
- `frontend/src/pages/Login.js` - User login form

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Renders Login Form
- **Expected:** Email input, password input, submit button visible
- **Actual:** ✅ PASS

### Test Case 2: Handles Email Input
- **Input:** Type 'test@test.com' in email field
- **Expected:** Email state updated
- **Actual:** ✅ PASS

### Test Case 3: Handles Password Input
- **Input:** Type password in password field
- **Expected:** Password state updated
- **Actual:** ✅ PASS

### Test Case 4: Submits Form with Valid Credentials
- **Input:** Valid email + password + submit
- **Expected:** login function called
- **Actual:** ✅ PASS

### Test Case 5: Shows Error for Invalid Login
- **Input:** Invalid credentials
- **Expected:** Error message displayed
- **Actual:** ✅ PASS

### Test Case 6: Form Validation
- **Input:** Empty fields
- **Expected:** Validation messages shown
- **Actual:** ✅ PASS

## 5. Actual Outputs
- **Tests:** 6 | **Passed:** 6 ✅

## 6. Methodology
**Control Flow:** Form rendering, input, submission branches
**Triangle:** Valid/invalid input equivalence classes