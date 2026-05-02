const db = require("../db");

async function searchPets(filters) {
  const { species, breed, age, location } = filters;

  let query = `
    SELECT id, name, species, breed, age, location, image, description, status
    FROM pets
    WHERE status = 'available'
  `;

  const values = [];
  let index = 1;

  if (species) {
    query += ` AND species ILIKE $${index}`;
    values.push(`%${species}%`);
    index++;
  }

  if (breed) {
    query += ` AND breed ILIKE $${index}`;
    values.push(`%${breed}%`);
    index++;
  }

  if (age) {
    query += ` AND age = $${index}`;
    values.push(Number(age));
    index++;
  }

  if (location) {
    query += ` AND location ILIKE $${index}`;
    values.push(`%${location}%`);
    index++;
  }

  query += ` ORDER BY id ASC`;

  const result = await db.query(query, values);
  return result.rows;
}

async function getAllPets() {
  const result = await db.query(`
    SELECT id, name, species, breed, age, location, image, description, status, created_at
    FROM pets
    WHERE status = 'available'
    ORDER BY id ASC
  `);
  return result.rows;
}

async function getPetById(id) {
  const result = await db.query(`
    SELECT id, name, species, breed, age, location, image, description, status, created_at
    FROM pets
    WHERE id = $1
  `, [id]);
  return result.rows[0] || null;
}

async function createPet(petData) {
  const { name, species, breed, age, location, image } = petData;
  const result = await db.query(`
    INSERT INTO pets (name, species, breed, age, location, image, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'available')
    RETURNING id, name, species, breed, age, location, image, description, status
  `, [name, species, breed || null, age || null, location || null, image || null]);
  return result.rows[0];
}

async function updatePet(id, petData) {
  const { name, species, breed, age, location, status } = petData;
  const sets = [];
  const values = [];
  let idx = 1;

  if (name !== undefined) {
    sets.push(`name = $${idx++}`);
    values.push(name);
  }
  if (species !== undefined) {
    sets.push(`species = $${idx++}`);
    values.push(species);
  }
  if (breed !== undefined) {
    sets.push(`breed = $${idx++}`);
    values.push(breed);
  }
  if (age !== undefined) {
    sets.push(`age = $${idx++}`);
    values.push(age);
  }
  if (location !== undefined) {
    sets.push(`location = $${idx++}`);
    values.push(location);
  }
  if (status !== undefined) {
    sets.push(`status = $${idx++}`);
    values.push(status);
  }

  if (sets.length === 0) return null;

  values.push(id);
  const query = `UPDATE pets SET ${sets.join(', ')} WHERE id = $${idx} RETURNING id, name, species, breed, age, location, image, description, status`;
  const result = await db.query(query, values);
  return result.rows[0] || null;
}

async function deletePet(id) {
  const result = await db.query(`
    UPDATE pets SET status = 'archived' WHERE id = $1
    RETURNING id, name, species, breed, age, location, image, description, status
  `, [id]);
  return result.rows[0] || null;
}

async function getFilteredPets(filters) {
  const cleanedFilters = {
    species: filters.species?.trim() || "",
    breed: filters.breed?.trim() || "",
    age: filters.age || "",
    location: filters.location?.trim() || "",
  };

  return await searchPets(cleanedFilters);
}

module.exports = {
  searchPets,
  getFilteredPets,
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};