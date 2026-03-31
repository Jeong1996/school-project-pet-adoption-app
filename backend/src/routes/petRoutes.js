const express = require("express");
const router = express.Router();
const { handleSearchPets } = require("../controllers/petController");

router.get("/search", handleSearchPets);

module.exports = router;