import axiosInstance from '../config/axiosInstance';

export const createBusinessEvent = async (eventData) => {
    try {
      const response = await axiosInstance.post('api/v1/business-event/create', eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getBusinessEvent = async (eventId) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get', {
        params: {
          eventId: eventId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getEventReservations = async (eventId) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get_reservations', {
        params: {
          eventId: eventId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getAllEvents = async (includeSuspended) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get_all', {
        params: {
          includeSuspended: includeSuspended,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getAllEventsByOrganization = async (organizationId, includeSuspended) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get_all_by_organization', {
        params: {
          organizationId: organizationId,
          includeSuspended: includeSuspended,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getMyEvents = async (includeSuspended) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get_my', {
        params: {
          includeSuspended: includeSuspended,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getEventEarnings = async (eventId) => {
    try {
      const response = await axiosInstance.get('api/v1/business-event/get_earnings', {
        params: {
          eventId: eventId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const suspendEvent = async (suspendData) => {
    try {
      const response = await axiosInstance.patch('api/v1/business-event/suspend', suspendData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateEvent = async (updateData) => {
    try {
      const response = await axiosInstance.patch('api/v1/business-event/update', updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteEvent = async (deleteData) => {
    try {
      const response = await axiosInstance.delete('api/v1/business-event/delete', {
        data: deleteData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };