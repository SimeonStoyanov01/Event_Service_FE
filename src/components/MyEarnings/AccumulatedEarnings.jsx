
import React, { useState, useEffect } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { getOrganizationAccumulatedEarnings } from '../../services/organizationService';
import { motion } from 'framer-motion';
import PurpleSpinner from '../Spinner/Spinner';

const AccumulatedEarnings = ({ organizationId }) => {
  const [accumulatedEarnings, setAccumulatedEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccumulatedEarnings = async () => {
      try {
        const response = await getOrganizationAccumulatedEarnings(organizationId);
        setAccumulatedEarnings(response.accumulatedEarnings);
      } catch (error) {
        console.error('Error fetching accumulated earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccumulatedEarnings();
  }, [organizationId]);

  if (loading) {
    return (
      <Box textAlign="center">
        <PurpleSpinner/>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="black" mb={4}>Accumulated Earnings</Text>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Stat
            borderWidth="2px"
            borderColor="purple.500"
            borderRadius="lg"
            bg="white"
            p={4}
            alignItems="center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <StatLabel fontSize="lg" color="black">Total Accumulated Earnings</StatLabel>
            <StatNumber fontSize="2xl" color="black">{accumulatedEarnings} LV</StatNumber>
          </Stat>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AccumulatedEarnings;
