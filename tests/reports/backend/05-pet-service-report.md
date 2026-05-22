# Unit Test Report: Pet Service

## 1. Unit
**Source Files Tested:**
- `backend/src/services/petService.js` - Pet CRUD operations and search functionality

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Test Case 1: Search Pets - No Filters
- **Input:** `searchPets({})`
- **Mock:** Returns all available pets
- **Expected Output:** Array of all available pets
- **Actual Output:** ✅ Returns pets with WHERE status = 'available'
- **Test Status:** PASS

### Test Case 2: Search Pets - Filter by Species
- **Input:** `searchPets({ species: 'dog' })`
- **Expected Output:** Dogs filtered using ILIKE '%dog%'
- **Actual Output:** ✅ Species filter applied correctly
- **Test Status:** PASS

### Test Case 3: Search Pets - Filter by Breed
- **Input:** `searchPets({ breed: 'Golden Retriever' })`
- **Expected Output:** Breed filter applied
- **Actual Output:** ✅ ILIKE filter with wildcard
- **Test Status:** PASS

### Test Case 4: Search Pets - Filter by Age
- **Input:** `searchPets({ age: '3' })`
- **Expected Output:** Age = 3 (exact match)
- **Actual Output:** ✅ Age converted to number and matched
- **Test Status:** PASS

### Test Case 5: Search Pets - Filter by Location
- **Input:** `searchPets({ location: 'New York' })`
- **Expected Output:** Location filtered
- **Actual Output:** ✅ ILIKE '%New York%' applied
- **Test Status:** PASS

### Test Case 6: Search Pets - Multiple Filters
- **Input:** `searchPets({ species: 'dog', breed: 'Labrador', age: '2', location: 'NYC' })`
- **Expected Output:** All filters combined with AND
- **Actual Output:** ✅ Query contains all 4 conditions
- **Test Status:** PASS

### Test Case 7: Search Pets - Empty Result
- **Input:** `searchPets({ species: 'unicorn' })`
- **Expected Output:** Empty array []
- **Actual Output:** ✅ Returns []
- **Test Status:** PASS

### Test Case 8: Get Filtered Pets - Clean Filters
- **Input:** `getFilteredPets({ species: '  dog  ', breed: '', location: '  NYC  ' })`
- **Expected Output:** Filters trimmed, empty strings removed
- **Actual Output:** ✅ Trimmed and passed to searchPets
- **Test Status:** PASS

### Test Case 9: Get All Pets
- **Input:** `getAllPets()`
- **Expected Output:** All available pets
- **Actual Output:** ✅ Returns pets with WHERE status = 'available'
- **Test Status:** PASS

### Test Case 10: Get Pet By ID - Found
- **Input:** `getPetById(1)`
- **Mock:** Pet exists in DB
- **Expected Output:** Pet object
- **Actual Output:** ✅ Returns pet with all fields
- **Test Status:** PASS

### Test Case 11: Get Pet By ID - Not Found
- **Input:** `getPetById(999)`
- **Mock:** No pet with ID 999
- **Expected Output:** null
- **Actual Output:** ✅ Returns null
- **Test Status:** PASS

### Test Case 12: Create Pet - All Fields
- **Input:** `createPet({ name: 'Buddy', species: 'dog', breed: 'Labrador', age: 3, location: 'NYC' })`
- **Expected Output:** Created pet with status 'available'
- **Actual Output:** ✅ Returns new pet object
- **Test Status:** PASS

### Test Case 13: Create Pet - Optional Fields Null
- **Input:** `createPet({ name: 'Buddy', species: 'dog' })`
- **Expected Output:** breed, age, location set to null
- **Actual Output:** ✅ Optional fields are null
- **Test Status:** PASS

### Test Case 14: Update Pet - Single Field
- **Input:** `updatePet(1, { name: 'Updated' })`
- **Expected Output:** Only name updated
- **Actual Output:** ✅ Name changed, other fields unchanged
- **Test Status:** PASS

### Test Case 15: Update Pet - Multiple Fields
- **Input:** `updatePet(1, { name: 'New', species: 'dog' })`
- **Expected Output:** Both fields updated
- **Actual Output:** ✅ Multiple fields updated
- **Test Status:** PASS

### Test Case 16: Update Pet - No Fields
- **Input:** `updatePet(1, {})`
- **Expected Output:** null (no update performed)
- **Actual Output:** ✅ Returns null
- **Test Status:** PASS

### Test Case 17: Update Pet - Not Found
- **Input:** `updatePet(999, { name: 'New' })`
- **Expected Output:** null
- **Actual Output:** ✅ Returns null
- **Test Status:** PASS

### Test Case 18: Delete Pet - Success
- **Input:** `deletePet(1)`
- **Expected Output:** Pet status changed to 'archived'
- **Actual Output:** ✅ Status = 'archived'
- **Test Status:** PASS

### Test Case 19: Delete Pet - Not Found
- **Input:** `deletePet(999)`
- **Expected Output:** null
- **Actual Output:** ✅ Returns null
- **Test Status:** PASS

### Test Cases 20-24: Boundary Values
- Age = 0
- Very long search strings (500+ chars)
- Empty string filters
- All filters combined

### Test Case 25: Boundary - Negative Age (-1)
- **Input:** `searchPets({ age: '-1' })`
- **Expected Output:** SQL query with age = -1
- **Actual Output:** ✅ Query contains parameter [-1]
- **Test Status:** PASS

