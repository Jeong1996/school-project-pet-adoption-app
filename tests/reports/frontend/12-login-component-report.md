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

#### Why This Methodology:
Control Flow Testing was applied to verify the login component handles all user interaction paths correctly. The component must render the form with email and password inputs and a submit button, update state when users type in the fields, submit the form with valid credentials to the login function, and display error messages when login fails. Each of these interaction paths represents a different flow through the component that must work correctly for users to successfully authenticate.

Triangle Testing was used to validate input handling for both valid and invalid inputs. Valid inputs include properly formatted email addresses and passwords of sufficient length, which should allow form submission. Invalid inputs include malformed email addresses, empty fields, and passwords that are too short, which should trigger validation errors and prevent submission. By testing these equivalence classes, we ensure the form correctly accepts valid input and rejects invalid input.