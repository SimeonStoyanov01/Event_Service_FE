import React from 'react';
import { Box, Image, Stack, Heading, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { truncateText } from '../../../utils/truncateText';

const BusinessEventCard = ({ event, user }) => {
    console.log(event);
    
    const getLink = () => {
        if (user?.role === 'BUSINESS_ADMIN') {
            return `/businessadmin/organizationevents/${event.eventId}`;
        } else if (user?.role === 'BUSINESS') {
            return `/businessuser/organizationevents/${event.eventId}`;
        }
        return '#';
    };

    return (
        <Box
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="stretch"
            overflow="hidden"
            variant="outline"
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            mb={4}
            width="90%"
            backgroundColor="white"
            minHeight="250px"
            maxHeight="250px"
        >
            <Box flex="1" mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} minWidth="200px">
                <Image
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    src={event.picture}
                    alt={event.eventName}
                />
            </Box>

            <Stack flex="2" ml={{ base: 0, sm: 4 }} mt={{ base: 4, sm: 0 }} alignItems="flex-start">
                <Box>
                    <Heading size="md">{event.eventName}</Heading>
                    <Text py="2" color="black">
                        {truncateText(event.eventDescription, 25)}
                    </Text>
                    <Text py="2" color="black">Date: {new Date(event.eventDateTime).toLocaleDateString()}</Text>
                    <Text color="black">Status: {event.status}</Text>
                </Box>

                <Flex justifyContent="flex-end" alignSelf="stretch">
                    <Spacer />
                    <Button as={NavLink} variant="solid" to={getLink()} mt={4} colorScheme="blue" size="lg">
                        View Details
                    </Button>
                </Flex>
            </Stack>
        </Box>
    );
};

export default BusinessEventCard;
