import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: '', email: '' }); // Store username and email

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await axios.get('https://ques-ai-3lhh.onrender.com/api/auth/verify', {
            headers: { 'x-auth-token': storedToken },
          });

          setIsAuthenticated(true);
          setToken(storedToken);

          // Fetch user profile
          const profileResponse = await axios.get('https://ques-ai-3lhh.onrender.com/api/auth/profile', {
            headers: { 'x-auth-token': storedToken },
          });

          setUser({
            username: profileResponse.data.username,
            email: profileResponse.data.email,
          });

        } catch (error) {
          console.error('Token verification failed:', error);
          logout(); // Auto-logout on failed verification
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (newToken) => {
    localStorage.setItem('token', newToken);
    setIsAuthenticated(true);
    setToken(newToken);

    // Fetch and set user profile after logging in
    const profileResponse = await axios.get('https://ques-ai-3lhh.onrender.com/api/auth/profile', {
      headers: { 'x-auth-token': newToken },
    });

    setUser({
      username: profileResponse.data.username,
      email: profileResponse.data.email,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setToken(null);
    setUser({ username: '', email: '' });
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Render loading state
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
