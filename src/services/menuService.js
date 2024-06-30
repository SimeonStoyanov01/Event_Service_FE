import axiosInstance from '../config/axiosInstance';

export const createMenu = async (menuData) => {
  try {
    const response = await axiosInstance.post('/api/v1/menu/create', menuData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (menuId) => {
  try {
    const response = await axiosInstance.get('/api/v1/menu/get', {
      params: {
        menuId: menuId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMenusPerEvent = async (personalEventId) => {
  try {
    const response = await axiosInstance.get('/api/v1/menu/get-my', {
      params: {
        personalEventId: personalEventId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenu = async (menuId) => {
  try {
    const response = await axiosInstance.delete('/api/v1/menu/delete', {
      data: {
        menuId: menuId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
