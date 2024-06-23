// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import { login as loginService, logout as logoutService, refreshAccessToken } from '../services/authService';
import { fetchUser } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const initializeUser = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
      if (userData.role === 'ADMIN') {
        navigate('/admin');
      } else if (userData.role === 'PERSONAL') {
        navigate('/user');
      }
      else if (userData.role === 'BUSINESS') {
        navigate('/business');
      }
      else if (userData.role === 'BUSINESS_ADMIN') {
        navigate('/business_admin');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      initializeUser();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      localStorage.setItem('jwtToken', response.jwtToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.jwtToken}`;
      await initializeUser();
      toast({
        title: 'Login successful.',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
      navigate('/');
      toast({
        title: 'Logout successful.',
        description: 'You have successfully logged out.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Logout failed.',
        description: 'Failed to logout. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const refreshToken = async () => {
    try {
      const newTokens = await refreshAccessToken();
      localStorage.setItem('jwtToken', newTokens.jwtToken);
      localStorage.setItem('refreshToken', newTokens.refreshToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newTokens.jwtToken}`;
      initializeUser();
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
