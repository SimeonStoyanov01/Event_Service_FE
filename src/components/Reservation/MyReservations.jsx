import React, { useEffect, useState } from 'react';
import {
  Box, Button, Center, Spinner, Text, useToast, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input
} from '@chakra-ui/react';
import { getMyReservations, cancelReservation, updateReservation } from '../../services/reservationService'; 

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ACTIVE'); 
  const [editReservationId, setEditReservationId] = useState(null);
  const [editNumPeople, setEditNumPeople] = useState("");
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getMyReservations();
        setReservations(response.reservationModels);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was an error fetching your reservations.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [toast]);

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const handleCancelReservation = async () => {
    try {
      await cancelReservation({ reservationId: selectedReservation.reservationId });
      setReservations(reservations.filter(res => res.reservationId !== selectedReservation.reservationId));
      toast({
        title: 'Canceled',
        description: 'Reservation canceled successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error canceling the reservation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleRedactClick = (reservation) => {
    setEditReservationId(reservation.reservationId);
    setEditNumPeople(reservation.numberOfPeople);
  };

  const handleRedactSave = async (reservation) => {
    try {
      await updateReservation({ reservationId: reservation.reservationId, numberOfPeople: editNumPeople });
      setReservations(reservations.map(res => res.reservationId === reservation.reservationId
        ? { ...res, numberOfPeople: editNumPeople }
        : res
      ));
      toast({
        title: 'Redacted',
        description: 'Reservation updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data || 'There was an error updating the reservation.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setEditReservationId(null);
      setEditNumPeople("");
    }
  };

  const filteredReservations = filterStatus === 'ALL'
    ? reservations
    : reservations.filter(reservation => reservation.reservationStatus === filterStatus);

  if (loading) {
    return (
      <Center minHeight="80vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box mb={4} display="flex" alignItems="center">
        <Text color='black' fontSize="2xl" mr={2}>My Reservations</Text>
        <Box ml="auto" display="flex">
          <Button
            colorScheme={filterStatus === 'ALL' ? 'purple' : 'gray'}
            variant="outline"
            mr={2}
            onClick={() => setFilterStatus('ALL')}
          >
            All
          </Button>
          <Button
            colorScheme={filterStatus === 'ACTIVE' ? 'purple' : 'gray'}
            variant="outline"
            mr={2}
            onClick={() => setFilterStatus('ACTIVE')}
          >
            Active
          </Button>
          <Button
            colorScheme={filterStatus === 'ENDED' ? 'purple' : 'gray'}
            variant="outline"
            mr={2}
            onClick={() => setFilterStatus('ENDED')}
          >
            Ended
          </Button>
        </Box>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="black" width="15%">Organization</Th>
              <Th color="black" width="15%">Event</Th>
              <Th color="black" width="15%">Status</Th>
              <Th color="black" width="15%">Date</Th>
              <Th color="black" width="10%">Paid</Th>
              <Th color="black" width="15%">Number of People</Th>
              <Th color="black" width="15%">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <Tr key={reservation.reservationId} borderBottom="1px solid #E2E8F0">
                  <Td color="black">{reservation.organizationName}</Td>
                  <Td color="black">{reservation.eventName}</Td>
                  <Td color="black">{reservation.reservationStatus}</Td>
                  <Td color="black">{reservation.reservationDateTime}</Td>
                  <Td color="black">{reservation.isPaid ? 'Yes' : 'No'}</Td>
                  <Td color="black">
                    {editReservationId === reservation.reservationId ? (
                      <Input
                        value={editNumPeople}
                        onChange={(e) => setEditNumPeople(e.target.value)}
                      />
                    ) : (
                      reservation.numberOfPeople
                    )}
                  </Td>
                  <Td color="black">
                    {reservation.reservationStatus === 'ACTIVE' && (
                      <Button colorScheme="red" size="sm" mr={2} onClick={() => handleCancelClick(reservation)}>
                        Cancel
                      </Button>
                    )}
                    {editReservationId === reservation.reservationId ? (
                      <Button colorScheme="blue" size="sm" onClick={() => handleRedactSave(reservation)}>
                        Save
                      </Button>
                    ) : (
                      reservation.reservationStatus === 'ACTIVE' && (
                        <Button colorScheme="blue" size="sm" onClick={() => handleRedactClick(reservation)}>
                          Redact
                        </Button>
                      )
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={7}>
                  <Text color='black'>No reservations found.</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="black">
              Cancel Reservation
            </AlertDialogHeader>
            <AlertDialogBody color="black">
              Are you sure you want to cancel this reservation?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleCancelReservation} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MyReservations;
