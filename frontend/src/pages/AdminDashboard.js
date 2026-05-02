import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllApplications, approveApplication, rejectApplication } from '../services/api';

function AdminDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    if (user?.role === 'admin') {
      console.log('Fetching applications as admin...');
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await getAllApplications();
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveApplication(id);
      fetchApplications();
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectApplication(id);
      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="admin-error">
          <h2>Access Denied</h2>
          <p>You do not have admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage adoption applications</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.filter(a => a.status === 'pending').length})
        </button>
        <button 
          className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved ({applications.filter(a => a.status === 'approved').length})
        </button>
        <button 
          className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({applications.filter(a => a.status === 'rejected').length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="admin-list">
          {applications.filter(a => activeTab === 'applications' ? a.status === 'pending' : 
            activeTab === 'approved' ? a.status === 'approved' : a.status === 'rejected').length === 0 ? (
            <div className="no-data">No applications found.</div>
          ) : (
            applications.filter(a => activeTab === 'applications' ? a.status === 'pending' : 
              activeTab === 'approved' ? a.status === 'approved' : a.status === 'rejected').map((app) => (
              <div key={app.id} className="application-card">
                <div className="app-header">
                  <h3>{app.pet_name}</h3>
                  <span className={`status ${app.status}`}>{app.status}</span>
                </div>
                <div className="app-details">
                  <p><strong>Applicant:</strong> {app.user_name} ({app.user_email})</p>
                  <p><strong>Species:</strong> {app.species}</p>
                  <p><strong>Breed:</strong> {app.breed || 'Unknown'}</p>
                  <p><strong>Living Situation:</strong> {app.living_situation}</p>
                  <p><strong>Experience:</strong> {app.experience}</p>
                  <p><strong>Reason:</strong> {app.reason}</p>
                  <p><strong>Submitted:</strong> {new Date(app.created_at).toLocaleString()}</p>
                </div>
                {app.status === 'pending' && (
                  <div className="app-actions">
                    <button 
                      className="btn-approve"
                      onClick={() => handleApprove(app.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => handleReject(app.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;