// EventEarnings.js

import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react';
import { getEventEarnings } from '../../../../services/businessEventService';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import PurpleSpinner from '../../../Spinner/Spinner';

const EventEarnings = ({ eventId }) => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventEarnings = async () => {
      try {
        const earningsData = await getEventEarnings(eventId);
        setEarnings(earningsData);
      } catch (error) {
        console.error('Error fetching event earnings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventEarnings();
  }, [eventId]);

  if (loading) {
    return (
      <Center>
        <PurpleSpinner />
      </Center>
    );
  }

  const actualEarnings = earnings.actualEarnings || 0;
  const estimatedEarnings = earnings.estimatedEarnings || 0;
  const difference = estimatedEarnings - actualEarnings;
  const percentageDifference = ((difference / estimatedEarnings) * 100).toFixed(2);

  return (
    <Box>
      <Text py={4} fontSize="2xl" fontWeight="bold" color="black">Event Earnings</Text>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <StatGroup borderWidth="2px" borderColor="purple.500" borderRadius="lg" bg="white" p={4} alignItems="center">
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Actual Earnings</StatLabel>
            <StatNumber fontSize="2xl" color="black">{actualEarnings} LV</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Estimated Earnings</StatLabel>
            <StatNumber fontSize="2xl" color="black">{estimatedEarnings} LV</StatNumber>
          </Stat>
          <Stat textAlign="center">
            <StatLabel fontSize="lg" color="black">Difference</StatLabel>
            <StatNumber fontSize="2xl" color="black">{difference} LV</StatNumber>
            <StatHelpText fontSize="lg" color="black">({percentageDifference}%)</StatHelpText>
            <StatArrow type={difference < 0 ? 'increase' : 'decrease'} color="purple.500" />
          </Stat>
        </StatGroup>
      </motion.div>
    </Box>
  );
};

export default EventEarnings;
