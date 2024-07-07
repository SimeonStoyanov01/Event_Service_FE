// AggregatedData.js

import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatGroup, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion'; 

const AggregatedData = ({ organizations, personalUsers }) => {
  const totalOrganizations = organizations.length;
  const totalEvents = organizations.reduce((acc, org) => {
    const activeEvents = org.eventModels.filter(event => event.status === 'ACTIVE');
    return acc + activeEvents.length;
  }, 0);
  const totalEmployees = organizations.reduce((acc, org) => acc + org.userModels.length, 0);
  const totalPersonalUsers = personalUsers.length;

  return (
    <Box mb={8}>
      <Text py={4} fontSize="2xl" fontWeight="bold" color="black">Aggregated Data</Text>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <StatGroup borderWidth="2px" borderColor="purple.500" borderRadius="lg" bg="white" p={4} alignItems="center" justifyContent="space-around">
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Total Organizations</StatLabel>
            <StatNumber fontSize="2xl" color="black">{totalOrganizations}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Total Active Events</StatLabel>
            <StatNumber fontSize="2xl" color="black">{totalEvents}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Total Business Users</StatLabel>
            <StatNumber fontSize="2xl" color="black">{totalEmployees}</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Total Personal Users</StatLabel>
            <StatNumber fontSize="2xl" color="black">{totalPersonalUsers}</StatNumber>
          </Stat>
        </StatGroup>
      </motion.div>
    </Box>
  );
};

export default AggregatedData;
