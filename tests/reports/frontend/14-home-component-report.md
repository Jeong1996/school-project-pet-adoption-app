# Unit Test Report: Home Component

## 1. Unit
**Source Files Tested:**
- `frontend/src/pages/Home.js` - Landing page for authenticated users

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

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

#### Why This Methodology:
Control Flow Testing was applied to verify the home component renders differently based on the authentication state. When a user is logged in, the component should display a welcome message, navigation links, and a logout button. When no user is logged in, the component may show different content or redirect. Testing these conditional rendering paths ensures the component correctly adapts the UI based on whether the user is authenticated.

Data Flow Testing was necessary because user data flows from the authentication context into the component's display elements. The user's name is displayed in the welcome message, and the logout function must be available to allow users to sign out. This data flow ensures user information is correctly displayed and actions are properly connected to authentication functions.