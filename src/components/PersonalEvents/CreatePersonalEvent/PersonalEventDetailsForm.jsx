import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';

const EventDetailsForm = ({ eventData, handleChange }) => {
  return (
    <>
      <FormControl id="eventName" isRequired mt={4}>
        <FormLabel>Event Name</FormLabel>
        <Input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
          size="lg"
        />
        <FormErrorMessage mt={1}>Event Name is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDescription" isRequired mt={4}>
        <FormLabel>Event Description</FormLabel>
        <Textarea
          name="eventDescription"
          value={eventData.eventDescription}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
          size="lg"
        />
        <FormErrorMessage mt={1}>Event Description is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventLocation" isRequired mt={4}>
        <FormLabel>Event Location</FormLabel>
        <Input
          type="text"
          name="eventLocation"
          value={eventData.eventLocation}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
          size="lg"
        />
        <FormErrorMessage mt={1}>Event Location is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="eventDateTime" isRequired mt={4}>
        <FormLabel>Event Date and Time</FormLabel>
        <Input
          type="datetime-local"
          name="eventDateTime"
          value={eventData.eventDateTime}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
          size="lg"
        />
        <FormErrorMessage mt={1}>Event Date and Time must be in the future.</FormErrorMessage>
      </FormControl>

      <FormControl id="picture" isRequired mt={4}>
        <FormLabel>Picture URL</FormLabel>
        <Input
          type="url"
          name="picture"
          value={eventData.picture}
          onChange={handleChange}
          sx={{ backgroundColor: 'white', color: 'black' }}
          size="lg"
        />
        <FormErrorMessage mt={1}>Picture URL must be provided.</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default EventDetailsForm;
