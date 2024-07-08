
import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext'; 
import EarningsPerEvent from './EarningsPerEvent';
import EarningsChart from './EarningsChart'; 
import AccumulatedEarnings from './AccumulatedEarnings'; 

const MyEarnings = () => {
  const { user } = useAuth(); 
  const [showEarnings, setShowEarnings] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [showAccumulatedEarnings, setShowAccumulatedEarnings] = useState(false);

  const handleEarningsButtonClick = () => {
    setShowEarnings(true);
    setShowChart(false);
    setShowAccumulatedEarnings(false);
  };

  const handleChartButtonClick = () => {
    setShowEarnings(false);
    setShowChart(true);
    setShowAccumulatedEarnings(false);
  };

  const handleAccumulatedEarningsButtonClick = () => {
    setShowEarnings(false);
    setShowChart(false);
    setShowAccumulatedEarnings(true);
  };

  return (
    <Box>
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="black">Organization Earnings</Text>
        <Button variant="outline" onClick={handleEarningsButtonClick} colorScheme="purple" mt={4} mr={4}>
          Earnings Per Event
        </Button>
        <Button variant="outline" onClick={handleChartButtonClick} colorScheme="purple" mt={4} mr={4}>
          Earnings Chart
        </Button>
        <Button variant="outline" onClick={handleAccumulatedEarningsButtonClick} colorScheme="purple" mt={4}>
          All Time Earnings
        </Button>
      </Box>
      {showEarnings && <EarningsPerEvent organizationId={user.organizationId} />}
      {showChart && <EarningsChart organizationId={user.organizationId} />}
      {showAccumulatedEarnings && <AccumulatedEarnings organizationId={user.organizationId} />}
    </Box>
  );
};

export default MyEarnings;
