jest.mock('../src/services/petService');

const petService = require('../src/services/petService');
const {
  handleSearchPets,
  handleGetAllPets,
  handleGetPetById,
  handleCreatePet,
  handleUpdatePet,
  handleDeletePet
} = require('../src/controllers/petController');

describe('Pet Controller - Control Flow & Data Flow Testing', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('Control Flow Testing - handleSearchPets', () => {
    test('Branch: Search successful', async () => {
      req.query = { species: 'dog', breed: 'Labrador' };
      petService.getFilteredPets.mockResolvedValue([
        { id: 1, name: 'Buddy', species: 'dog' }
      ]);

      await handleSearchPets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        pets: [{ id: 1, name: 'Buddy', species: 'dog' }]
      });
    });

    test('Branch: Empty search results', async () => {
      req.query = { species: 'unicorn' };
      petService.getFilteredPets.mockResolvedValue([]);

      await handleSearchPets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 0,
        pets: []
      });
    });

    test('Path: Error handling', async () => {
      req.query = {};
      petService.getFilteredPets.mockRejectedValue(new Error('DB Error'));

      await handleSearchPets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to search pets'
      });
    });
  });

  describe('Control Flow Testing - handleGetAllPets', () => {
    test('Branch: Get all pets successful', async () => {
      petService.getAllPets.mockResolvedValue([
        { id: 1, name: 'Buddy' },
        { id: 2, name: 'Whiskers' }
      ]);

      await handleGetAllPets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        pets: [{ id: 1, name: 'Buddy' }, { id: 2, name: 'Whiskers' }]
      });
    });

    test('Path: Error handling', async () => {
      petService.getAllPets.mockRejectedValue(new Error('DB Error'));

      await handleGetAllPets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('Data Flow Testing - handleGetPetById', () => {
    test('Data Flow: Pet found - DEF id from params, USE in service call', async () => {
      req.params = { id: '1' };
      petService.getPetById.mockResolvedValue({ id: 1, name: 'Buddy' });

      await handleGetPetById(req, res);

      expect(petService.getPetById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ pet: { id: 1, name: 'Buddy' } });
    });

    test('Data Flow: Pet not found - use null response', async () => {
      req.params = { id: '999' };
      petService.getPetById.mockResolvedValue(null);

      await handleGetPetById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pet not found' });
    });

    test('Data Flow: Error handling', async () => {
      req.params = { id: '1' };
      petService.getPetById.mockRejectedValue(new Error('DB Error'));

      await handleGetPetById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to get pet' });
    });
  });

  describe('Control Flow Testing - handleCreatePet', () => {
    test('Branch: Missing required fields - name', async () => {
      req.body = { species: 'dog' };

      await handleCreatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Name and species are required' });
    });

    test('Branch: Missing required fields - species', async () => {
      req.body = { name: 'Buddy' };

      await handleCreatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('Branch: Missing both fields', async () => {
      req.body = {};

      await handleCreatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('Branch: Create successful', async () => {
      req.body = { name: 'Buddy', species: 'dog', breed: 'Labrador', age: 3, location: 'NYC' };
      petService.createPet.mockResolvedValue({ id: 1, name: 'Buddy', species: 'dog' });

      await handleCreatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ pet: { id: 1, name: 'Buddy', species: 'dog' } });
    });

    test('Path: Error during creation', async () => {
      req.body = { name: 'Buddy', species: 'dog' };
      petService.createPet.mockRejectedValue(new Error('DB Error'));

      await handleCreatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('Control Flow Testing - handleUpdatePet', () => {
    test('Branch: Update successful', async () => {
      req.params = { id: '1' };
      req.body = { name: 'UpdatedBuddy', status: 'adopted' };
      petService.updatePet.mockResolvedValue({ id: 1, name: 'UpdatedBuddy', status: 'adopted' });

      await handleUpdatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Branch: Pet not found', async () => {
      req.params = { id: '999' };
      req.body = { name: 'NewName' };
      petService.updatePet.mockResolvedValue(null);

      await handleUpdatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('Path: Error during update', async () => {
      req.params = { id: '1' };
      req.body = { name: 'NewName' };
      petService.updatePet.mockRejectedValue(new Error('DB Error'));

      await handleUpdatePet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('Control Flow Testing - handleDeletePet', () => {
    test('Branch: Delete successful', async () => {
      req.params = { id: '1' };
      petService.deletePet.mockResolvedValue({ id: 1, status: 'archived' });

      await handleDeletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Pet deleted successfully' });
    });

    test('Branch: Pet not found', async () => {
      req.params = { id: '999' };
      petService.deletePet.mockResolvedValue(null);

      await handleDeletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('Path: Error during delete', async () => {
      req.params = { id: '1' };
      petService.deletePet.mockRejectedValue(new Error('DB Error'));

      await handleDeletePet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('Triangle Testing - Input Validation', () => {
    describe('Equivalence Partitioning', () => {
      test('Valid: Complete pet data', async () => {
        req.body = { name: 'Buddy', species: 'dog', breed: 'Lab', age: 3, location: 'NYC' };
        petService.createPet.mockResolvedValue({ id: 1 });

        await handleCreatePet(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
      });

      test('Invalid: Missing name only', async () => {
        req.body = { species: 'dog' };

        await handleCreatePet(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
      });

      test('Invalid: Missing species only', async () => {
        req.body = { name: 'Buddy' };

        await handleCreatePet(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
      });
    });

    describe('Boundary Values', () => {
      test('Boundary: Empty string name', async () => {
        req.body = { name: '', species: 'dog' };

        await handleCreatePet(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
      });

      test('Boundary: Empty string species', async () => {
        req.body = { name: 'Buddy', species: '' };

        await handleCreatePet(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
      });
    });
  });
});