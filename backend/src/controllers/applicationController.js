const applicationService = require('../services/applicationService');

async function submitApplication(req, res) {
  const { petId } = req.params;
  const userId = req.body.userId || req.user?.id;
  const { livingSituation, experience, reason } = req.body;
  
  const errors = applicationService.validateApplicationInput({ livingSituation, experience, reason });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] });
  }
  
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const application = await applicationService.submitApplication(userId, petId, {
      livingSituation,
      experience,
      reason
    });
    res.status(201).json({ application });
  } catch (err) {
    if (err.message === 'Pet not found' || err.message === 'User not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getUserApplications(req, res) {
  const { userId } = req.params;
  
  try {
    const applications = await applicationService.getUserApplications(userId);
    res.json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function approveApplication(req, res) {
  const { applicationId } = req.params;
  
  try {
    const application = await applicationService.approveApplication(applicationId);
    res.json({ application });
  } catch (err) {
    if (err.message === 'Application not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function rejectApplication(req, res) {
  const { applicationId } = req.params;
  
  try {
    const application = await applicationService.rejectApplication(applicationId);
    res.json({ application });
  } catch (err) {
    if (err.message === 'Application not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function processApplication(req, res) {
  const { applicationId } = req.params;
  
  try {
    const result = await applicationService.processApplication(applicationId);
    res.json(result);
  } catch (err) {
    if (err.message === 'Application not found') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Application already processed') {
      return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { 
  submitApplication, 
  getUserApplications,
  approveApplication,
  rejectApplication,
  processApplication
};