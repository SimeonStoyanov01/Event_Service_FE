import axiosInstance from '../config/axiosInstance';

export const createSubscription = async (subscriptionData) => {
  try {
    const response = await axiosInstance.post('/api/v1/subscriptions/create', subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (cancelData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/subscriptions/cancel', cancelData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMySubscriptions = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/subscriptions/get_my');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubscription = async (subscriptionId) => {
  try {
    const response = await axiosInstance.get('/api/v1/subscriptions/get', {
      params: { subscriptionId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
