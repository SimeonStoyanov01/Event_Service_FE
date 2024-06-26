import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Button, Center, Flex } from '@chakra-ui/react';
import { getAllEvents } from '../../services/businessEventService';

const PageableGrid = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(false); 
        setEvents(eventsData.eventModels || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);

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
        <div>Loading...</div>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacingX={4} spacingY={12} width="100%" maxW="1200px" mt={4}>
            {itemsToDisplay.map((event) => (
              <Box
                key={event.eventId}
                bg="gray.800"
                p={4}
                borderRadius="md"
                minHeight="300px"
                minWidth="300px"
                flex="1"
                display="flex"
                flexDirection="column"
                alignItems="center"
                border="2px"
                borderColor="purple.500"
              >
                <Box
                  mb={4}
                  flex="1"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="200px"
                  overflow="hidden"
                >
                  <img
                    src={event.picture}
                    alt={`Image for ${event.eventName}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.alt = `NO IMAGE`;
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderTopLeftRadius: 'inherit',
                      borderTopRightRadius: 'inherit',
                    }}
                  />
                </Box>
                <Box flex="1" textAlign="center">
                  <strong>{event.eventName}</strong>
                  <p>Date: {event.eventDateTime}</p>
                  <p>Ticket price: {event.ticketPrice}</p>
                </Box>
                <Button mt={4} onClick={() => { /* Button action */ }} colorScheme="blue">
                  Book Now
                </Button>
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
