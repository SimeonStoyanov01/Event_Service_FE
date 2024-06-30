import React, { useState, useEffect } from 'react';
import { Box, Center, Text, Image, Button, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getBusinessEvent } from '../../../services/businessEventService';
import OrganizationEventCarousel from './OrganizationEventsCarousel';
import ReservationDrawer from '../../Reservation/ReservationDrawer';
import PurpleSpinner from '../../Spinner/Spinner';
import { useAuth } from '../../../contexts/AuthContext';
import LoginDrawer from '../../Login/LoginPage';

const EventDetail = () => {
  const { user } = useAuth();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen: isReservationDrawerOpen, onOpen: onReservationDrawerOpen, onClose: onReservationDrawerClose } = useDisclosure(); 
  const { isOpen: isLoginDrawerOpen, onOpen: onLoginDrawerOpen, onClose: onLoginDrawerClose } = useDisclosure(); 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getBusinessEvent(eventId);
        setEvent(response.eventModel);
      } catch (error) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleBookNow = () => {
    if (user) {
      onReservationDrawerOpen(); 
    } else {
      onLoginDrawerOpen();
    }
  };

  if (loading) {
    return (
      <Center minHeight="80vh">
        <PurpleSpinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minHeight="80vh">
        <Text>{error}</Text>
      </Center>
    );
  }

  return (
    <Center minHeight="80vh">
      <Box bg="gray.800" p={4} borderRadius="md" maxHeight="800px" maxW="1200px" width="100%">
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center" width="100%" height="200px" overflow="hidden">
          <Image
            src={event.picture}
            alt={`Image for ${event.eventName}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.alt = 'NO IMAGE';
            }}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Box p={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="3xl" mb={2} textAlign="center">
              {event.eventName}
            </Text>
            <Button colorScheme="blue" onClick={handleBookNow}>
              {user ? 'Book now' : 'Log in to book'}
            </Button>
          </Box>
          <Text mb={4} textAlign="left">
            Date: {event.eventDateTime}
          </Text>
          <Text mb={4} textAlign="left">
            Ticket price: {event.ticketPrice}
          </Text>
          <Text mb={4} textAlign="left">
            Organization: {event.organizationName}
          </Text>
          <Text mb={4} textAlign="left">
            Status: {event.status}
          </Text>
          <Text textAlign="justify">
            Description: {event.eventDescription}
          </Text>
          <Box mt={4}>
            <Text fontSize="xl" mb={2} textAlign="center">Other Events by {event.organizationName}</Text>
            <OrganizationEventCarousel organizationId={event.organizationId} includeSuspended={false} />
          </Box>
        </Box>
      </Box>

      <ReservationDrawer isOpen={isReservationDrawerOpen} onClose={onReservationDrawerClose} eventId={eventId} organizationId={event.organizationId} />
      <LoginDrawer isOpen={isLoginDrawerOpen} onClose={onLoginDrawerClose} />
    </Center>
  );
};

export default EventDetail;
