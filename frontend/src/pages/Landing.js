import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="hero">
        <h1>Find Your Perfect Companion</h1>
        <p>Open your heart and home to a pet in need. Every adoption saves a life.</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">Get Started</Link>
          <Link to="/login" className="btn-secondary">Sign In</Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Browse Pets</h3>
          <p>Search through hundreds of pets looking for their forever homes.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Application</h3>
          <p>Our simple adoption process makes it easy to apply.</p>
        </div>
        <div className="feature-card">
          <h3>Make a Difference</h3>
          <p>Adopting gives a homeless pet a second chance at life.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
