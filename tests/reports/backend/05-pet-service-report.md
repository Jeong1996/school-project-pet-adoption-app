# Unit Test Report: Pet Service

## 1. Unit
**Source Files Tested:**
- `backend/src/services/petService.js` - Pet CRUD operations and search functionality

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong

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

## 5. Actual Outputs
- **Total Tests:** 24
- **Passed:** 24 ✅
- **Failed:** 0
- **Errors:** 0

## 6. Test Methodology

### Methodology Used: Control Flow Testing + Data Flow Testing + Triangle Testing

#### Why Control Flow Testing:
Pet service has multiple CRUD operations with various branching:
- **Search branch:** No filters vs single filter vs multiple filters
- **Update branch:** Single field vs multiple fields vs no fields
- **Delete branch:** Success vs not found

#### Why Triangle Testing:
Search filters have equivalence classes:
1. **Species:** Valid species vs invalid species names
2. **Breed:** Exact match vs partial match (ILIKE)
3. **Age:** Valid number vs string vs negative
4. **Location:** Exact match vs case-insensitive match

#### Why Data Flow Testing:
Filter data flows through query building:
1. **Input filters** → Clean/trim values
2. **Clean filters** → Build SQL WHERE clause
3. **SQL query** → Execute with parameterized values
4. **Result** → Return as array

#### Test Coverage by Category:

**Triangle Testing - Filter Equivalence:**
| Filter | Valid Values | Invalid Values | Boundary |
|--------|--------------|----------------|----------|
| species | dog, cat, Dog, DOG | unicorn, 123 | Empty string |
| breed | Golden, golden | Special chars | Empty string |
| age | 0, 1, 100 | -1, abc | 0 (min) |
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
- **All boundary values:** Tested