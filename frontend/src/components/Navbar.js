import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Fragment } from 'react';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to={user ? "/home" : "/"} className="nav-logo">Petgram</Link>
        <div className="nav-links">
          {user ? (
            <Fragment>
              <Link to="/home">Home</Link>
              <Link to="/pets">Browse Pets</Link>
              <Link to="/applications">Applications</Link>
              <Link to="/profile">Profile</Link>
              <span className="welcome-text">({user.name})</span>
              <button onClick={logout} className="nav-btn-primary" style={{ border: 'none', cursor: 'pointer' }}>Log out</button>
            </Fragment>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
