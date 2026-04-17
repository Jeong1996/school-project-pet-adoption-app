import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserApplications } from '../services/api';

function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.id) return;
      
      try {
        const response = await getUserApplications(user.id);
        setApplications(response.data.applications);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return <div className="main-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="main-container">
      <div className="home">
        <h1>My Applications</h1>
        
        {error && <div className="form-error">{error}</div>}
        
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>You haven't submitted any applications yet.</p>
            <p>Browse pets to find your perfect companion!</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="application-header">
                  <h3>{app.pet_name}</h3>
                  <span className={`status-badge ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <div className="application-details">
                  <p><strong>Species:</strong> {app.species}</p>
                  <p><strong>Breed:</strong> {app.breed}</p>
                  <p><strong>Living Situation:</strong> {app.living_situation}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  <p><strong>Submitted:</strong> {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;