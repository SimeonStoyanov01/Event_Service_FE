import axiosInstance from '../config/axiosInstance'

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', { email, password });
    //localStorage.setItem('jwtToken', response.data.jwtToken);
    //localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data; // Return response data if needed
  } catch (error) {
    throw error; // Handle errors in the component or catch them where the function is called
  }
};