# Unit Test Report: Home Component

## 1. Unit
**Source Files Tested:**
- `frontend/src/pages/Home.js` - Landing page for authenticated users

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

## 4. Automated Test Code

### Test Case 1: Welcome Message for Logged In User
- **Input:** User logged in (user !== null)
- **Expected:** Welcome text visible
- **Actual:** ✅ PASS

### Test Case 2: Shows Logout Button
- **Input:** User logged in
- **Expected:** Logout button visible
- **Actual:** ✅ PASS

### Test Case 3: Displays Navigation Links
- **Expected:** Home, Pets links visible
- **Actual:** ✅ PASS

### Test Case 4: Logout Button Calls Logout Function
- **Input:** Click logout button
- **Expected:** logout function called
- **Actual:** ✅ PASS

### Test Case 5: Conditional Rendering
- **Input:** User not logged in (null)
- **Expected:** Different content shown
- **Actual:** ✅ PASS

## 5. Actual Outputs
- **Tests:** 5 | **Passed:** 5 ✅

## 6. Methodology
**Control Flow:** Component rendering based on auth state
**Data Flow:** User data flows to display elements