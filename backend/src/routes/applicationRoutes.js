const express = require('express');
const router = express.Router();
const { 
  submitApplication, 
  getUserApplications,
  approveApplication,
  rejectApplication,
  processApplication
} = require('../controllers/applicationController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/:petId', submitApplication);
router.get('/user/:userId', getUserApplications);

// User-level: auto-process application with validation
router.put('/:applicationId/process', processApplication);

// Admin-only: manually approve or reject
router.put('/:applicationId/approve', adminMiddleware, approveApplication);
router.put('/:applicationId/reject', adminMiddleware, rejectApplication);

module.exports = router;