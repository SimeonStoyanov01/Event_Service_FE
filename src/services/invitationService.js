  import axiosInstance from '../config/axiosInstance';

  export const createInvitation = async (invitationData) => {
    try {
      const response = await axiosInstance.post('/api/v1/invitation/create', invitationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getInvitation = async (invitationId) => {
    try {
      const response = await axiosInstance.get('/api/v1/invitation/get', {
        params: { invitationId }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getMyInvitations = async (personalEventId) => {
  try {
    const response = await axiosInstance.get('/api/v1/invitation/get-my', {
      params: { personalEventId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInvitation = async (invitationData) => {
  try {
    const response = await axiosInstance.delete('/api/v1/invitation/delete', {
      data: invitationData
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const answerInvitation = async (answerData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/invitation/answer', answerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
