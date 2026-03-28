import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="auth-form">
        <p>Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <label>Name</label>
        <p>{user.name}</p>
      </div>
      <div className="profile-info">
        <label>Email</label>
        <p>{user.email}</p>
      </div>
      <div className="profile-info">
        <label>Account Type</label>
        <p>{user.role === 'admin' ? 'Administrator' : 'User'}</p>
      </div>
      <button onClick={logout} className="btn-primary" style={{ marginTop: '24px' }}>
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
