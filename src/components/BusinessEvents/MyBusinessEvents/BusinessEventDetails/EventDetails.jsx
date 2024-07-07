import React, { useState } from 'react';
import {
    Box, Text, Button, Input, Textarea, FormControl, FormLabel, useToast, Flex,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';

const EventDetails = ({ eventDetails, setEventDetails, updateEvent }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState(eventDetails);
    const toast = useToast();

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            handleSaveChanges();
        }
    };

    const handleSaveChanges = async () => {
        try {
            const eventDateTime = new Date(editedDetails.eventDateTime).toISOString();
            const updatedDetails = { ...editedDetails, eventDateTime };

            await updateEvent(updatedDetails);
            setEventDetails(updatedDetails);
            setIsEditing(false);
            toast({
                title: 'Success',
                description: 'Event details updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating event details:', error);
            toast({
                title: 'Error',
                description: error.response?.data || 'There was an error updating the event details.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleChange = (field, value) => {
        setEditedDetails({ ...editedDetails, [field]: value });
    };

    const formatLocalDateTime = (isoString) => {
        const localDate = new Date(isoString);
        const tzOffset = localDate.getTimezoneOffset() * 60000;
        const localISOTime = new Date(localDate - tzOffset).toISOString().slice(0, 16);
        return localISOTime;
    };

    return (
        <Box>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                {isEditing ? (
                    <Input
                        value={editedDetails.eventName}
                        onChange={(e) => handleChange('eventName', e.target.value)}
                        borderColor="purple.500"
                        variant="outline"
                        color="black"
                        fontSize="2xl"
                        fontWeight="bold"
                        backgroundColor="white"
                    />
                ) : (
                    <Text fontSize="2xl" fontWeight="bold" color="black">{eventDetails.eventName}</Text>
                )}
                <Button
                    colorScheme="purple"
                    leftIcon={isEditing ? <CheckIcon /> : <EditIcon />}
                    onClick={handleEditToggle}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
            </Flex>
            <Box display="flex">
                <Box flex="1">
                    <img
                        src={eventDetails.picture}
                        alt={eventDetails.eventName}
                        style={{ width: '100%', height: 'auto', borderTopLeftRadius: 'lg', borderBottomLeftRadius: 'lg' }}
                    />
                </Box>
                <Box flex="2" p={4}>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Description</Text>
                        {isEditing ? (
                            <Textarea
                                value={editedDetails.eventDescription}
                                onChange={(e) => handleChange('eventDescription', e.target.value)}
                                borderColor="purple.500"
                                variant="outline"
                                color="black"
                                backgroundColor="white"
                            />
                        ) : (
                            <Text color="black">{eventDetails.eventDescription}</Text>
                        )}
                    </Box>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Location</Text>
                        <Text color="black">{eventDetails.organizationLocation}</Text>
                    </Box>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Ticket Price</Text>
                        <Text color="black">{eventDetails.ticketPrice}</Text>
                    </Box>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Event Date and Time</Text>
                        {isEditing ? (
                            <Input
                                type="datetime-local"
                                value={formatLocalDateTime(editedDetails.eventDateTime)}
                                onChange={(e) => handleChange('eventDateTime', new Date(e.target.value).toISOString())}
                                borderColor="purple.500"
                                variant="outline"
                                color="black"
                                size="lg"
                                backgroundColor="white"
                            />
                        ) : (
                            <Text color="black">{new Date(eventDetails.eventDateTime).toLocaleString()}</Text>
                        )}
                    </Box>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Remaining Capacity</Text>
                        {isEditing ? (
                            <Input
                                value={editedDetails.capacity}
                                onChange={(e) => handleChange('capacity', e.target.value)}
                                borderColor="purple.500"
                                variant="outline"
                                color="black"
                                backgroundColor="white"
                            />
                        ) : (
                            <Text color="black">{eventDetails.capacity}</Text>
                        )}
                    </Box>
                    <Box mb={4}>
                        <Text fontSize="lg" color="black">Status</Text>
                        <Text color="black">{eventDetails.status}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EventDetails;
