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
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await refreshAccessToken(refreshToken);
        localStorage.setItem('jwtToken', response.jwtToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.jwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${response.jwtToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
