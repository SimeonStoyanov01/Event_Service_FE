import axiosInstance from '../config/axiosInstance';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', { email, password });
    localStorage.setItem('jwtToken', response.data.jwtToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/refresh', { refreshToken });
    localStorage.setItem('jwtToken', response.data.jwtToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/api/v1/auth/logout');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    throw error; 
  }
};
