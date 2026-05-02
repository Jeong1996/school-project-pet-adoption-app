const express = require('express');
const router = express.Router();
const {
  handleSearchPets,
  handleGetAllPets,
  handleGetPetById,
  handleCreatePet,
  handleUpdatePet,
  handleDeletePet,
} = require('../controllers/petController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/search', handleSearchPets);
router.get('/', handleGetAllPets);
router.get('/:id', handleGetPetById);

router.post('/', adminMiddleware, handleCreatePet);
router.put('/:id', adminMiddleware, handleUpdatePet);
router.delete('/:id', adminMiddleware, handleDeletePet);

module.exports = router;