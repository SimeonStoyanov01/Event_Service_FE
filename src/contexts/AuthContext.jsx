import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';
import { login as loginService, logout as logoutService } from '../services/authService';
import { fetchUser } from '../services/userService';
import PurpleSpinner from '../components/Spinner/Spinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const toast = useToast();
  const navigate = useNavigate();

  const initializeUser = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      initializeUser();
    } else {
      setLoading(false); 
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
      console.log(error)
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

  if (loading) {
    return (
      <PurpleSpinner/>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
