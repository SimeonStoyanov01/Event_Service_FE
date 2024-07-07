import React, { useState, useEffect } from 'react';
import { Box, Center, Flex, Button } from '@chakra-ui/react';
import { getOrganization } from '../../services/organizationService';
import OrganizationDetails from './OrganizationDetails';
import OrganizationEmployees from './OrganizationEmployees';
import { useAuth } from '../../contexts/AuthContext';
import PurpleSpinner from '../Spinner/Spinner';
import OrganizationSubscriptions from './OrganizationSubscriptions';

const MyOrganization = () => {
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [showEmployees, setShowEmployees] = useState(true);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const { user } = useAuth();

  const handleEmployeesButtonClick = () => {
    setShowEmployees(true);
    setShowSubscriptions(false);
  };

  const handleSubscriptionsButtonClick = () => {
    setShowEmployees(false);
    setShowSubscriptions(true);
  };

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const orgData = await getOrganization(user.organizationId);
        setOrganizationDetails(orgData.organizationModel);
      } catch (error) {
        console.error('Error fetching organization details:', error);
      }
    };

    fetchOrganizationDetails();
  }, [user.organizationId]);

  if (!organizationDetails) {
    return (
      <Center minHeight="80vh">
        <PurpleSpinner />
      </Center>
    );
  }

  return (
    <Flex direction="column">
      <Box>
        <Box flex="1" mr={4}>
          <OrganizationDetails
            organizationDetails={organizationDetails}
            setOrganizationDetails={setOrganizationDetails}
            userRole={user.role}
          />
        </Box>
        <Box flex="1" mb={4}>
          <Button variant="outline" onClick={handleEmployeesButtonClick} colorScheme="purple" mt={4} mr={4}>
            Show Employees
          </Button>
          <Button variant="outline" onClick={handleSubscriptionsButtonClick} colorScheme="purple" mt={4} mr={4}>
            Show Subscriptions
          </Button>
        </Box>
        {showEmployees && <OrganizationEmployees organizationId={user.organizationId} />}
        {showSubscriptions && <OrganizationSubscriptions organizationId={user.organizationId} />}
      </Box>
    </Flex>
  );
};

export default MyOrganization;
