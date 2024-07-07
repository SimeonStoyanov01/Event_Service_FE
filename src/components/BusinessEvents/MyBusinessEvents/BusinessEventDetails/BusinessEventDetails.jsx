
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Center, Flex } from '@chakra-ui/react';
import { getBusinessEvent, updateEvent } from '../../../../services/businessEventService';
import EventDetails from './EventDetails';
import PurpleSpinner from '../../../Spinner/Spinner';
import BusinessEventReservations from './EventReservations';
import EventEarnings from './EventEarnings';
import { motion } from 'framer-motion'; 
const BusinessEventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getBusinessEvent(eventId);
        setEventDetails(eventData.eventModel);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return (
      <Center minHeight="80vh">
        <PurpleSpinner />
      </Center>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Flex>
        <Box flex="1" mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} minWidth="200px">
          <EventDetails eventDetails={eventDetails} setEventDetails={setEventDetails} updateEvent={updateEvent} />
          <EventEarnings eventId={eventId} />
          <BusinessEventReservations eventId={eventId} />
        </Box>
      </Flex>
    </motion.div>
  );
};

export default BusinessEventDetails;
