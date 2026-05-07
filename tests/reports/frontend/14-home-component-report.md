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
Control Flow Testing was chosen to verify the home component. This component renders different displays depending on whether authentication is going through. When a user is logged in, the component should display a welcome message, navigation links, and a logout button. If there are no login attempts, the component shows different content and may need to redirect. Testing these conditional rendering paths ensures the home component to work as expected, responding to user's authentication activities. 

Data Flow Testing was necessary for this component because in our system, the data flows from the authentication context into the component's display elements. The user's name will be displayed in the welcome message, and the logout function needs to be aware of the user information so it can sign them out properly. The test ensures the functionality by our design where user information can be properly displayed and subsequent actions can be executed properly.
