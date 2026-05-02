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

#### Why This Methodology:
Triangle Testing was applied to validate the structure of SQL queries and ensure they conform to expected patterns. Each query type (SELECT, INSERT) represents an equivalence class that must be tested for correct syntax. Parameter count verification ensures queries have the correct number of placeholders matching the number of values being inserted or compared. Query length validation ensures queries are substantial enough to be meaningful.

Data Flow Testing was necessary because field references in queries must correctly map to database columns. The users table queries reference email, password_hash, and name fields. The applications queries must correctly JOIN with the pets table and include fields like pet_name, species, and breed. Testing these field references ensures the queries will execute correctly against the database schema.