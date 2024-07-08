import React, { useState } from 'react';
import {
  Box, Text, Button, Input, Textarea, FormControl, FormLabel, useToast, Flex,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import { updatePersonalEvent } from '../../../../services/personalEventService';

const EventDetails = ({ eventDetails, setEventDetails }) => {
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
      const updatedDetails = { ...editedDetails, eventDateTime: new Date(editedDetails.eventDateTime).toISOString() };
      
      await updatePersonalEvent(updatedDetails);
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
              />
            ) : (
              <Text color="black">{eventDetails.eventDescription}</Text>
            )}
          </Box>
          <Box mb={4}>
            <Text fontSize="lg" color="black">Location</Text>
            {isEditing ? (
              <Input
                value={editedDetails.eventLocation}
                onChange={(e) => handleChange('eventLocation', e.target.value)}
                borderColor="purple.500"
                variant="outline"
                color="black"
              />
            ) : (
              <Text color="black">{eventDetails.eventLocation}</Text>
            )}
          </Box>
          <Box mb={4}>
            <FormControl id="eventDateTime" isRequired>
              <FormLabel>Event Date and Time</FormLabel>
              {isEditing ? (
                <Input
                  type="datetime-local"
                  value={formatLocalDateTime(editedDetails.eventDateTime)}
                  onChange={(e) => handleChange('eventDateTime', e.target.value)}
                  borderColor="purple.500"
                  variant="outline"
                  color="black"
                  size="lg"
                  backgroundColor="white"
                />
              ) : (
                <Text color="black">{new Date(eventDetails.eventDateTime).toLocaleString()}</Text>
              )}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetails;
