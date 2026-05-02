import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error('Error parsing user:', e);
    }
  }
  return config;
});

export const register = (email, password, name) => 
  api.post('/auth/register', { email, password, name });

export const login = (email, password) => 
  api.post('/auth/login', { email, password });

export const adminLogin = (email, password) => 
  api.post('/auth/admin/login', { email, password });

export const submitApplication = (petId, data) => 
  api.post(`/applications/${petId}`, data);

export const getUserApplications = (userId) => 
  api.get(`/applications/user/${userId}`);

export const getPets = () => 
  api.get('/pets');

export const getPet = (id) => 
  api.get(`/pets/${id}`);

export const searchPets = (filters) => 
  api.get('/pets/search', { params: filters });

export const getAllApplications = () => 
  api.get('/applications');

export const approveApplication = (id) => 
  api.put(`/applications/${id}/approve`);

export const rejectApplication = (id) => 
  api.put(`/applications/${id}/reject`);

export default api;
