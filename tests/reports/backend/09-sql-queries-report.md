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
We used Triangle Testing to validate the structure of SQL queries and ensure they conform to the expected patterns. Each query types, SELECT and INSERT, represents an equivalence class where we need to test for the syntax formation. Parameter count verification ensures all queries to have the correct number of placeholders that matches with the number of inputs. Query length validation makes sure the queries are substantial enough to be meaningful in system running. 

Data Flow Testing was necessary for this functionality because field references must be correctly mapped to columns in tables. For authentication, the queries to retrieve user information reference the Email and password fields. The queries for application must correctly perform the JOIN operation and include fields of pet_name, species, and breed. These tests ensure the success of data retrieval from database for each functionality to work properly.
