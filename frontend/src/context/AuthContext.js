import { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, adminLogin as apiAdminLogin } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const { token, ...userData } = response.data.user;
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  };

  const register = async (email, password, name) => {
    const response = await apiRegister(email, password, name);
    const { token, ...userData } = response.data.user;
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  };

  const adminLogin = async (email, password) => {
    const response = await apiAdminLogin(email, password);
    const { token, ...userData } = response.data.user;
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    localStorage.setItem('user', JSON.stringify(userWithToken));
    return userWithToken;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
