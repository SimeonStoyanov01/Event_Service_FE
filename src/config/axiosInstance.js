import axios from 'axios';
import { refreshAccessToken } from '../services/authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8020', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshAccessToken(); 
        localStorage.setItem('jwtToken', newTokens.jwtToken);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.jwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.jwtToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
