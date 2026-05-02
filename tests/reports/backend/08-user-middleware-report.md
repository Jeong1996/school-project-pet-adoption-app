# Unit Test Report: User Middleware

## 1. Unit
**Source Files Tested:**
- `backend/src/middleware/userMiddleware.js` - User authentication middleware

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: No Token Provided
- **Input:** `req = { headers: {} }`
- **Expected Output:** 401 'No token provided'
- **Actual:** ✅ PASS

### Test Case 2: Token in Wrong Format
- **Input:** `req.headers.authorization = 'invalid_token'` (no Bearer)
- **Expected Output:** 401
- **Actual:** ✅ PASS

### Test Case 3: Valid Token - Calls Next
- **Input:** `req.headers.authorization = 'Bearer valid_token'`
- **Mock:** jwt.verify returns `{ id: 1, email: 'test@test.com', role: 'user' }`
- **Expected Output:** next() called, req.user set
- **Actual:** ✅ PASS

### Test Case 4: Invalid Token - Throws Error
- **Input:** `req.headers.authorization = 'Bearer invalid_token'`
- **Mock:** jwt.verify throws 'Invalid token'
- **Expected Output:** 401 'Invalid token'
- **Actual:** ✅ PASS

### Test Case 5: Empty Bearer Token
- **Input:** `req.headers.authorization = 'Bearer '`
- **Expected Output:** 401 (no next)
- **Actual:** ✅ PASS

### Test Cases 6-13: Boundary Values
- Very long token (1000 chars)
- Token with special characters
- Multiple tokens after Bearer
- Custom JWT secret usage

## 5. Actual Outputs
- **Tests:** 13 | **Passed:** 13 ✅

## 6. Test Methodology
**Control Flow:** Authorization branches
**Data Flow:** Token → jwt.verify → req.user
**Triangle:** Token format boundaries