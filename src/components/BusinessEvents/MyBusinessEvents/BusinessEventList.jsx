import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import BusinessEventCard from './BusinessEventCard';
import { Button, Flex, Switch, FormControl, FormLabel, Box } from '@chakra-ui/react';
import { getAllEventsByOrganization } from '../../../services/businessEventService';
import { useAuth } from '../../../contexts/AuthContext';

const BusinessEventsList = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [includeSuspended, setIncludeSuspended] = useState(false);
    const eventsPerPage = 5; 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEventsByOrganization(user.organizationId, includeSuspended);
                const sortedEvents = (data.eventModels || []).sort((a, b) => {
                    if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
                    if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
                    return 0;
                });
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching business events:', error);
            }
        };

        if (user && user.organizationId) {
            fetchEvents();
        }
    }, [user.organizationId, includeSuspended]);

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
        <Box>
            <FormControl display="flex" alignItems="center" mb={4}>
                <FormLabel htmlFor="include-suspended" mb="0">
                    Include Suspended Events
                </FormLabel>
                <Switch
                    id="include-suspended"
                    isChecked={includeSuspended}
                    onChange={(e) => setIncludeSuspended(e.target.checked)}
                />
            </FormControl>

            {currentEvents.map(event => (
                <BusinessEventCard key={event.businessEventId} event={event} user={user} />
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
        </Box>
    );
};

export default BusinessEventsList;
