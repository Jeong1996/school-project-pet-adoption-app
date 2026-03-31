const db = require("../db");

async function searchPets(filters) {
  const { species, breed, age, location } = filters;

  let query = `
    SELECT id, name, species, breed, age, location, status
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

module.exports = { searchPets };