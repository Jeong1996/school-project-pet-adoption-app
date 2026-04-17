import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationSuccess from './pages/ApplicationSuccess';
import Applications from './pages/Applications';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/apply/:petId" 
            element={
              <PrivateRoute>
                <ApplicationForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/application-success" 
            element={
              <PrivateRoute>
                <ApplicationSuccess />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/applications" 
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