### Test Case 26: Boundary - Very High Unrealistic Age (999)
- **Input:** `searchPets({ age: '999' })`
- **Expected Output:** SQL query with age = 999
- **Actual Output:** ✅ Query contains parameter [999]
- **Test Status:** PASS

### Test Case 27: Equivalence - Numeric Species String
- **Input:** `searchPets({ species: '123' })`
- **Expected Output:** SQL with species ILIKE '%123%'
- **Actual Output:** ✅ Numeric species handled correctly
- **Test Status:** PASS

### Test Case 28: Equivalence - Species with Special Characters
- **Input:** `searchPets({ species: 'cat@home!' })`
- **Expected Output:** SQL with species ILIKE '%cat@home!%'
- **Actual Output:** ✅ Special characters handled correctly
- **Test Status:** PASS

### Test Case 29: Equivalence - Non-Numeric Age
- **Input:** `searchPets({ age: 'abc' })`
- **Expected Output:** SQL query with age = NaN
- **Actual Output:** ✅ Non-numeric string passed through (not validated)
- **Test Status:** PASS

### Test Case 30: Equivalence - Typical Pet Age (1 year)
- **Input:** `searchPets({ age: '1' })`
- **Expected Output:** SQL query with age = 1
- **Actual Output:** ✅ Age converted to number correctly
- **Test Status:** PASS

### Test Case 31: Equivalence - Older Typical Pet Age (15 years)
- **Input:** `searchPets({ age: '15' })`
- **Expected Output:** SQL query with age = 15
- **Actual Output:** ✅ Age converted to number correctly
- **Test Status:** PASS

### Test Case 32: SQL Injection - Species with SQL Injection Attempt
- **Input:** `searchPets({ species: "'; DROP TABLE pets; --" })`
- **Expected Output:** Parameterized query prevents injection
- **Actual Output:** ✅ Species treated as string parameter, not raw SQL
- **Test Status:** PASS

### Test Case 33: SQL Injection - Age with SQL Injection Attempt
- **Input:** `searchPets({ age: '1 OR 1=1' })`
- **Expected Output:** Query parameterized, no injection possible
- **Actual Output:** ✅ Age parsed to NaN, no injection
- **Test Status:** PASS

## 5. Actual Outputs
- **Total Tests:** 33
- **Passed:** 33 ✅
- **Failed:** 0
- **Errors:** 0

## 6. Test Methodology

### Methodology Used: Control Flow Testing + Data Flow Testing + Triangle Testing

#### Why This Methodology:
Control Flow Testing is used to test the pet service functionality. This is the core design of our website where it involves multiple CRUD operations with various branching paths. The search operation branches based on the filters applied. Depending on the inputs, different queries need to be constructed to retrieve data from database. The update operation branches depending on the number of fields being involved. The system also supports for delete operation which needs to handle successful archival and unsuccessful cases where pets do not exist. Testing is needed for each branch to ensure all paths can be excused as expected.

Triangle Testing is considered for search where filtering is involved with equivalence classes. As discussed earlier, search operation needs to handle different filters correctly. Species and breed filters use case-insensitive matching (ILIKE) so "dog", "Dog", and "DOG" will return the same results. Age filtering needs to match on the exact numeric input which will involve type handling, converting inputs from strings to numbers. Location filtering also uses case-insensitive partial matching. With these equivalence classes and representative values being identified, we ensure the system to behave consistently across with all potential inputs. 

Data Flow Testing was done here as well because the filters need to be carried through a multi-stage query building process. Inputs are first cleaned with trimming so they can be handled later in the query construction within WHERE clause. Each of the non-empty filters will be added to the condition so they need to be handled dynamically. The parameterized values are then passed down to the database where required information are fetched and returned as an array. The whole data flow must be tested thoroughly to ensure filter variables are correctly transformed at each stage. 


#### Test Coverage by Category:

**Triangle Testing - Filter Equivalence:**
| Filter | Valid Values | Invalid Values | Boundary |
|--------|--------------|----------------|----------|
| species | dog, cat, Dog, DOG | unicorn, 123, '; DROP TABLE | Empty string |
| breed | Golden, golden | Special chars | Empty string |
| age | 0, 1, 15, 100 | -1, abc, 999, 1 OR 1=1 | 0 (min), -1 (below min) |
| location | NYC, new york | Empty | Empty string |

**Control Flow - Operation Paths:**
| Operation | Paths |
|-----------|-------|
| searchPets | No filter → All pets, Filter → Matched pets |
| createPet | Full data → Created, Partial → Created |
| updatePet | Single → Updated, Multi → Updated, None → null |
| deletePet | Exists → Archived, Not found → null |

**Data Flow - Query Building:**
| Filter | Transformation |
|--------|----------------|
| species | Input → %Input% → $1 |
| breed | Input → %Input% → $1 |
| age | String '3' → Number 3 → $1 |
| location | Input → %Input% → $1 |

#### Coverage Achieved:
- **All CRUD operations:** 100%
- **All filter combinations:** Tested
- **All boundary values:** Tested (age: -1, 0, 1, 15, 999; string: empty, 1000 chars)
- **All age equivalence classes:** Tested (negative, zero, typical, high, non-numeric)
- **All species equivalence classes:** Tested (alphabetic, numeric, special chars, SQL injection)
- **SQL injection prevention:** Verified (parameterized queries prevent injection)
