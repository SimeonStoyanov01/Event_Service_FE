import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Button, Center, Flex } from '@chakra-ui/react';
import { getAllEvents } from '../../services/businessEventService'; // Adjust path as per your file structure

const PageableGrid = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(false); // Assuming getAllEvents fetches the events from your API
        setEvents(eventsData.eventModels || []); // Set events from response data
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Calculate total pages based on items and itemsPerPage
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Calculate which items to display based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = events.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Center minHeight="80vh" mt={4} flexDirection="column">
      {events.length === 0 ? (
        <div>Loading</div>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacingX={4} spacingY={12} width="100%" maxW="1200px" mt={4}>
            {itemsToDisplay.map((event) => (
              <Box key={event.eventId} bg="gray.200" p={4} borderRadius="md" minHeight="200px" minWidth="200px" flex="1" display="flex" justifyContent="center" alignItems="center">
                <Box textColor={'black'} textAlign="center" height="100%">
                  <strong>{event.eventName}</strong>
                  <p>Date: {event.eventDateTime}</p>
                  <p>Ticket price: {event.ticketPrice}</p>
                  <p>Status: {event.status}</p>


                </Box>
              </Box>
            ))}
          </SimpleGrid>
          <Flex justifyContent="center" mt={4} mb={4}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1} mr={4}>
              Previous
            </Button>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </Flex>
        </>
      )}
    </Center>
  );
};

export default PageableGrid;
