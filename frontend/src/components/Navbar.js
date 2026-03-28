import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Pet Adoption</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.name}</span>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="nav-btn">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="nav-btn-primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
