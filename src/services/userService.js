import axiosInstance from "../config/axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/auth/get');
    return response.data.userModel;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerOrganization = async (organizationData) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register/organization', organizationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerBusinessUser = async (businessUserData) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register/business_user', businessUserData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getAllUsersByRole = async (role) => {
  try {
    const response = await axiosInstance.get('/api/v1/user/get_by_role', {
      params: {
        role: role,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};