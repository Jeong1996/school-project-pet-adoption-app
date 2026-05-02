const { getFilteredPets, getPetById, createPet, updatePet, deletePet, getAllPets } = require("../services/petService");

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

async function handleGetAllPets(req, res) {
  try {
    const pets = await getAllPets();
    return res.status(200).json({
      success: true,
      count: pets.length,
      pets,
    });
  } catch (error) {
    console.error("Get all pets error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get pets",
    });
  }
}

async function handleGetPetById(req, res) {
  const { id } = req.params;
  try {
    const pet = await getPetById(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    return res.status(200).json({ pet });
  } catch (error) {
    console.error("Get pet error:", error);
    return res.status(500).json({ error: "Failed to get pet" });
  }
}

async function handleCreatePet(req, res) {
  const { name, species, breed, age, location } = req.body;
  if (!name || !species) {
    return res.status(400).json({ error: "Name and species are required" });
  }

  try {
    const pet = await createPet({ name, species, breed, age, location });
    return res.status(201).json({ pet });
  } catch (error) {
    console.error("Create pet error:", error);
    return res.status(500).json({ error: "Failed to create pet" });
  }
}

async function handleUpdatePet(req, res) {
  const { id } = req.params;
  const { name, species, breed, age, location, status } = req.body;

  try {
    const pet = await updatePet(id, { name, species, breed, age, location, status });
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    return res.status(200).json({ pet });
  } catch (error) {
    console.error("Update pet error:", error);
    return res.status(500).json({ error: "Failed to update pet" });
  }
}

async function handleDeletePet(req, res) {
  const { id } = req.params;
  try {
    const pet = await deletePet(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    return res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("Delete pet error:", error);
    return res.status(500).json({ error: "Failed to delete pet" });
  }
}

module.exports = {
  handleSearchPets,
  handleGetAllPets,
  handleGetPetById,
  handleCreatePet,
  handleUpdatePet,
  handleDeletePet,
};