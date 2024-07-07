import React, { useState, useEffect } from 'react';
import {
    Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center,
    Button, useToast
} from '@chakra-ui/react';
import { getEventReservations } from '../../../../services/businessEventService';
import { changePaymentStatusReservation } from '../../../../services/reservationService';
import PurpleSpinner from '../../../Spinner/Spinner';

const BusinessEventReservations = ({ eventId }) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const reservationData = await getEventReservations(eventId);
                const sortedReservations = (reservationData.reservationModels || []).sort((a, b) => {
                    return a.isPaid === b.isPaid ? 0 : a.isPaid ? 1 : -1;
                });
                setReservations(sortedReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                toast({
                    title: 'Error',
                    description: 'There was an error fetching the reservations.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [eventId, toast]);

    const handlePayment = async (reservationId) => {
        try {
            const paymentData = { reservationId };
            await changePaymentStatusReservation(paymentData);
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    reservation.reservationId === reservationId ? { ...reservation, isPaid: true } : reservation
                ).sort((a, b) => (a.isPaid === b.isPaid ? 0 : a.isPaid ? 1 : -1))
            );
            toast({
                title: 'Payment successful.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error processing payment:', error);
            toast({
                title: 'Payment failed.',
                description: 'Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center>
                <PurpleSpinner />
            </Center>
        );
    }

    return (
        <Box mt={8}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th color="black">Reservation ID</Th>
                        <Th color="black">User</Th>
                        <Th color="black">Reservation DateTime</Th>
                        <Th color="black">Number of People</Th>
                        <Th color="black">Status</Th>
                        <Th color="black">Paid</Th>
                        <Th color="black">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <Tr key={reservation.reservationId}>
                                <Td color="black">{reservation.reservationId}</Td>
                                <Td color="black">{reservation.userEmail}</Td>
                                <Td color="black">{new Date(reservation.reservationDateTime).toLocaleString()}</Td>
                                <Td color="black">{reservation.numberOfPeople}</Td>
                                <Td color="black">{reservation.reservationStatus}</Td>
                                <Td color="black">{reservation.isPaid ? 'Yes' : 'No'}</Td>
                                <Td color="black">
                                    {!reservation.isPaid && (
                                        <Button colorScheme="green" onClick={() => handlePayment(reservation.reservationId)}>
                                            Pay
                                        </Button>
                                    )}
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={8} color="black" textAlign="center">
                                No reservations found.
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Box>
    );
};

export default BusinessEventReservations;
