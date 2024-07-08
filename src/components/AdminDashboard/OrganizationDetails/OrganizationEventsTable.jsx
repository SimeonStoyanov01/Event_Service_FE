import React, { useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, AlertDialog, AlertDialogOverlay,
  AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  useToast
} from '@chakra-ui/react';
import { suspendEvent, deleteEvent } from '../../../services/businessEventService'; 

const OrganizationEventsTable = ({ events, setEvents }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const toast = useToast();

  const handleOpenDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteOpen(true);
  };

  const handleOpenSuspendModal = (event) => {
    setSelectedEvent(event);
    setIsSuspendOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedEvent(null);
  };

  const handleCloseSuspendModal = () => {
    setIsSuspendOpen(false);
    setSelectedEvent(null);
  };

  const handleSuspendEvent = async () => {
    try {
      const suspendData = { eventId: selectedEvent.eventId };
      await suspendEvent(suspendData);

      toast({
        title: 'Event Suspended',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const updatedEvents = events.map((event) =>
        event.eventId === selectedEvent.eventId ? { ...event, status: 'SUSPENDED' } : event
      );
      setEvents(updatedEvents);
      handleCloseSuspendModal();
    } catch (error) {
      console.error('Error suspending event:', error);
      toast({
        title: 'Error Suspending Event',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      handleCloseSuspendModal();
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const deleteData = { eventId: selectedEvent.eventId };
      await deleteEvent(deleteData);

      toast({
        title: 'Event Deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const updatedEvents = events.filter((event) => event.eventId !== selectedEvent.eventId);
      setEvents(updatedEvents);
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error Deleting Event',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      handleCloseDeleteModal();
    }
  };

  // Sort events by status, with active events first
  const sortedEvents = events.sort((a, b) => {
    if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
    if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
    return 0;
  });

  return (
    <>
      <Table color="black" variant="simple">
        <Thead>
          <Tr>
            <Th>Event Id</Th>
            <Th>Event Name</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEvents.map((event) => (
            <Tr key={event.eventId}>
              <Td>{event.eventId}</Td>
              <Td>{event.eventName}</Td>
              <Td>{event.status}</Td>
              <Td>{new Date(event.eventDateTime).toLocaleString()}</Td>
              <Td>
                {event.status === 'ACTIVE' && (
                  <>
                    <Button colorScheme="purple" onClick={() => handleOpenSuspendModal(event)}>
                      Suspend
                    </Button>
                    <Button colorScheme="purple" onClick={() => handleOpenDeleteModal(event)} ml={2}>
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog isOpen={isSuspendOpen} onClose={handleCloseSuspendModal}>
        <AlertDialogOverlay />
        <AlertDialogContent color="black">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Suspend Event
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to suspend this event? This action can be undone later.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="gray" onClick={handleCloseSuspendModal}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleSuspendEvent} ml={3}>
              Suspend
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog isOpen={isDeleteOpen} onClose={handleCloseDeleteModal}>
        <AlertDialogOverlay />
        <AlertDialogContent color="black">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Event
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this event? This action cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="gray" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteEvent} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrganizationEventsTable;
