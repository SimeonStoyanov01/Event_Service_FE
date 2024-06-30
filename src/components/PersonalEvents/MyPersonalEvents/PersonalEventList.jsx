import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import PersonalEventCard from './PersonalEventCard';
import { Button, Flex } from '@chakra-ui/react';
import { getMyPersonalEvents } from '../../../services/personalEventService'; // Import getMyPersonalEvents service

const PersonalEventsList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Adjust itemsPerPage as needed

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getMyPersonalEvents();
        setEvents(data.eventModels || []);
      } catch (error) {
        console.error('Error fetching personal events:', error);
      }
    };

    fetchEvents();
  }, []); 
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {currentEvents.map(event => (
        <PersonalEventCard key={event.personalEventId} event={event} />
      ))}

      <Flex justifyContent="flex-end" mt={4} alignItems="center">
        <Button variant="outline" onClick={prevPage} disabled={currentPage === 1} colorScheme="purple">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" ml={2} onClick={nextPage} disabled={currentPage === totalPages} colorScheme="purple">
          <ArrowRightIcon />
        </Button>
        <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
          Page {currentPage} of {totalPages}
        </span>
      </Flex>
    </div>
  );
};

export default PersonalEventsList;
