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

#### Why This Methodology:
Control Flow Testing was applied to verify the registration component handles all user interactions from rendering through submission. The component must display input fields for name, email, and password, update state as users type in each field, validate the input before submission, and call the registration function with valid data. Each stage of the user interaction represents a different path through the component code that must be tested.

Triangle Testing was used because registration requires validation of multiple fields with different requirements. The name field must be non-empty, the email field must contain a valid email format, and the password field must meet minimum length requirements. By testing valid inputs that meet all requirements and invalid inputs that violate various rules, we ensure the form correctly accepts proper registrations and rejects invalid ones.