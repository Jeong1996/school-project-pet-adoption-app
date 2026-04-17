import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
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

export default api;
