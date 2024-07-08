

import React, { useEffect, useState } from 'react';
import { getAllOrganizations } from '../../services/organizationService';
import { getAllUsersByRole } from '../../services/userService';
import { Box, Flex, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AggregatedData from './AggregatedData';
import OrganizationsTable from './OrganizationsTable';
import PersonalAccountsTable from './PersonalAccountsTable/PersonalAccountsTable';

const AdminDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personalUsers, setPersonalUsers] = useState([]);
  const [showOrganizations, setShowOrganizations] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getAllOrganizations();
        setOrganizations(data.organizationModels);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchPersonalUsers = async () => {
      try {
        const userData = await getAllUsersByRole('PERSONAL');
        setPersonalUsers(userData.userModel);
      } catch (err) {
        console.error('Error fetching personal users:', err);
      }
    };

    fetchOrganizations();
    fetchPersonalUsers();
  }, []);

  const handleShowOrganizations = () => {
    setShowOrganizations(true);
  };

  const handleShowPersonalAccounts = () => {
    setShowOrganizations(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Flex>
        <Box flex="1" mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} minWidth="200px">
        <AggregatedData organizations={organizations} personalUsers={personalUsers} />
          <Button onClick={handleShowOrganizations} variant="outline" colorScheme="purple" mb={4} mr={4}>
            Show Organizations
          </Button>
          <Button onClick={handleShowPersonalAccounts} variant="outline" colorScheme="purple" mb={4}>
            Show Personal Accounts
          </Button>
          {showOrganizations ? (
              <OrganizationsTable organizations={organizations} />
          ) : (
            <PersonalAccountsTable personalUsers={personalUsers} />
          )}
        </Box>
      </Flex>
    </motion.div>
  );
};

export default AdminDashboard;
