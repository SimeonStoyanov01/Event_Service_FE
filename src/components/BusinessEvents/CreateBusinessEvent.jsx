import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { createBusinessEvent } from '../../services/businessEventService';

const CreateEventForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);

    const eventData = {
      picture: formData.get('pictureUrl'), // Get picture URL instead of file
      eventName: formData.get('eventName'),
      eventDescription: formData.get('eventDescription'),
      eventDateTime: formData.get('eventDateTime'),
      ticketPrice: parseFloat(formData.get('ticketPrice')), // Convert to float
      capacity: parseInt(formData.get('capacity'), 10), // Convert to integer
    };

    try {
      validateFormData(eventData); // Validate form data before submission

      setLoading(true);
      const response = await createBusinessEvent(eventData);
      // Handle success
      toast({
        title: 'Event created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle validation or API error
      setError(error.message);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create event',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = (eventData) => {
    if (!eventData.picture || eventData.picture.trim() === '') {
      throw new Error('Picture URL is required.');
    }
    if (!eventData.eventName || eventData.eventName.trim() === '') {
      throw new Error('Event Name is required.');
    }
    if (!eventData.eventDescription || eventData.eventDescription.trim() === '') {
      throw new Error('Event Description is required.');
    }
    if (!eventData.eventDateTime || !isValidFutureDate(eventData.eventDateTime)) {
      throw new Error('Event Date and Time must be in the future.');
    }
    if (isNaN(eventData.ticketPrice) || eventData.ticketPrice <= 0) {
      throw new Error('Ticket Price must be a positive number.');
    }
    if (isNaN(eventData.capacity) || eventData.capacity <= 0) {
      throw new Error('Capacity must be a positive number.');
    }
  };

  const isValidFutureDate = (dateTimeString) => {
    const eventDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();
    return eventDateTime > currentDateTime;
  };

  const inputStyles = {
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="pictureUrl" isRequired mt={4}>
        <FormLabel>Picture URL</FormLabel>
        <Input type="url" name="pictureUrl" sx={inputStyles} />
        <FormErrorMessage mt={1}>Picture URL is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventName" isRequired mt={4}>
        <FormLabel>Event Name</FormLabel>
        <Input type="text" name="eventName" sx={inputStyles} />
        <FormErrorMessage mt={1}>Event Name is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDescription" isRequired mt={4}>
        <FormLabel>Event Description</FormLabel>
        <Textarea name="eventDescription" sx={inputStyles} />
        <FormErrorMessage mt={1}>Event Description is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDateTime" isRequired mt={4}>
        <FormLabel>Event Date and Time</FormLabel>
        <Input type="datetime-local" name="eventDateTime" sx={inputStyles} />
        <FormErrorMessage mt={1}>Event Date and Time must be in the future.</FormErrorMessage>
      </FormControl>

      <FormControl id="ticketPrice" isRequired mt={4}>
        <FormLabel>Ticket Price</FormLabel>
        <Input type="number" name="ticketPrice" step="0.01" sx={inputStyles} />
        <FormErrorMessage mt={1}>Ticket Price must be a positive number.</FormErrorMessage>
      </FormControl>

      <FormControl id="capacity" isRequired mt={4}>
        <FormLabel>Capacity</FormLabel>
        <Input type="number" name="capacity" sx={inputStyles} />
        <FormErrorMessage mt={1}>Capacity must be a positive number.</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        colorScheme="blue"
        mt={4}
        isLoading={loading}
        loadingText="Submitting"
      >
        Create Event
      </Button>

      {error && (
        <FormErrorMessage mt={4} color="red.500">
          {error}
        </FormErrorMessage>
      )}
    </form>
  );
};

export default CreateEventForm;
