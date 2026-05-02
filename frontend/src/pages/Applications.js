import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserApplications, getAllApplications, approveApplication, rejectApplication } from '../services/api';

function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    
    const fetchApplications = async () => {
      try {
        let response;
        if (user.role === 'admin') {
          response = await getAllApplications();
        } else {
          response = await getUserApplications(user.id);
        }
        setApplications(response.data.applications || []);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleApprove = async (id) => {
    try {
      await approveApplication(id);
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: 'approved' } : app
      ));
    } catch (err) {
      setError('Failed to approve application');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: 'rejected' } : app
      ));
    } catch (err) {
      setError('Failed to reject application');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const pageTitle = user?.role === 'admin' ? 'Applications' : 'My Applications';

  if (loading) {
    return <div className="main-container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="main-container">
      <div className="home">
        <h1>{pageTitle}</h1>
        
        {error && <div className="form-error">{error}</div>}
        
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications found.</p>
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
                  {user?.role === 'admin' && (
                    <>
                      <p><strong>Applicant:</strong> {app.user_name} ({app.user_email})</p>
                    </>
                  )}
                  <p><strong>Species:</strong> {app.species}</p>
                  <p><strong>Breed:</strong> {app.breed}</p>
                  <p><strong>Living Situation:</strong> {app.living_situation}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  <p><strong>Submitted:</strong> {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
                {user?.role === 'admin' && app.status === 'pending' && (
                  <div className="app-actions">
                    <button className="btn-approve" onClick={() => handleApprove(app.id)}>Approve</button>
                    <button className="btn-reject" onClick={() => handleReject(app.id)}>Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;