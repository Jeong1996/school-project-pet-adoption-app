import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="main-container">
      <div className="landing">
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=450&h=600&fit=crop" 
            alt="Pets" 
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div className="hero-content">
          <div className="auth-form">
            <h2>Petgram</h2>
            <p>Find your perfect companion</p>
            <Link to="/register" className="btn-primary">Sign up</Link>
            <div className="divider"><span>OR</span></div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <Link to="/login" style={{ fontSize: '14px', color: '#00376b' }}>Log in</Link>
            </div>
          </div>
          
          <div className="auth-form" style={{ marginTop: '16px', padding: '20px', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>
          
          <div className="features-section">
            <h3>Meet your new best friend</h3>
            <div className="features-grid">
              <span className="feature-item">Dogs</span>
              <span className="feature-item">Cats</span>
              <span className="feature-item">Birds</span>
              <span className="feature-item">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
