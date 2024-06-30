import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  useToast,
  Box,
  Flex,
} from '@chakra-ui/react';
import { createPersonalEvent } from '../../../services/personalEventService';
import { createMenu } from '../../../services/menuService'; 
import { createInvitation } from '../../../services/invitationService'; 
import MenuItems from './MenuInputFieldComponent'; 
import InvitationList from './InvitationListComponent';
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
} from '@chakra-ui/react';
import EventDetailsForm from './PersonalEventDetailsForm';

const steps = [
  { title: 'Step 1: Event Details', description: 'Provide event information' },
  { title: 'Step 2: Add Menu', description: 'Select food and drinks' },
  { title: 'Step 3: Invite Guests', description: 'Choose people to invite' },
];

const CreatePersonalEvent = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDescription: '',
    eventLocation: '',
    eventDateTime: '',
    pictureUrl: '',
  });
  const [menuItems, setMenuItems] = useState([]);
  const [inviteeEmail, setInviteeEmail] = useState([]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMenuItemsChange = (updatedItems) => {
    setMenuItems(updatedItems);
  };

  const handleInviteeEmailsChange = (updatedEmails) => {
    setInviteeEmail(updatedEmails);
  };

  const handleNext = () => {
    try {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await createPersonalEvent(eventData);
      const personalEventId  = response.eventModel.personalEventId; 
      if (menuItems.length > 0) {
        await Promise.all(
          menuItems.map(async (menuName) => {
            await createMenu({ menuName, personalEventId });
          })
        );
      }

      if (inviteeEmail.length > 0) {
        await createInvitation({ personalEventId, inviteeEmail });
      }
  
      toast({
        title: 'Personal event created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
  
      setEventData({
        eventName: '',
        eventDescription: '',
        eventLocation: '',
        eventDateTime: '',
        pictureUrl: '',
      });
      setMenuItems([]);
      setInviteeEmail([]);
  
      setActiveStep(0); 
    } catch (error) {
      setError('Failed to create personal event');
      toast({
        title: 'Error',
        description: error.response?.data || 'Failed to create personal event',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="flex-start" height="100vh" p={4}>
      <Box width="20%" maxWidth="800px">
        <Stepper colorScheme="purple" index={activeStep} orientation="vertical" height="80vh">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber>{index + 1}</StepNumber>}
                  active={<StepNumber>{index + 1}</StepNumber>}
                />
              </StepIndicator>
              <Box flexShrink={0}>
                <StepTitle sx={{ color: 'purple.600', fontWeight: 'bold' }}>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box flex={1} ml={8} maxWidth="800px">
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && (
            <EventDetailsForm eventData={eventData} handleChange={handleChange} />
          )}

          {activeStep === 1 && (
            <>
              <FormControl id="menuItems" mt={4}>
                <FormLabel>Menu Items</FormLabel>
                <MenuItems onChange={handleMenuItemsChange} items={menuItems} />
              </FormControl>
            </>
          )}

          {activeStep === 2 && (
            <>
            <FormControl id="invitationItems" mt={4}>
            <FormLabel>Invite Your Guests</FormLabel>
              <InvitationList onChange={handleInviteeEmailsChange} initialEmail={inviteeEmail} />
            </FormControl>
            </>
          )}

          <Flex mt={4} justifyContent="space-between">
            {activeStep !== 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}

            {activeStep < steps.length - 1 && (
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleNext}
                size="lg"
              >
                Next
              </Button>
            )}

            {activeStep === steps.length - 1 && (
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
              >
                Create Personal Event
              </Button>
            )}
          </Flex>

          {error && (
            <FormErrorMessage mt={4} color="red.500">
              {error}
            </FormErrorMessage>
          )}
        </form>
      </Box>
    </Flex>
  );
};

export default CreatePersonalEvent;
