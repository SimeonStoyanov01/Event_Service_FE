import axiosInstance from '../config/axiosInstance';

export const createReport = async (reportData) => {
  try {
    const response = await axiosInstance.post('/api/v1/report/create', reportData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReport = async (reportId) => {
  try {
    const response = await axiosInstance.get('/api/v1/report/get', {
      params: { reportId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllReports = async (includeClosed) => {
  try {
    const response = await axiosInstance.get('/api/v1/report/get-all', {
      params: { includeClosed }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReport = async (reportId) => {
  try {
    const response = await axiosInstance.delete('/api/v1/report/delete', {
      data: { reportId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const answerReport = async (answerData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/report/answer', answerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
