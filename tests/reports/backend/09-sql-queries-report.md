# Unit Test Report: SQL Queries

## 1. Unit
**Source Files Tested:**
- `backend/src/sql/users.js`
- `backend/src/sql/pets.js`  
- `backend/src/sql/applications.js`

## 2. Date
2026-05-02

## 3. Engineers
Yu Gyeom Jeong and Xinyi Gu

## 4. Automated Test Code

### Users Queries Tests
- **findByEmail** - Query contains users table and email column
- **findById** - Query selects id, email, name, role, created_at
- **create** - INSERT with RETURNING clause, 3 parameters ($1, $2, $3)
- **findAdminByEmail** - Query filters by role

### Applications Queries Tests
- **create** - INSERT with 5 parameters (user_id, pet_id, living_situation, experience, reason)
- **findByUserId** - JOIN with pets table, includes pet_name
- **findById** - Simple select by id
- **findByPetId** - Select by pet_id

### Pets Module Tests
- **searchPets function** - Exported and callable
- **Handles undefined/null** - Edge case handling
- **Empty filter object** - Returns all available

### Boundary Tests
- Parameter counts: $1, $1, $2, $3, $5 verification
- Query length > 10 chars validation

## 5. Actual Outputs
- **Tests:** 20 | **Passed:** 20 ✅

## 6. Test Methodology
**Triangle Testing:** Query structure equivalence classes
**Data Flow Testing:** Field reference validation