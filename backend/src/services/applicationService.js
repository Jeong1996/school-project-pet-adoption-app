const pool = require('../db');
const { applicationsQueries } = require('../sql/applications');

async function submitApplication(userId, petId, data) {
  const petCheck = await pool.query('SELECT id FROM pets WHERE id = $1', [petId]);
  if (petCheck.rows.length === 0) {
    throw new Error('Pet not found');
  }
  
  const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
  if (userCheck.rows.length === 0) {
    throw new Error('User not found');
  }
  
  const result = await pool.query(
    applicationsQueries.create,
    [userId, petId, data.livingSituation, data.experience, data.reason]
  );
  
  return result.rows[0];
}

async function getUserApplications(userId) {
  const result = await pool.query(applicationsQueries.findByUserId, [userId]);
  return result.rows;
}

async function getAllApplications() {
  const result = await pool.query(`
    SELECT a.*, u.name as user_name, u.email as user_email, p.name as pet_name, p.species, p.breed
    FROM applications a
    JOIN users u ON a.user_id = u.id
    JOIN pets p ON a.pet_id = p.id
    ORDER BY a.created_at DESC
  `);
  return result.rows;
}

async function approveApplication(applicationId) {
  const appCheck = await pool.query('SELECT * FROM applications WHERE id = $1', [applicationId]);
  if (appCheck.rows.length === 0) {
    throw new Error('Application not found');
  }
  
  const result = await pool.query(
    'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
    ['approved', applicationId]
  );
  
  await pool.query(
    'UPDATE pets SET status = $1 WHERE id = $2',
    ['adopted', appCheck.rows[0].pet_id]
  );
  
  return result.rows[0];
}

async function rejectApplication(applicationId) {
  const appCheck = await pool.query('SELECT * FROM applications WHERE id = $1', [applicationId]);
  if (appCheck.rows.length === 0) {
    throw new Error('Application not found');
  }
  
  const result = await pool.query(
    'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
    ['rejected', applicationId]
  );
  
  return result.rows[0];
}

function validateApplicationInput(data) {
  const errors = [];
  
  if (!data.livingSituation || data.livingSituation.trim() === '') {
    errors.push('Living situation is required');
  }
  
  if (!data.experience || data.experience.trim() === '') {
    errors.push('Experience is required');
  }
  
  if (!data.reason || data.reason.trim() === '') {
    errors.push('Reason for adoption is required');
  }
  
  return errors;
}

function validateApplicationForDecision(application) {
  const validation = {
    approved: false,
    rejected: false,
    reasons: []
  };
  
  const livingSituation = application.living_situation?.toLowerCase() || '';
  const experience = application.experience?.toLowerCase() || '';
  const reason = application.reason?.toLowerCase() || '';
  
  // Reject if living situation indicates unsuitable home
  if (livingSituation.includes('apartment') && !livingSituation.includes(' balcony') && !livingSituation.includes('yard') && !livingSituation.includes('garden')) {
    validation.reasons.push('Unsuitable living situation for this pet type');
  }
  
  // Reject if no experience with pets
  if (experience.includes('none') || experience.includes('never') || experience.includes('no experience')) {
    validation.reasons.push('No prior pet experience');
  }
  
  // Reject if reason seems impulsive or unclear
  if (reason.length < 10) {
    validation.reasons.push('Reason for adoption is too short');
  }
  
  // If any rejection reasons, mark as rejected
  if (validation.reasons.length > 0) {
    validation.rejected = true;
  } else {
    validation.approved = true;
  }
  
  return validation;
}

async function processApplication(applicationId) {
  const appCheck = await pool.query('SELECT a.*, p.species, p.name as pet_name FROM applications a JOIN pets p ON a.pet_id = p.id WHERE a.id = $1', [applicationId]);
  if (appCheck.rows.length === 0) {
    throw new Error('Application not found');
  }
  
  const application = appCheck.rows[0];
  
  // Check if already processed
  if (application.status !== 'pending') {
    throw new Error('Application already processed');
  }
  
  // Run validation
  const decision = validateApplicationForDecision(application);
  
  let result;
  if (decision.approved) {
    result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      ['approved', applicationId]
    );
    
    await pool.query(
      'UPDATE pets SET status = $1 WHERE id = $2',
      ['adopted', application.pet_id]
    );
  } else {
    result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      ['rejected', applicationId]
    );
  }
  
  return {
    application: result.rows[0],
    decision: decision
  };
}

module.exports = {
  submitApplication,
  getUserApplications,
  getAllApplications,
  validateApplicationInput,
  approveApplication,
  rejectApplication,
  processApplication,
  validateApplicationForDecision
};