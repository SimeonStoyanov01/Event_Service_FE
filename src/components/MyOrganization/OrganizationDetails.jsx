import React, { useState } from 'react';
import {
    Box, Text, Button, Input, useToast, AlertDialog, AlertDialogBody,
    AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Flex
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { updateOrganization, deleteOrganization } from '../../services/organizationService';
import PurpleSpinner from '../Spinner/Spinner';
import { motion } from 'framer-motion';

const OrganizationDetails = ({ organizationDetails, setOrganizationDetails, userRole }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState({ ...organizationDetails });
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = React.useRef();
    const toast = useToast(); 

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedDetails({ ...organizationDetails });
        }
    };

    const handleSaveChanges = async () => {
        try {
            await updateOrganization(editedDetails);
            setOrganizationDetails({ ...editedDetails });
            setIsEditing(false);
            handleSuccessToast('Organization details updated successfully.');
        } catch (error) {
            handleErrorToast(error);
        }
    };

    const handleChange = (field, value) => {
        setEditedDetails({ ...editedDetails, [field]: value });
    };

    const handleDeleteOrganization = async () => {
        try {
            await deleteOrganization(organizationDetails.organizationId);
            handleSuccessToast('Organization deleted successfully.');
        } catch (error) {
            handleErrorToast(error);
        } finally {
            setIsOpen(false); 
        }
    };

    const handleSuccessToast = (message) => {
        toast({
            title: 'Success',
            description: message,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    const handleErrorToast = (error) => {
        console.error('Error:', error);
        toast({
            title: 'Error',
            description: error.response?.data || 'An error occurred.',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };

    const onClose = () => setIsOpen(false);

    if (!organizationDetails) {
        return (
            <Box p={5} bg="white" shadow="md" borderWidth="1px" borderRadius="md" position="relative">
                <PurpleSpinner />
            </Box>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box p={5} bg="white" shadow="md" borderWidth="1px" borderRadius="md" position="relative">
                <Flex justify="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" color="black">Organization Details</Text>
                    <Box>
                        <Button
                            colorScheme="purple"
                            leftIcon={isEditing ? <CheckIcon /> : <EditIcon />}
                            onClick={isEditing ? handleSaveChanges : handleEditToggle}
                            mr={2}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                        {userRole === 'BUSINESS_ADMIN' && (
                            <Button
                                colorScheme="red"
                                leftIcon={<DeleteIcon />}
                                onClick={() => setIsOpen(true)}
                            >
                                Delete Organization
                            </Button>
                        )}
                    </Box>
                </Flex>
                <Box mb={4}>
                    <Text fontSize="md" fontWeight="bold" color="black">Organization Id</Text>
                    <Text fontSize="md" color="black">{organizationDetails.organizationId}</Text>
                </Box>
                <Box mb={4}>
                    <Text fontSize="md" fontWeight="bold" color="black">Organization Name</Text>
                    {isEditing ? (
                        <Input
                            value={editedDetails.organizationName}
                            onChange={(e) => handleChange('organizationName', e.target.value)}
                            borderColor="purple.500"
                            variant="outline"
                            color="black"
                            fontSize="md"
                            backgroundColor="white"
                        />
                    ) : (
                        <Text fontSize="md" color="black">{organizationDetails.organizationName}</Text>
                    )}
                </Box>
                <Box mb={4}>
                    <Text fontSize="md" fontWeight="bold" color="black">Organization Address</Text>
                    {isEditing ? (
                        <Input
                            value={editedDetails.organizationAddress}
                            onChange={(e) => handleChange('organizationAddress', e.target.value)}
                            borderColor="purple.500"
                            variant="outline"
                            color="black"
                            backgroundColor="white"
                        />
                    ) : (
                        <Text fontSize="md" color="black">{organizationDetails.organizationAddress}</Text>
                    )}
                </Box>

                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="black">
                                Delete Organization
                            </AlertDialogHeader>

                            <AlertDialogBody color="black">
                                Are you sure? This action cannot be undone and will delete all associated events and employees.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleDeleteOrganization} ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </motion.div>
    );
};

export default OrganizationDetails;
