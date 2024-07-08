import React, { useState, useEffect } from 'react';
import { Box, Center, Text, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import PurpleSpinner from '../Spinner/Spinner';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { getAllEvents } from '../../services/businessEventService';
import './Homescreen.css'; 
const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(false);
        const activeEvents = eventsData.eventModels.filter(event => event.status === 'ACTIVE').slice(0, 10); 
        setEvents(activeEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Center minHeight="80vh">
        <PurpleSpinner />
      </Center>
    );
  }

  if (events.length === 0) {
    return (
      <Center minHeight="80vh">
        <Text>No active events available.</Text>
      </Center>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    centerPadding: '100px' 
  };

  return (
    <Box width="100%" maxWidth="1200px" mx="auto" p={4}>
      <Text fontSize="2xl" color="black" fontWeight="bold" mb={4}>Featured Recently</Text>
      <Slider {...settings}>
        {events.map(event => (
          <Box key={event.eventId} className="carousel-item">
            <Image src={event.picture} alt={event.eventName} borderRadius="md" mb={4} className="carousel-image" />
            <Box className="carousel-overlay">
              <Text fontSize="xl" fontWeight="bold">{event.eventName}</Text>
              <Text fontSize="md">{event.eventDescription}</Text>
              <Text fontSize="sm">{event.eventDateTime}</Text>
              <Text fontSize="sm">Location: {event.organizationLocation}</Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HomeScreen;
