const { searchPets } = require("../sql/pets");

async function getFilteredPets(filters) {
  const cleanedFilters = {
    species: filters.species?.trim() || "",
    breed: filters.breed?.trim() || "",
    age: filters.age || "",
    location: filters.location?.trim() || "",
  };

  return await searchPets(cleanedFilters);
}

module.exports = { getFilteredPets };