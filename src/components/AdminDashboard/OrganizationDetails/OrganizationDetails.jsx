import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Heading, Text, Center, Button, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import { getOrganization, suspendOrganization, deleteOrganization } from '../../../services/organizationService';
import PurpleSpinner from '../../Spinner/Spinner';
import { motion } from 'framer-motion';
import OrganizationEventsTable from './OrganizationEventsTable';
import OrganizationEmployeesTable from './OrganizationEmployeesTable';

const OrganizationDetails = () => {
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEvents, setShowEvents] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const data = await getOrganization(organizationId);
        setOrganization(data.organizationModel);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  const handleEventsButtonClick = () => {
    setShowEvents(true);
    setShowUsers(false);
  };

  const handleUsersButtonClick = () => {
    setShowEvents(false);
    setShowUsers(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const handleOpenSuspendModal = () => {
    setIsSuspendOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleCloseSuspendModal = () => {
    setIsSuspendOpen(false);
  };

  const handleDeleteOrganization = async () => {
    try {
      await deleteOrganization(organizationId);
      setIsDeleteOpen(false);
      toast({
        title: 'Success',
        description: 'Organization deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting organization:', error);
      toast({
        title: 'Error',
        description: error.response?.data || 'There was an error deleting the organization.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSuspendOrganization = async () => {
    try {
      const suspendData = { organizationId };
      await suspendOrganization(suspendData);

      setOrganization(prevOrg => ({
        ...prevOrg,
        organizationStatus: 'SUSPENDED'  
      }));

      setIsSuspendOpen(false);
      toast({
        title: 'Success',
        description: 'Organization suspended successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error suspending organization:', error);
      toast({
        title: 'Error',
        description: error.response?.data || 'There was an error suspending the organization.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center minHeight="80vh">
        <PurpleSpinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minHeight="80vh">
        <Text color="red.500">{error.message}</Text>
      </Center>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box p={4}>
        <Box p={5} bg="white" shadow="md" borderWidth="1px" borderRadius="md" position="relative">
          <Heading as="h1" mb={4}>{organization.organizationName}</Heading>
          <Text color="black" fontSize="lg" mb={4}>Organization Id: {organization.organizationId}</Text>
          <Text color="black" fontSize="lg" mb={4}>Address: {organization.organizationAddress}</Text>
          <Text color="black" fontSize="lg" mb={4}>Status: {organization.organizationStatus}</Text>

          <Box position="absolute" top={4} right={4}>
            <Button variant="outline" colorScheme="purple" onClick={handleOpenDeleteModal} mr={2}>
              Delete
            </Button>
            <Button variant="outline" colorScheme="purple" onClick={handleOpenSuspendModal}>
              Suspend
            </Button>
          </Box>
        </Box>

        <AlertDialog isOpen={isDeleteOpen} onClose={handleCloseDeleteModal}>
          <AlertDialogOverlay />
          <AlertDialogContent color="black">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Organization
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this organization? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="gray" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteOrganization} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog isOpen={isSuspendOpen} onClose={handleCloseSuspendModal}>
          <AlertDialogOverlay />
          <AlertDialogContent color="black">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Suspend Organization
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to suspend this organization? This action can be undone later.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="gray" onClick={handleCloseSuspendModal}>
                Cancel
              </Button>
              <Button colorScheme="purple" onClick={handleSuspendOrganization} ml={3}>
                Suspend
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Box flex="1" mb={4}>
          <Button variant="outline" onClick={handleEventsButtonClick} colorScheme="purple" mt={4} mr={4}>
            Show Events
          </Button>
          <Button variant="outline" onClick={handleUsersButtonClick} colorScheme="purple" mt={4} mr={4}>
            Show Users
          </Button>
        </Box>

        {showEvents && <OrganizationEventsTable events={organization.eventModels} setEvents={(updatedEvents) => setOrganization({ ...organization, eventModels: updatedEvents })} />}
        {showUsers && <OrganizationEmployeesTable users={organization.userModels} />}
      </Box>
    </motion.div>
  );
};

export default OrganizationDetails;
