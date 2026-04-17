import { Link } from 'react-router-dom';

function ApplicationSuccess() {
  return (
    <div className="main-container">
      <div className="landing">
        <div className="hero-content">
          <div className="auth-form">
            <h2>Application Submitted!</h2>
            <p>Your adoption application has been sent. We'll review it and get back to you soon.</p>
            
            <div className="success-icon">
              <span role="img" aria-label="checkmark">✓</span>
            </div>
            
            <Link to="/home" className="btn-primary">
              Back to Home
            </Link>
            
            <p className="auth-switch">
              <Link to="/profile" className="auth-link">View My Applications</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSuccess;