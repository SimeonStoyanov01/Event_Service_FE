import React, { useEffect, useState } from 'react';
import { getAllEvents, getEventReservations } from '../../services/businessEventService';
import PageableGrid from './PageableGrid';

const AllBusinessEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(false); // Fetch events without reservations initially
        
        // Fetch reservations for each event
        const eventsWithReservations = await Promise.all(
          eventsData.map(async (event) => {
            const reservations = await getEventReservations(event.id);
            return { ...event, reservations };
          })
        );

        setEvents(eventsWithReservations || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return <PageableGrid events={events} />;
};

export default AllBusinessEvents;
