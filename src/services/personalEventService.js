import axiosInstance from '../config/axiosInstance';

export const createPersonalEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post('/api/v1/personal-event/create', eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePersonalEvent = async (updateData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/personal-event/update', updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePersonalEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete('/api/v1/personal-event/delete', {
      data: { eventId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPersonalEvent = async (personalEventId) => {
  try {
    const response = await axiosInstance.get('/api/v1/personal-event/get', {
      params: { personalEventId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyPersonalEvents = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/personal-event/get_my');
    return response.data;
  } catch (error) {
    throw error;
  }
};
