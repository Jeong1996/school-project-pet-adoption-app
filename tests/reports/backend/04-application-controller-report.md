# Unit Test Report: Application Controller

## 1. Unit
**Source Files Tested:**
- `backend/src/controllers/applicationController.js` - HTTP handlers for application endpoints

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Submit Application - Validation Fails
- **Input:** `req = { params: { petId: '1' }, body: { userId: '1' } }`
- **Mock:** `validateApplicationInput` returns ['Living situation is required']
- **Expected Output:** `res.status(400).json({ error: 'Living situation is required' })`
- **Actual Output:** ✅ Status 400 with validation error
- **Test Status:** PASS

### Test Case 2: Submit Application - No User ID
- **Input:** `req = { params: { petId: '1' }, body: {} }` (no userId)
- **Mock:** `validateApplicationInput` returns []
- **Expected Output:** `res.status(401).json({ error: 'Authentication required' })`
- **Actual Output:** ✅ Status 401 for missing auth
- **Test Status:** PASS

### Test Case 3: Submit Application - Success
- **Input:** `req = { params: { petId: '1' }, body: { userId: '1', livingSituation: 'test', experience: 'test', reason: 'test' } }`
- **Mock:** `validateApplicationInput` returns [], `submitApplication` returns `{ id: 1, status: 'pending' }`
- **Expected Output:** `res.status(201).json({ application: { id: 1, status: 'pending' } })`
- **Actual Output:** ✅ Status 201 with application
- **Test Status:** PASS

### Test Case 4: Submit Application - Pet Not Found
- **Input:** Same as success but pet doesn't exist
- **Mock:** `submitApplication` throws 'Pet not found'
- **Expected Output:** `res.status(404).json({ error: 'Pet not found' })`
- **Actual Output:** ✅ Status 404 with error
- **Test Status:** PASS

### Test Case 5: Get User Applications - Success
- **Input:** `req = { params: { userId: '1' } }`
- **Mock:** Returns array of applications
- **Expected Output:** `res.json({ applications: [{ id: 1 }] })`
- **Actual Output:** ✅ Returns applications array
- **Test Status:** PASS

### Test Case 6: Get User Applications - Error
- **Input:** `req = { params: { userId: '1' } }`
- **Mock:** Service throws error
- **Expected Output:** `res.status(500).json({ error: 'Server error' })`
- **Actual Output:** ✅ Status 500 with error
- **Test Status:** PASS

### Test Case 7: Approve Application - Success
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Returns approved application
- **Expected Output:** `res.json({ application: { id: 1, status: 'approved' } })`
- **Actual Output:** ✅ Returns approved application
- **Test Status:** PASS

### Test Case 8: Approve Application - Not Found
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Service throws 'Application not found'
- **Expected Output:** `res.status(404)`
- **Actual Output:** ✅ Status 404
- **Test Status:** PASS

### Test Case 9: Reject Application - Success
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Returns rejected application
- **Expected Output:** `res.json({ application: { id: 1, status: 'rejected' } })`
- **Actual Output:** ✅ Returns rejected application
- **Test Status:** PASS

### Test Case 10: Reject Application - Not Found
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Service throws 'Application not found'
- **Expected Output:** `res.status(404)`
- **Actual Output:** ✅ Status 404
- **Test Status:** PASS

### Test Case 11: Process Application - Approved
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Returns approved application with decision
- **Expected Output:** `res.json({ application: { status: 'approved' }, decision: { approved: true } })`
- **Actual Output:** ✅ Returns with approval decision
- **Test Status:** PASS

### Test Case 12: Process Application - Not Found
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Service throws 'Application not found'
- **Expected Output:** `res.status(404)`
- **Actual Output:** ✅ Status 404
- **Test Status:** PASS

### Test Case 13: Process Application - Already Processed
- **Input:** `req = { params: { applicationId: '1' } }`
- **Mock:** Application already approved
- **Expected Output:** `res.status(400)`
- **Actual Output:** ✅ Status 400
- **Test Status:** PASS

### Test Cases 14-15: Additional Error Handling
- Database connection errors
- Invalid application ID formats

## 5. Actual Outputs
- **Total Tests:** 15
- **Passed:** 15 ✅
- **Failed:** 0
- **Errors:** 0

## 6. Test Methodology

### Methodology Used: Control Flow Testing + Data Flow Testing

#### Why This Methodology:
Control Flow Testing was selected because the application controller manages multiple HTTP response branches that handle different scenarios. The controller must return 201 when successfully creating a new application, 200 when retrieving or updating applications, 400 for validation errors, 401 for authentication failures, 404 for not found conditions, and 500 for server errors. Each of these response codes represents a different path through the code that must be tested to ensure the API correctly communicates status to clients.

Data Flow Testing was applied because the controller transforms data between layers of the application. It extracts parameters from the request URL (petId, userId, applicationId) and the request body (livingSituation, experience, reason), passes this extracted data to service methods, and then transforms the service results into appropriate HTTP responses. This transformation pipeline must correctly map all fields to ensure data integrity between the request and response.

#### Test Coverage:

**Control Flow - HTTP Status Codes:**
| Scenario | Status |
|----------|--------|
| Validation error | 400 |
| Not authenticated | 401 |
| Pet/Application not found | 404 |
| Server error | 500 |
| Success (create) | 201 |
| Success (get/update) | 200 |

**Data Flow - Field Mapping:**
| Request Field | Service Method | Response Field |
|---------------|----------------|-----------------|
| petId | submitApplication | application.id |
| userId | submitApplication | application.user_id |
| applicationId | approve/reject/process | application.status |
| livingSituation | validateApplicationInput | error message |

#### Coverage Achieved:
- **All HTTP response paths:** 100%
- **All error handling:** Tested
- **Data transformations:** Verified