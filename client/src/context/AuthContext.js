import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const response = await api.get('/auth/me');
          setUser(response.data);
        }
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

 const register = async (name, email, password, role) => {
  try {
    const response = await api.post('/auth/register', { 
      name, 
      email, 
      password, 
      role: role || 'user' 
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 
              error.message || 
              'Registration failed' 
    };
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};