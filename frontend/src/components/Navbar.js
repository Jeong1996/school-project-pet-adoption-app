import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-logo">Petgram</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="nav-btn-primary" style={{ border: 'none', cursor: 'pointer' }}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register" className="nav-btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
