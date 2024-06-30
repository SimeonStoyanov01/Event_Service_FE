import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { getPersonalEvent } from '../../../../services/personalEventService';
import EventDetails from './PersonalEventDetails';
import MenuItems from './PersonalEventMenuItems';
import GuestList from './PersonalEventGuests';

const PersonalEventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { personalEventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getPersonalEvent(personalEventId);
        setEventDetails(eventData.eventModel);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [personalEventId]);

  if (!eventDetails) {
    return (
      <Center minHeight="80vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box flex="1" mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} minWidth="200px">
      <EventDetails eventDetails={eventDetails} setEventDetails={setEventDetails} />
      <MenuItems personalEventId={personalEventId} />
      <GuestList personalEventId={personalEventId} /> {/* Add the GuestList component here */}
    </Box>
  );
};

export default PersonalEventDetails;
