import axiosInstance from '../config/axiosInstance';

export const getOrganization = async (organizationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get', {
      params: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationEmployees = async (organizationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get_employees', {
      params: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllOrganizations = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get_all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationEarnings = async (organizationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get_earnings', {
      params: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationAccumulatedEarnings = async (organizationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get_accumulated', {
      params: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationSubscriptions = async (organizationId) => {
  try {
    const response = await axiosInstance.get('/api/v1/organization/get_subscriptions', {
      params: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const suspendOrganization = async (suspendData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/organization/suspend', suspendData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrganization = async (organizationData) => {
  try {
    const response = await axiosInstance.patch('/api/v1/organization/update', organizationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrganization = async (organizationId) => {
  try {
    const response = await axiosInstance.delete('/api/v1/organization/delete', {
      data: {
        organizationId: organizationId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
