import axiosInstance from "../config/axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/auth/get');
    return response.data.userModel;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
