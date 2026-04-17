const applicationsQueries = {
  create: `INSERT INTO applications (user_id, pet_id, living_situation, experience, reason) 
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  
  findByUserId: `SELECT a.*, p.name as pet_name, p.species, p.breed 
                 FROM applications a 
                 JOIN pets p ON a.pet_id = p.id 
                 WHERE a.user_id = $1 
                 ORDER BY a.created_at DESC`,
  
  findById: `SELECT * FROM applications WHERE id = $1`,
  
  findByPetId: `SELECT * FROM applications WHERE pet_id = $1 ORDER BY created_at DESC`,
};

module.exports = { applicationsQueries };