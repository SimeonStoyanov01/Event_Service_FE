import React, { useState, useEffect } from 'react';
import {
    Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center,
    Button, Input, VStack, FormControl, FormLabel, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, useDisclosure, useToast,
} from '@chakra-ui/react';
import { getMyInvitations, createInvitation } from '../../../../services/invitationService'; 
import {AddIcon } from '@chakra-ui/icons';
const GuestList = ({ personalEventId }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [guestEmails, setGuestEmails] = useState(['']);
    const toast = useToast();

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const invitationData = await getMyInvitations(personalEventId);
                setInvitations(invitationData.invitationModel);
            } catch (error) {
                console.error('Error fetching invitations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvitations();
    }, [personalEventId]);

    const handleInputChange = (index, value) => {
        const newGuestEmails = [...guestEmails];
        newGuestEmails[index] = value;
        setGuestEmails(newGuestEmails);
    };

    const handleAddField = () => {
        setGuestEmails([...guestEmails, '']);
    };

    const handleRemoveField = (index) => {
        const newGuestEmails = guestEmails.filter((_, i) => i !== index);
        setGuestEmails(newGuestEmails);
    };

    const handleAddGuests = async () => {
        try {
            const invitationData = { personalEventId, inviteeEmail: guestEmails.filter(email => email) };
            const response = await createInvitation(invitationData);
            setInvitations([...invitations, ...response.invitationModel]);
            setGuestEmails(['']);
            onClose();
            toast({
                title: 'Guests added successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding guests:', error);
            toast({
                title: 'Failed to add guests.',
                description: 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return (
        <Box mt={8}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th color="black">Invitee Email</Th>
                        <Th color="black">Invitation Status</Th>
                        <Th color="black">Menu Name</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {invitations.length > 0 ? (
                        invitations.map((invitation) => (
                            <Tr key={invitation.invitationId}>
                                <Td color="black">{invitation.inviteeEmail}</Td>
                                <Td color="black">{invitation.invitationStatus}</Td>
                                <Td color="black">{invitation.menuName}</Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={3} color="black" textAlign="center">
                                No guests invited.
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <Button
                mt={4}
                onClick={onOpen}    
                leftIcon={<AddIcon />}
                colorScheme="purple"
            >
                Add Guests
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Guests</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            {guestEmails.map((email, index) => (
                                <Box key={index} width="100%">
                                    <FormControl>
                                        <FormLabel color="black">Guest Email {index + 1}</FormLabel>
                                        <Input
                                            value={email}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            placeholder="Enter guest email"
                                        />
                                    </FormControl>
                                    {index > 0 && (
                                        <Button
                                            mt={2}
                                            colorScheme="red"
                                            onClick={() => handleRemoveField(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Box>
                            ))}
                            <Button colorScheme="green" onClick={handleAddField}>
                                Add Another Guest
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={handleAddGuests}>
                            Add Guests
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default GuestList;
