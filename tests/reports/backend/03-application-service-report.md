# Unit Test Report: Application Service

## 1. Unit
**Source Files Tested:**
- `backend/src/services/applicationService.js` - Business logic for adoption applications

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code

### Test Case 1: Submit Application - Pet Not Found
- **Input:** `submitApplication(1, 999, { livingSituation: '_test_', experience: 'test', reason: 'test' })`
- **Mock:** `pool.query` returns `{ rows: [] }` for pet check
- **Expected Output:** Throws "Pet not found"
- **Actual Output:** ✅ Throws "Pet not found"
- **Test Status:** PASS

### Test Case 2: Submit Application - User Not Found
- **Input:** `submitApplication(999, 1, { livingSituation: 'test', experience: 'test', reason: 'test' })`
- **Mock:** Pet exists, user not found
- **Expected Output:** Throws "User not found"
- **Actual Output:** ✅ Throws "User not found"
- **Test Status:** PASS

### Test Case 3: Submit Application - Success
- **Input:** `submitApplication(1, 1, { livingSituation: 'test', experience: 'test', reason: 'test' })`
- **Mock:** Pet and user exist, application created
- **Expected Output:** Returns `{ id: 1, user_id: 1, pet_id: 1, status: 'pending' }`
- **Actual Output:** ✅ Application created with pending status
- **Test Status:** PASS

### Test Case 4: Get User Applications
- **Input:** `getUserApplications(1)`
- **Mock:** Returns array of applications with pet details
- **Expected Output:** Array of applications
- **Actual Output:** ✅ Returns applications with pet_name, species, breed
- **Test Status:** PASS

### Test Case 5: Validate Input - Missing Living Situation
- **Input:** `validateApplicationInput({ livingSituation: '', experience: 'test', reason: 'test' })`
- **Expected Output:** Returns ['Living situation is required']
- **Actual Output:** ✅ Returns error message
- **Test Status:** PASS

### Test Case 6: Validate Input - Missing Experience
- **Input:** `validateApplicationInput({ livingSituation: 'test', experience: '', reason: 'test' })`
- **Expected Output:** Returns ['Experience is required']
- **Actual Output:** ✅ Returns error message
- **Test Status:** PASS

### Test Case 7: Validate Input - Missing Reason
- **Input:** `validateApplicationInput({ livingSituation: 'test', experience: 'test', reason: '' })`
- **Expected Output:** Returns ['Reason for adoption is required']
- **Actual Output:** ✅ Returns error message
- **Test Status:** PASS

### Test Case 8: Validate Input - All Valid
- **Input:** `validateApplicationInput({ livingSituation: 'test', experience: 'test', reason: 'test' })`
- **Expected Output:** Returns []
- **Actual Output:** ✅ Returns empty array
- **Test Status:** PASS

### Test Case 9: Validate Decision - Apartment Living for Dog
- **Input:** `validateApplicationForDecision({ living_situation: 'I live in an apartment', experience: 'I have owned dogs', reason: 'Looking for a companion' })`
- **Expected Output:** `{ rejected: true, reasons: ['Unsuitable living situation for this pet type'] }`
- **Actual Output:** ✅ Application rejected for apartment living with dog
- **Test Status:** PASS

### Test Case 10: Validate Decision - No Experience
- **Input:** `validateApplicationForDecision({ living_situation: 'I have a house with yard', experience: 'none', reason: 'Looking for a companion' })`
- **Expected Output:** `{ rejected: true, reasons: ['No prior pet experience'] }`
- **Actual Output:** ✅ Application rejected for no experience
- **Test Status:** PASS

### Test Case 11: Validate Decision - Short Reason
- **Input:** `validateApplicationForDecision({ living_situation: 'I have a house with yard', experience: 'I have owned dogs', reason: 'test' })`
- **Expected Output:** `{ rejected: true, reasons: ['Reason for adoption is too short'] }`
- **Actual Output:** ✅ Application rejected for short reason
- **Test Status:** PASS

### Test Case 12: Validate Decision - Approved
- **Input:** `validateApplicationForDecision({ living_situation: 'I have a house with a big backyard', experience: 'I have had dogs for 5 years', reason: 'Looking for a loving companion for my family' })`
- **Expected Output:** `{ approved: true, rejected: false }`
- **Actual Output:** ✅ Application approved
- **Test Status:** PASS

### Test Case 13: Approve Application - Not Found
- **Input:** `approveApplication(999)`
- **Mock:** No application found
- **Expected Output:** Throws "Application not found"
- **Actual Output:** ✅ Throws error
- **Test Status:** PASS

### Test Case 14: Approve Application - Success
- **Input:** `approveApplication(1)`
- **Mock:** Application exists, pet updated to adopted
- **Expected Output:** `{ status: 'approved' }`
- **Actual Output:** ✅ Status changed to approved
- **Test Status:** PASS

### Test Case 15: Reject Application - Not Found
- **Input:** `rejectApplication(999)`
- **Expected Output:** Throws "Application not found"
- **Actual Output:** ✅ Throws error
- **Test Status:** PASS

### Test Case 16: Reject Application - Success
- **Input:** `rejectApplication(1)`
- **Expected Output:** `{ status: 'rejected' }`
- **Actual Output:** ✅ Status changed to rejected
- **Test Status:** PASS

### Test Case 17: Process Application - Auto Approve
- **Input:** `processApplication(1)` with valid application
- **Expected Output:** `{ application: { status: 'approved' }, decision: { approved: true } }`
- **Actual Output:** ✅ Auto-approved based on validation
- **Test Status:** PASS

## 5. Actual Outputs
- **Total Tests:** 17
- **Passed:** 17 ✅
- **Failed:** 0
- **Errors:** 0

## 6. Test Methodology

### Methodology Used: Control Flow Testing + Triangle Testing + Data Flow Testing

#### Why Control Flow Testing:
Application processing has complex decision trees:
- **Submission path:** Validate → Check pet → Check user → Create application
- **Approval path:** Find application → Update status → Update pet status
- **Decision path:** Get application → Validate → Approve or Reject

Each path has multiple branches based on validation results.

#### Why Triangle Testing:
Application form has specific validation equivalence classes:
1. **Living situation:** Required, apartment vs house (different rules for dogs)
2. **Experience:** Required, none vs some (affects approval)
3. **Reason:** Required, short vs long (minimum character requirement)

#### Why Data Flow Testing:
Data flows through multiple transformations:
1. **Form input** → Validation → Normalized data
2. **Validated data** → Database → Application record
3. **Application record** → Decision logic → Approval/rejection
4. **Decision** → Pet status update → Adoption complete

#### Test Cases by Category:

**Triangle Testing - Form Validation:**
| Field | Valid Class | Invalid Class | Boundary |
|-------|-------------|---------------|----------|
| livingSituation | Non-empty, valid housing | Empty, apartment (for dogs) | Min 1 char |
| experience | "none" + additional, years specified | "none" alone | "none" |
| reason | 20+ characters | < 20 characters | 20 chars |

**Control Flow - Decision Logic:**
| Condition | Expected Decision |
|-----------|------------------|
| House + Experience + Long reason | Approve |
| Apartment + Dog | Reject |
| No experience | Reject |
| Short reason | Reject |

**Data Flow - Field Propagation:**
| Field | Input → Validation → DB → Decision |
|-------|------------------------------------|
| living_situation | form.livingSituation → check → insert → validate |
| experience | form.experience → check → insert → evaluate |
| reason | form.reason → check length → insert → evaluate |

#### Coverage Achieved:
- **All validation rules:** Tested
- **All approval paths:** Tested
- **All rejection paths:** Tested
- **Data transformations:** Verified