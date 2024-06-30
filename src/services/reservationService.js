import axiosInstance from '../config/axiosInstance';

export const createReservation = async (reservationData) => {
  try {
    const response = await axiosInstance.post('/api/v1/reservations/create', reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const response = await axiosInstance.delete('/api/v1/reservations/delete', {
      data: { reservationId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyReservations = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/reservations/get_my');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReservation = async (reservationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/reservations/get', {
      params: { reservationId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (updateData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/reservations/update', updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelReservation = async (cancelData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/reservations/cancel', cancelData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePaymentStatusReservation = async (paymentData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/reservations/pay', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
