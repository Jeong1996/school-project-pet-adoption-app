import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBrowsePets = () => {
    navigate('/pets');
  };

  const handleViewApplications = () => {
    navigate('/applications');
  };

  const appsTitle = user?.role === 'admin' ? 'Applications' : 'My Applications';
  const appsDesc = user?.role === 'admin' 
    ? 'Track the status of adoption applications' 
    : 'Track the status of your adoption applications';

  return (
    <div className="main-container">
      <div className="home">
        <div className="home-header">
          <h1>Welcome back, {user?.name}!</h1>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">🐕</div>
            <h3>View Animals</h3>
            <p>Browse available pets looking for their forever home</p>
            <button className="btn-primary" onClick={handleBrowsePets}>Browse Pets</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h3>{appsTitle}</h3>
            <p>{appsDesc}</p>
            <button className="btn-primary" onClick={handleViewApplications}>View Applications</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏠</div>
            <h3>My Profile</h3>
            <p>Update your account information and preferences</p>
            <button className="btn-primary" onClick={() => navigate('/profile')}>Edit Profile</button>
          </div>
        </div>

        <div className="account-section">
          <h2>Account Information</h2>
          <div className="account-details">
            <div className="account-item">
              <span className="label">Name:</span>
              <span className="value">{user?.name}</span>
            </div>
            <div className="account-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
