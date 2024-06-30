import React, { useState } from 'react';
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  Button, Box, Text, NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper, Switch, AlertDialog,
  AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay, Checkbox, useToast
} from '@chakra-ui/react';
import { createReservation } from '../../services/reservationService';
import { createSubscription } from '../../services/subscriptionService'; 

const ReservationDrawer = ({ isOpen, onClose, eventId, organizationId }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [payNow, setPayNow] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleSaveClick = () => {
    setIsDialogOpen(true);
  };

  const handleCreateReservation = async () => {
    try {
      const reservationData = {
        eventId,
        numberOfPeople,
        payNow
      };
      await createReservation(reservationData);
      
      if (subscribe) {
        const subscriptionData = { organizationId };
        await createSubscription(subscriptionData);
        toast({
          title: 'Subscription Success',
          description: 'You have successfully subscribed to the organization.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }

      setIsDialogOpen(false);
      onClose();
      toast({
        title: 'Reservation Success',
        description: 'Reservation created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: 'Error',
        description: error.response.data || 'There was an error creating the reservation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color={'black'}>Reservation</DrawerHeader>
          <DrawerBody>
            <Box mb={4}>
              <Text color={'black'} mb={2}>Number of People</Text>
              <NumberInput
                color={'black'}
                value={numberOfPeople}
                onChange={(value) => setNumberOfPeople(Number(value))}
                min={1}
                max={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <Text color='black' mb={2}>Pay Now</Text>
              <Switch
                colorScheme={'purple'}
                isChecked={payNow}
                onChange={(e) => setPayNow(e.target.checked)}
              />
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleSaveClick}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader color="black" fontSize="lg" fontWeight="bold">
              Confirm Reservation
            </AlertDialogHeader>

            <AlertDialogBody color="black">
              Are you sure you want to create this reservation?
              <Box mt={4}>
                <Checkbox
                  colorScheme="purple"
                  isChecked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                >
                  Subscribe to the organization
                </Checkbox>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="purple" onClick={handleCreateReservation} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ReservationDrawer;
