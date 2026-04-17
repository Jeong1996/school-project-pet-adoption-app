import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitApplication } from '../services/api';

function ApplicationForm() {
  const { petId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    livingSituation: '',
    experience: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.livingSituation || formData.livingSituation.trim() === '') {
      newErrors.livingSituation = 'Living situation is required';
    }
    if (!formData.experience || formData.experience.trim() === '') {
      newErrors.experience = 'Experience is required';
    }
    if (!formData.reason || formData.reason.trim() === '') {
      newErrors.reason = 'Reason for adoption is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!user) {
      setError('Please log in to submit an application');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitApplication(petId, {
        userId: user.id,
        ...formData
      });
      navigate('/application-success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="main-container">
      <div className="landing">
        <div className="hero-content">
          <div className="auth-form">
            <h2>Adoption Application</h2>
            <p>Tell us about yourself to adopt pet #{petId}</p>
            
            {error && <div className="form-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Living Situation</label>
                <textarea
                  name="livingSituation"
                  placeholder="Describe your home (house/apt, yard, other pets, etc.)"
                  value={formData.livingSituation}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.livingSituation && <span className="error-message">{errors.livingSituation}</span>}
              </div>
              
              <div className="input-group">
                <label>Experience with Pets</label>
                <textarea
                  name="experience"
                  placeholder="Describe your experience with animals"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>
              
              <div className="input-group">
                <label>Reason for Adoption</label>
                <textarea
                  name="reason"
                  placeholder="Why do you want to adopt this pet?"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.reason && <span className="error-message">{errors.reason}</span>}
              </div>
              
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
            
            <p className="auth-switch">
              <Link to="/home" className="auth-link">Cancel</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;