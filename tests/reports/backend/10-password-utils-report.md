# Unit Test Report: Password Utils

## 1. Unit
**Source Files Tested:**
- `backend/src/utils/bcrypt.js` - Password hashing utilities

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Hash Creates Hash
- **Input:** `bcrypt.hash('password123', 10)`
- **Expected Output:** Returns hashed password string
- **Actual:** ✅ 'hashed_password' returned

### Test Case 2: Hash Different Each Time (Salt)
- **Input:** Hash same password twice
- **Expected Output:** Different hash values due to salt
- **Actual:** ✅ hash1 !== hash2

### Test Case 3: Compare True for Correct Password
- **Input:** `bcrypt.compare('password123', 'hash')`
- **Mock:** hash resolves to true
- **Expected Output:** true
- **Actual:** ✅ true

### Test Case 4: Compare False for Wrong Password
- **Input:** `bcrypt.compare('wrong', 'hash')`
- **Mock:** compare resolves to false
- **Expected Output:** false
- **Actual:** ✅ false

## 5. Actual Outputs
- **Tests:** 4 | **Passed:** 4 ✅

## 6. Test Methodology
**Control Flow Testing:** Hash function and compare function branches
**Data Flow Testing:** Password flows through hashing algorithm

#### Why This Methodology:
Control Flow Testing was applied to verify both the hash function and compare function work correctly. The hash function must take a plaintext password and salt, then produce a hashed output. The compare function must correctly return true when given the original password and the correct hash, and return false when given an incorrect password. Testing both branches ensures password security functionality works as expected.

Data Flow Testing was necessary because the password flows through multiple transformations in the hashing process. The input password passes through salt generation where a random salt is created, then through the bcrypt hashing algorithm where the password and salt are combined and hashed, and finally the result is returned for storage or comparison. This data flow must work correctly to ensure passwords are stored securely.
- Input password → Salt generation → Hash computation → Compare logic