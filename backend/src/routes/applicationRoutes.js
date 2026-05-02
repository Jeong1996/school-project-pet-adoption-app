const express = require('express');
const router = express.Router();
const { 
  submitApplication, 
  getUserApplications,
  getAllApplications,
  approveApplication,
  rejectApplication,
  processApplication
} = require('../controllers/applicationController');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/:petId', userMiddleware, submitApplication);
router.get('/user/:userId', userMiddleware, getUserApplications);
router.get('/', adminMiddleware, getAllApplications);

// User-level: auto-process application with validation
router.put('/:applicationId/process', processApplication);

// Admin-only: manually approve or reject
router.put('/:applicationId/approve', adminMiddleware, approveApplication);
router.put('/:applicationId/reject', adminMiddleware, rejectApplication);

module.exports = router;