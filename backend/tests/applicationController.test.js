jest.mock('../src/services/applicationService', () => ({
  submitApplication: jest.fn(),
  getUserApplications: jest.fn(),
  approveApplication: jest.fn(),
  rejectApplication: jest.fn(),
  processApplication: jest.fn(),
  validateApplicationInput: jest.fn()
}));

const applicationService = require('../src/services/applicationService');
const { 
  submitApplication, 
  getUserApplications,
  approveApplication,
  rejectApplication,
  processApplication
} = require('../src/controllers/applicationController');

describe('Application Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('submitApplication', () => {
    test('returns 400 if validation fails', async () => {
      req.params.petId = '1';
      req.body.userId = '1';
      applicationService.validateApplicationInput.mockReturnValue(['Living situation is required']);

      await submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Living situation is required' });
    });

    test('returns 401 if no userId', async () => {
      req.params.petId = '1';
      applicationService.validateApplicationInput.mockReturnValue([]);

      await submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Authentication required' });
    });

    test('returns 201 if successful', async () => {
      req.params.petId = '1';
      req.body.userId = '1';
      req.body.livingSituation = 'test';
      req.body.experience = 'test';
      req.body.reason = 'test';
      applicationService.validateApplicationInput.mockReturnValue([]);
      applicationService.submitApplication.mockResolvedValue({ id: 1, status: 'pending' });

      await submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ application: { id: 1, status: 'pending' } });
    });

    test('returns 404 if pet not found', async () => {
      req.params.petId = '1';
      req.body.userId = '1';
      req.body.livingSituation = 'test';
      req.body.experience = 'test';
      req.body.reason = 'test';
      applicationService.validateApplicationInput.mockReturnValue([]);
      applicationService.submitApplication.mockRejectedValue(new Error('Pet not found'));

      await submitApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Pet not found' });
    });
  });

  describe('getUserApplications', () => {
    test('returns applications', async () => {
      req.params.userId = '1';
      applicationService.getUserApplications.mockResolvedValue([{ id: 1 }]);

      await getUserApplications(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ applications: [{ id: 1 }] });
    });

    test('returns 500 on error', async () => {
      req.params.userId = '1';
      applicationService.getUserApplications.mockRejectedValue(new Error('DB error'));

      await getUserApplications(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    });
  });

  describe('approveApplication', () => {
    test('returns approved application', async () => {
      req.params.applicationId = '1';
      applicationService.approveApplication.mockResolvedValue({ id: 1, status: 'approved' });

      await approveApplication(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ application: { id: 1, status: 'approved' } });
    });

    test('returns 404 if not found', async () => {
      req.params.applicationId = '1';
      applicationService.approveApplication.mockRejectedValue(new Error('Application not found'));

      await approveApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('rejectApplication', () => {
    test('returns rejected application', async () => {
      req.params.applicationId = '1';
      applicationService.rejectApplication.mockResolvedValue({ id: 1, status: 'rejected' });

      await rejectApplication(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ application: { id: 1, status: 'rejected' } });
    });

    test('returns 404 if not found', async () => {
      req.params.applicationId = '1';
      applicationService.rejectApplication.mockRejectedValue(new Error('Application not found'));

      await rejectApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('processApplication', () => {
    test('returns processed application with decision', async () => {
      req.params.applicationId = '1';
      applicationService.processApplication.mockResolvedValue({ 
        application: { id: 1, status: 'approved' },
        decision: { approved: true, rejected: false }
      });

      await processApplication(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ 
        application: { id: 1, status: 'approved' },
        decision: { approved: true, rejected: false }
      });
    });

    test('returns 404 if not found', async () => {
      req.params.applicationId = '1';
      applicationService.processApplication.mockRejectedValue(new Error('Application not found'));

      await processApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('returns 400 if already processed', async () => {
      req.params.applicationId = '1';
      applicationService.processApplication.mockRejectedValue(new Error('Application already processed'));

      await processApplication(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});