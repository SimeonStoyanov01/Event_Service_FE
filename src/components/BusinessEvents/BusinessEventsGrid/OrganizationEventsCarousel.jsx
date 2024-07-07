import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner, Button } from '@chakra-ui/react';
import { getAllEventsByOrganization } from '../../../services/businessEventService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';

const OrganizationEventCarousel = ({ organizationId, includeSuspended }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEventsByOrganization(organizationId, includeSuspended);
        const activeEvents = eventsData.eventModels.filter(event => event.status === 'ACTIVE');
        const eventsToShow = activeEvents.slice(0, 5);
        setEvents(eventsToShow);
      } catch (error) {
        console.error('Error fetching organization events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [organizationId, includeSuspended]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return (
      <Box minHeight="200px" display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Slider {...settings}>
      {events.map(event => (
        <Box key={event.eventId} bg="gray.800" p={2} borderRadius="md" textAlign="center" cursor="pointer">
          <NavLink to={`/user/events/${event.eventId}`}>
            <img
              src={event.picture}
              alt={`Image for ${event.eventName}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.alt = 'NO IMAGE';
              }}
              style={{ height: '150px', width: '100%', objectFit: 'cover', marginBottom: '8px' }}
            />
            <Text fontSize="sm">{event.eventName}</Text>
          </NavLink>
        </Box>
      ))}
    </Slider>
  );
};

export default OrganizationEventCarousel;
