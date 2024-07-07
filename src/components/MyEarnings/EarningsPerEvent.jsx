import React, { useState, useEffect } from 'react';
import { getOrganizationEarnings } from '../../services/organizationService';
import { Box, Text, Center, Spinner, List, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Select } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const EarningsPerEvent = ({ organizationId }) => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc-earnings');

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getOrganizationEarnings(organizationId);
        const filteredEarnings = response.organizationEarningsPerEvent.filter(earning => earning.estimatedEarnings > 0);
        setEarnings(filteredEarnings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization earnings:', error);
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [organizationId]);

  const sortEarnings = (order) => {
    const sortedEarnings = [...earnings].sort((a, b) => {
      if (order === 'asc-earnings') {
        return a.actualEarnings - b.actualEarnings;
      } else if (order === 'desc-earnings') {
        return b.actualEarnings - a.actualEarnings;
      } else if (order === 'asc-date') {
        return new Date(a.eventModel.eventDateTime) - new Date(b.eventModel.eventDateTime);
      } else {
        return new Date(b.eventModel.eventDateTime) - new Date(a.eventModel.eventDateTime);
      }
    });
    setEarnings(sortedEarnings);
    setSortOrder(order);
  };

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);
    sortEarnings(selectedOrder);
  };

  if (loading) {
    return (
      <Center>
        <Spinner size="md" />
      </Center>
    );
  }

  return (
    <Box position="relative">
      <Select
        value={sortOrder}
        onChange={handleSortChange}
        mb={4}
        width="200px"
        color="black"
        borderColor="purple.500"
        _focus={{ borderColor: 'purple.500' }}
        position="absolute"
        top={0}
        right={0}
      >
        <option value="asc-earnings">Sort by Earnings Asc</option>
        <option value="desc-earnings">Sort by Earnings Desc</option>
        <option value="asc-date">Sort by Date Asc</option>
        <option value="desc-date">Sort by Date Desc</option>
      </Select>
      <Text fontSize="lg" fontWeight="bold" color="black">Earnings Per Event</Text>
      {earnings.length > 0 ? (
        <List spacing={3} mt={4}>
          {earnings.map((earning, index) => (
            <Box key={index} mb={4}>
              <Text fontSize="xl" fontWeight="bold" color="black">
                {earning.eventModel.eventName} - {new Date(earning.eventModel.eventDateTime).toLocaleDateString()}
              </Text>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <StatGroup borderWidth="2px" borderColor="purple.500" borderRadius="lg" bg="white" p={4} alignItems="center">
                  <Stat textAlign="center">
                    <StatLabel fontSize="lg" color="black">Actual Earnings</StatLabel>
                    <StatNumber fontSize="2xl" color="black">{earning.actualEarnings} LV</StatNumber>
                  </Stat>
                  <Stat textAlign="center">
                    <StatLabel fontSize="lg" color="black">Estimated Earnings</StatLabel>
                    <StatNumber fontSize="2xl" color="black">{earning.estimatedEarnings} LV</StatNumber>
                  </Stat>
                  <Stat textAlign="center">
                    <StatLabel fontSize="lg" color="black">Difference</StatLabel>
                    <StatNumber fontSize="2xl" color="black">{earning.estimatedEarnings - earning.actualEarnings} LV</StatNumber>
                    <StatHelpText fontSize="lg" color="black">({((earning.estimatedEarnings - earning.actualEarnings) / earning.estimatedEarnings * 100).toFixed(2)}%)</StatHelpText>
                    <StatArrow type={earning.estimatedEarnings - earning.actualEarnings < 0 ? 'increase' : 'decrease'} color="purple.500" />
                  </Stat>
                </StatGroup>
              </motion.div>
            </Box>
          ))}
        </List>
      ) : (
        <Text>No earnings found.</Text>
      )}
    </Box>
  );
};

export default EarningsPerEvent;
