jest.mock('../src/db', () => ({
  query: jest.fn()
}));

jest.mock('../src/sql/applications', () => ({
  applicationsQueries: {
    create: 'INSERT INTO applications (user_id, pet_id, living_situation, experience, reason) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    findByUserId: 'SELECT a.*, p.name as pet_name FROM applications a JOIN pets p ON a.pet_id = p.id WHERE a.user_id = $1 ORDER BY a.created_at DESC',
    findById: 'SELECT * FROM applications WHERE id = $1'
  }
}));

const pool = require('../src/db');
const applicationService = require('../src/services/applicationService');

describe('Application Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submitApplication', () => {
    test('throws error if pet not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await expect(applicationService.submitApplication(1, 999, { livingSituation: '_test_', experience: 'test', reason: 'test' }))
        .rejects.toThrow('Pet not found');
    });

    test('throws error if user not found', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [] });

      await expect(applicationService.submitApplication(999, 1, { livingSituation: 'test', experience: 'test', reason: 'test' }))
        .rejects.toThrow('User not found');
    });

    test('creates application successfully', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ id: 1, user_id: 1, pet_id: 1, living_situation: 'test', experience: 'test', reason: 'test', status: 'pending' }] });

      const result = await applicationService.submitApplication(1, 1, { livingSituation: 'test', experience: 'test', reason: 'test' });

      expect(result).toEqual({ id: 1, user_id: 1, pet_id: 1, living_situation: 'test', experience: 'test', reason: 'test', status: 'pending' });
    });
  });

  describe('getUserApplications', () => {
    test('returns applications for user', async () => {
      const mockApplications = [
        { id: 1, user_id: 1, pet_id: 1, status: 'pending', pet_name: 'Buddy', species: 'Dog', breed: 'Golden' }
      ];
      pool.query.mockResolvedValueOnce({ rows: mockApplications });

      const result = await applicationService.getUserApplications(1);

      expect(result).toEqual(mockApplications);
    });
  });

  describe('validateApplicationInput', () => {
    test('returns error if living situation missing', () => {
      const errors = applicationService.validateApplicationInput({ livingSituation: '', experience: 'test', reason: 'test' });
      expect(errors).toContain('Living situation is required');
    });

    test('returns error if experience missing', () => {
      const errors = applicationService.validateApplicationInput({ livingSituation: 'test', experience: '', reason: 'test' });
      expect(errors).toContain('Experience is required');
    });

    test('returns error if reason missing', () => {
      const errors = applicationService.validateApplicationInput({ livingSituation: 'test', experience: 'test', reason: '' });
      expect(errors).toContain('Reason for adoption is required');
    });

    test('returns empty array if all fields valid', () => {
      const errors = applicationService.validateApplicationInput({ livingSituation: 'test', experience: 'test', reason: 'test' });
      expect(errors).toEqual([]);
    });
  });

  describe('validateApplicationForDecision', () => {
    test('rejects application with apartment living for dog', () => {
      const application = { living_situation: 'I live in an apartment', experience: 'I have owned dogs', reason: 'Looking for a companion' };
      const decision = applicationService.validateApplicationForDecision(application);

      expect(decision.rejected).toBe(true);
      expect(decision.reasons).toContain('Unsuitable living situation for this pet type');
    });

    test('rejects application with no pet experience', () => {
      const application = { living_situation: 'I have a house with yard', experience: 'none', reason: 'Looking for a companion' };
      const decision = applicationService.validateApplicationForDecision(application);

      expect(decision.rejected).toBe(true);
      expect(decision.reasons).toContain('No prior pet experience');
    });

    test('rejects application with short reason', () => {
      const application = { living_situation: 'I have a house with yard', experience: 'I have owned dogs', reason: 'test' };
      const decision = applicationService.validateApplicationForDecision(application);

      expect(decision.rejected).toBe(true);
      expect(decision.reasons).toContain('Reason for adoption is too short');
    });

    test('approves valid application', () => {
      const application = { living_situation: 'I have a house with a big backyard', experience: 'I have had dogs for 5 years', reason: 'Looking for a loving companion for my family' };
      const decision = applicationService.validateApplicationForDecision(application);

      expect(decision.approved).toBe(true);
      expect(decision.rejected).toBe(false);
    });
  });

  describe('approveApplication', () => {
    test('throws error if application not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await expect(applicationService.approveApplication(999))
        .rejects.toThrow('Application not found');
    });

    test('approves application and marks pet as adopted', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, pet_id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ id: 1, status: 'approved' }] })
        .mockResolvedValueOnce({ rows: [] });

      const result = await applicationService.approveApplication(1);

      expect(result.status).toBe('approved');
    });
  });

  describe('rejectApplication', () => {
    test('throws error if application not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await expect(applicationService.rejectApplication(999))
        .rejects.toThrow('Application not found');
    });

    test('rejects application', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, pet_id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ id: 1, status: 'rejected' }] });

      const result = await applicationService.rejectApplication(1);

      expect(result.status).toBe('rejected');
    });
  });

  describe('processApplication', () => {
    test('throws error if application not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      await expect(applicationService.processApplication(999))
        .rejects.toThrow('Application not found');
    });

    test('throws error if already processed', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, status: 'approved' }] });

      await expect(applicationService.processApplication(1))
        .rejects.toThrow('Application already processed');
    });

    test('auto-approves valid application', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, pet_id: 1, status: 'pending', living_situation: 'I have a house', experience: 'I have owned dogs', reason: 'Looking for a companion for my family' }] })
        .mockResolvedValueOnce({ rows: [{ id: 1, status: 'approved' }] })
        .mockResolvedValueOnce({ rows: [] });

      const result = await applicationService.processApplication(1);

      expect(result.decision.approved).toBe(true);
      expect(result.application.status).toBe('approved');
    });

    test('auto-rejects invalid application', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, pet_id: 1, status: 'pending', living_situation: 'apartment', experience: 'none', reason: 'test' }] })
        .mockResolvedValueOnce({ rows: [{ id: 1, status: 'rejected' }] })
        .mockResolvedValueOnce({ rows: [] });

      const result = await applicationService.processApplication(1);

      expect(result.decision.rejected).toBe(true);
      expect(result.application.status).toBe('rejected');
    });
  });
});