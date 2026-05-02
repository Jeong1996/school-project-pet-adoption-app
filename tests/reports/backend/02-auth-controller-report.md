# Unit Test Report: Auth Controller

## 1. Unit
**Source Files Tested:**
- `backend/src/controllers/authController.js` - HTTP request handlers for authentication

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Register - Validation Fails
- **Input:** `req = { body: { email: 'test@test.com' } }` (missing password, name)
- **Mock:** `authService.validateRegistrationInput` returns ['All fields required']
- **Expected Output:** `res.status(400).json({ error: 'All fields required' })`
- **Actual Output:** ✅ Status 400, error "All fields required"
- **Test Status:** PASS

### Test Case 2: Register - Email Already Registered
- **Input:** `req = { body: { email: 'test@test.com', password: 'password123', name: 'John' } }`
- **Mock:** `authService.validateRegistrationInput` returns [], `registerUser` throws "Email already registered"
- **Expected Output:** `res.status(400).json({ error: 'Email already registered' })`
- **Actual Output:** ✅ Status 400, error "Email already registered"
- **Test Status:** PASS

### Test Case 3: Register - Success
- **Input:** `req = { body: { email: 'test@test.com', password: 'password123', name: 'John' } }`
- **Mock:** `authService.validateRegistrationInput` returns [], `registerUser` returns `{ id: 1, email: 'test@test.com', name: 'John', role: 'user' }`
- **Expected Output:** `res.status(201).json({ user: { id: 1, email: 'test@test.com', name: 'John', role: 'user' } })`
- **Actual Output:** ✅ Status 201, user object returned
- **Test Status:** PASS

### Test Case 4: Login - Validation Fails
- **Input:** `req = { body: { email: 'test@test.com' } }` (missing password)
- **Mock:** `authService.validateLoginInput` returns ['Email and password required']
- **Expected Output:** `res.status(400).json({ error: 'Email and password required' })`
- **Actual Output:** ✅ Status 400, error message returned
- **Test Status:** PASS

### Test Case 5: Login - Invalid Credentials
- **Input:** `req = { body: { email: 'test@test.com', password: 'wrongpass' } }`
- **Mock:** `authService.validateLoginInput` returns [], `loginUser` throws "Invalid credentials"
- **Expected Output:** `res.status(401).json({ error: 'Invalid credentials' })`
- **Actual Output:** ✅ Status 401, error "Invalid credentials"
- **Test Status:** PASS

### Test Case 6: Login - Success
- **Input:** `req = { body: { email: 'test@test.com', password: 'correctpass' } }`
- **Mock:** `authService.validateLoginInput` returns [], `loginUser` returns `{ id: 1, email: 'test@test.com', name: 'John', role: 'user' }`
- **Expected Output:** `res.json({ user: { id: 1, email: 'test@test.com', name: 'John', role: 'user' } })`
- **Actual Output:** ✅ User object returned without password
- **Test Status:** PASS

### Test Case 7: Admin Login - Invalid Credentials
- **Input:** `req = { body: { email: 'admin@test.com', password: 'wrongpass' } }`
- **Mock:** `authService.loginAdmin` throws "Invalid admin credentials"
- **Expected Output:** `res.status(401).json({ error: 'Invalid admin credentials' })`
- **Actual Output:** ✅ Status 401, error "Invalid admin credentials"
- **Test Status:** PASS

### Test Case 8: Admin Login - Success
- **Input:** `req = { body: { email: 'admin@test.com', password: 'correctpass' } }`
- **Mock:** `authService.loginAdmin` returns `{ id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin' }`
- **Expected Output:** `res.json({ user: { id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin' } })`
- **Actual Output:** ✅ Admin user object returned
- **Test Status:** PASS

### Test Cases 9-10: Edge Cases
- Empty body handling
- Malformed request handling

## 5. Actual Outputs
- **Total Tests:** 10
- **Passed:** 10 ✅
- **Failed:** 0
- **Errors:** 0

## 6. Test Methodology

### Methodology Used: Control Flow Testing + Data Flow Testing

#### Why This Methodology:
Control Flow Testing was selected for the auth controller because it manages multiple HTTP response paths based on different conditions that must each be verified. The controller must handle validation errors returning 400 Bad Request, service errors returning appropriate 400 or 401 status codes, and successful operations returning 201 Created or 200 OK. Each of these branches represents a different flow through the code that must work correctly for the API to function properly. By testing each branch explicitly, we ensure that the controller correctly maps all possible scenarios to their expected HTTP responses.

Data Flow Testing was applied because the controller acts as a data pipeline between HTTP requests and backend services. The data flows from the request body being extracted and validated, then passed to service methods for processing, and finally transformed into HTTP responses. This data transformation pipeline must handle both successful results and various error conditions. Testing the data flow ensures that fields like email, password, name, and role are correctly passed from the request through to the service layer and then transformed appropriately in the response.

#### Test Coverage:

**Control Flow - Response Codes:**
| Scenario | Expected Status |
|----------|-----------------|
| Validation error | 400 |
| Email already exists | 400 |
| Invalid credentials | 401 |
| Registration success | 201 |
| Login success | 200 |

**Data Flow - Request/Response Mapping:**
| Field | Request → Service → Response |
|-------|-------------------------------|
| email | body.email → validate → error/user |
| password | body.password → login → token |
| name | body.name → register → user.name |
| role | service.role → response.user.role |

**Triangle Testing - Input Validation:**
| Input Type | Valid Values | Invalid Values |
|------------|---------------|-----------------|
| email | test@test.com | '', invalid, null |
| password | 8+ chars | '', <8 chars, null |
| name | Non-empty string | '', null |

#### Coverage Achieved:
- **All HTTP response paths:** 100%
- **All error conditions:** Tested
- **All success conditions:** Tested
- **Data transformation:** Verified