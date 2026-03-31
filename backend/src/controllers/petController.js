const { getFilteredPets } = require("../services/petService");

async function handleSearchPets(req, res) {
  try {
    const pets = await getFilteredPets(req.query);

    return res.status(200).json({
      success: true,
      count: pets.length,
      pets,
    });
  } catch (error) {
    console.error("Search pets error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search pets",
    });
  }
}

module.exports = { handleSearchPets };