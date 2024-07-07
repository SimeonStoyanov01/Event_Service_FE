import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { createBusinessEvent } from '../../../services/businessEventService';

const CreateEventForm = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);

    const eventData = {
      picture: formData.get('pictureUrl'), 
      eventName: formData.get('eventName'),
      eventDescription: formData.get('eventDescription'),
      eventDateTime: formData.get('eventDateTime'),
      ticketPrice: parseFloat(formData.get('ticketPrice')), 
      capacity: parseInt(formData.get('capacity'), 10), 
    };

    try {
      setLoading(true);
      const response = await createBusinessEvent(eventData);
      toast({
        title: 'Event created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setError('Failed to create event');
      toast({
        title: 'Error',
        description: error.response.data || 'Failed to create event',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Create New Event
      </Heading>

      <FormControl id="pictureUrl" isRequired mt={4}>
        <FormLabel>Picture URL</FormLabel>
        <Input type="url" name="pictureUrl" bg="white" color="black" />
        <FormErrorMessage mt={1}>Picture URL is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventName" isRequired mt={4}>
        <FormLabel>Event Name</FormLabel>
        <Input type="text" name="eventName" bg="white" color="black" />
        <FormErrorMessage mt={1}>Event Name is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDescription" isRequired mt={4}>
        <FormLabel>Event Description</FormLabel>
        <Textarea name="eventDescription" bg="white" color="black" />
        <FormErrorMessage mt={1}>Event Description is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDateTime" isRequired mt={4}>
        <FormLabel>Event Date and Time</FormLabel>
        <Input type="datetime-local" name="eventDateTime" bg="white" color="black" />
        <FormErrorMessage mt={1}>Event Date and Time must be in the future.</FormErrorMessage>
      </FormControl>

      <FormControl id="ticketPrice" isRequired mt={4}>
        <FormLabel>Ticket Price</FormLabel>
        <Input type="number" name="ticketPrice" step="0.01" bg="white" color="black" />
        <FormErrorMessage mt={1}>Ticket Price must be a positive number.</FormErrorMessage>
      </FormControl>

      <FormControl id="capacity" isRequired mt={4}>
        <FormLabel>Capacity</FormLabel>
        <Input type="number" name="capacity" bg="white" color="black" />
        <FormErrorMessage mt={1}>Capacity must be a positive number.</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        colorscheme="blue"
        mt={6}
        isLoading={loading}
        loadingText="Submitting"
        width="100%"
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
