jest.mock('../src/db', () => ({
  query: jest.fn()
}));

const pool = require('../src/db');
const petService = require('../src/services/petService');

describe('Pet Service - Control Flow & Data Flow Testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Control Flow Testing - searchPets', () => {
    test('Branch: No filters - returns all available pets', async () => {
      const mockPets = [
        { id: 1, name: 'Buddy', species: 'dog', status: 'available' },
        { id: 2, name: 'Whiskers', species: 'cat', status: 'available' }
      ];
      pool.query.mockResolvedValue({ rows: mockPets });

      const result = await petService.searchPets({});

      expect(result).toEqual(mockPets);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE status = \'available\''),
        []
      );
    });

    test('Branch: Filter by species only', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, species: 'dog' }] });

      const result = await petService.searchPets({ species: 'dog' });

      expect(result).toHaveLength(1);
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('species ILIKE'),
        ['%dog%']
      );
    });

    test('Branch: Filter by breed only', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, breed: 'Golden Retriever' }] });

      const result = await petService.searchPets({ breed: 'Golden Retriever' });

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('breed ILIKE'),
        ['%Golden Retriever%']
      );
    });

    test('Branch: Filter by age only', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, age: 3 }] });

      const result = await petService.searchPets({ age: '3' });

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('age ='),
        [3]
      );
    });

    test('Branch: Filter by location only', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, location: 'New York' }] });

      const result = await petService.searchPets({ location: 'New York' });

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('location ILIKE'),
        ['%New York%']
      );
    });

    test('Branch: Multiple filters combined', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] });

      const result = await petService.searchPets({ 
        species: 'dog', 
        breed: 'Labrador',
        age: '2',
        location: 'NYC'
      });

      expect(pool.query).toHaveBeenCalledTimes(1);
      const callArgs = pool.query.mock.calls[0];
      expect(callArgs[0]).toContain('species ILIKE');
      expect(callArgs[0]).toContain('breed ILIKE');
      expect(callArgs[0]).toContain('age =');
      expect(callArgs[0]).toContain('location ILIKE');
    });

    test('Path: Empty result set', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await petService.searchPets({ species: 'unicorn' });

      expect(result).toEqual([]);
    });
  });

  describe('Data Flow Testing - getFilteredPets', () => {
    test('Data Flow: Clean and pass filters to searchPets', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] });
      
      const filters = { species: '  dog  ', breed: '', age: '', location: '  NYC  ' };
      await petService.getFilteredPets(filters);

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('species ILIKE'),
        expect.arrayContaining(['%dog%'])
      );
    });

    test('Data Flow: Empty strings filtered out', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await petService.getFilteredPets({ species: '   ', breed: '', age: '', location: '' });

      const callArgs = pool.query.mock.calls[0];
      expect(callArgs[1]).toEqual([]);
    });
  });

  describe('Data Flow Testing - getAllPets', () => {
    test('Data Flow: DEF - query result, USE - return rows', async () => {
      const mockPets = [{ id: 1 }, { id: 2 }];
      pool.query.mockResolvedValue({ rows: mockPets });

      const result = await petService.getAllPets();

      expect(result).toEqual(mockPets);
    });

    test('Data Flow: Empty result', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await petService.getAllPets();

      expect(result).toEqual([]);
    });
  });

  describe('Data Flow Testing - getPetById', () => {
    test('Data Flow: Pet found', async () => {
      const mockPet = { id: 1, name: 'Buddy' };
      pool.query.mockResolvedValue({ rows: [mockPet] });

      const result = await petService.getPetById(1);

      expect(result).toEqual(mockPet);
    });

    test('Data Flow: Pet not found - return null', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await petService.getPetById(999);

      expect(result).toBeNull();
    });
  });

  describe('Control Flow Testing - createPet', () => {
    test('Branch: Create with all fields', async () => {
      const mockPet = { id: 1, name: 'Buddy', species: 'dog', breed: 'Labrador', age: 3, location: 'NYC', status: 'available' };
      pool.query.mockResolvedValue({ rows: [mockPet] });

      const result = await petService.createPet({ 
        name: 'Buddy', species: 'dog', breed: 'Labrador', age: 3, location: 'NYC' 
      });

      expect(result).toEqual(mockPet);
    });

    test('Branch: Create with optional fields null', async () => {
      const mockPet = { id: 1, name: 'Buddy', species: 'dog', breed: null, age: null, location: null, status: 'available' };
      pool.query.mockResolvedValue({ rows: [mockPet] });

      const result = await petService.createPet({ name: 'Buddy', species: 'dog' });

      expect(result.breed).toBeNull();
      expect(result.age).toBeNull();
    });
  });

  describe('Control Flow Testing - updatePet', () => {
    test('Branch: Update single field', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'Updated' }] });

      const result = await petService.updatePet(1, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });

    test('Branch: Update multiple fields', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1, name: 'New', species: 'dog', status: 'available' }] });

      const result = await petService.updatePet(1, { name: 'New', species: 'dog' });

      expect(result.name).toBe('New');
      expect(result.species).toBe('dog');
    });

    test('Branch: No fields to update - return null', async () => {
      const result = await petService.updatePet(1, {});

      expect(result).toBeNull();
      expect(pool.query).not.toHaveBeenCalled();
    });

    test('Branch: Pet not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await petService.updatePet(999, { name: 'New' });

      expect(result).toBeNull();
    });
  });

  describe('Control Flow Testing - deletePet', () => {
    test('Path: Archive existing pet', async () => {
      const mockPet = { id: 1, status: 'archived' };
      pool.query.mockResolvedValue({ rows: [mockPet] });

      const result = await petService.deletePet(1);

      expect(result.status).toBe('archived');
    });

    test('Path: Pet not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const result = await petService.deletePet(999);

      expect(result).toBeNull();
    });
  });

  describe('Triangle Testing - Input Validation', () => {
    describe('Equivalence Classes', () => {
      test('Valid: age as number string', async () => {
        pool.query.mockResolvedValue({ rows: [] });
        await petService.searchPets({ age: '5' });
        expect(pool.query).toHaveBeenCalledWith(expect.any(String), expect.arrayContaining([5]));
      });

      test('Valid: Empty filters (equivalence class)', async () => {
        pool.query.mockResolvedValue({ rows: [] });
        await petService.searchPets({});
        expect(pool.query).toHaveBeenCalled();
      });

      test('Valid: All filters present', async () => {
        pool.query.mockResolvedValue({ rows: [] });
        await petService.searchPets({ species: 'dog', breed: 'Lab', age: '2', location: 'NYC' });
        expect(pool.query).toHaveBeenCalled();
      });
    });

    describe('Boundary Values', () => {
      test('Boundary: age = 0', async () => {
        pool.query.mockResolvedValue({ rows: [] });
        await petService.searchPets({ age: '0' });
        expect(pool.query).toHaveBeenCalledWith(expect.any(String), [0]);
      });

      test('Boundary: Very long string', async () => {
        const longString = 'a'.repeat(1000);
        pool.query.mockResolvedValue({ rows: [] });
        await petService.searchPets({ species: longString });
        expect(pool.query).toHaveBeenCalledWith(expect.any(String), [`%${longString}%`]);
      });
    });
  });
});