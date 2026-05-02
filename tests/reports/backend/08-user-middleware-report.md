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

#### Why This Methodology:
Control Flow Testing was applied to verify all authorization branches work correctly. The middleware must reject requests without tokens, reject requests with invalid tokens, accept valid tokens and attach user data to the request, and handle edge cases like empty Bearer tokens. Each branch represents a different security path through the code.

Data Flow Testing was necessary because the token must flow from the Authorization header through JWT verification and finally be stored in req.user for downstream middleware and controllers to access. This data flow ensures authenticated user information is available throughout the request processing pipeline.

Triangle Testing was used to verify edge cases in token handling including very long tokens, tokens with special characters, and multiple space-separated tokens after "Bearer". These boundary conditions ensure robust handling of various token formats users might send.