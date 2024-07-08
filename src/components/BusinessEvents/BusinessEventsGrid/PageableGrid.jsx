import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Button, Center, Flex } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { getAllEvents } from '../../../services/businessEventService';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const PageableGrid = () => {
  const { user } = useAuth();
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

  const renderBookNowButton = (event) => {
    if (user?.role === 'PERSONAL') {
      return (
        <Button as={NavLink} to={`/user/events/${event.eventId}`} mt={4} colorscheme="blue">
          Book Now
        </Button>
      );
    } else if (user?.role === 'ADMIN') {
      return (
        <Button as={NavLink} to={`/admin/events/${event.eventId}`} mt={4} colorScheme="blue">
          Book Now
        </Button>
      );
    } else if (user?.role === 'BUSINESS_ADMIN') {
      return (
        <Button as={NavLink} to={`/businessadmin/events/${event.eventId}`} mt={4} colorScheme="blue">
          Book Now
        </Button>
      );
    } else if (user?.role === 'BUSINESS') {
      return (
        <Button as={NavLink} to={`/businessuser/events/${event.eventId}`} mt={4} colorScheme="blue">
          Book Now
        </Button>
      );
    } else {
      return (
        <Button as={NavLink} to={`/events/${event.eventId}`} mt={4} colorscheme="blue">
          Book Now
        </Button>
      );
    }
  };

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
      <Box width="100%" maxWidth="1200px"> 
        {events.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacingX={4} spacingY={12} width="100%">
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
                  {renderBookNowButton(event)}
                </Box>
              ))}
            </SimpleGrid>
            <Flex justifyContent="flex-end" mt={4} mb={4} alignItems="center" width="100%">
              <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 1} colorScheme="purple">
                <ArrowLeftIcon />
              </Button>
              <Button variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages} colorScheme="purple" ml={2}>
                <ArrowRightIcon />
              </Button>
              <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
                Page {currentPage} of {totalPages}
              </span>
            </Flex>
          </>
        )}
      </Box>
    </Center>
  );
};

export default PageableGrid;
