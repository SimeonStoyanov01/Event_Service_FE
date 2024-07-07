import React, { useState, useEffect } from 'react';
import {
  Box, Center, Spinner, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Heading
} from '@chakra-ui/react';
import { getOrganizationSubscriptions } from '../../services/organizationService';
import PurpleSpinner from '../Spinner/Spinner';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const OrganizationSubscriptions = ({ organizationId }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptionsData = await getOrganizationSubscriptions(organizationId);
        const allSubscriptions = subscriptionsData.subscriptionModels;
        const activeSubscriptions = allSubscriptions.filter(subscription => subscription.subscriptionStatus === 'ACTIVE');

        setSubscriptions(activeSubscriptions);
        setLoading(false);

        const activeCount = activeSubscriptions.length;
        const canceledCount = allSubscriptions.length - activeCount;
        setChartData({
          labels: ['Active', 'Canceled'],
          datasets: [
            {
              label: 'Subscription Status',
              data: [activeCount, canceledCount],
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [organizationId]);

  if (loading) {
    return (
      <Center>
        <PurpleSpinner />
      </Center>
    );
  }

  return (
    <Box overflowX="auto">
      {subscriptions.length > 0 ? (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Subscription ID</Th>
                <Th>User Email</Th>
                <Th>Subscription Time</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subscriptions.map((subscription) => (
                <Tr color="black" key={subscription.subscriptionId}>
                  <Td>{subscription.subscriptionId}</Td>
                  <Td>{subscription.userEmail}</Td>
                  <Td>{subscription.subscriptionTime}</Td>
                  <Td>{subscription.subscriptionStatus}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text size="xl" fontWeight="bold" mb={4} color="black">Retention to Cancellation Ratio</Text>
          {chartData && (
            <Flex justifyContent="left" mt={8}>
              <Box width={['100%', '50%', '25%']} maxWidth="300px">
                <Pie data={chartData} />
              </Box>
            </Flex>
          )}
        </>
      ) : (
        <Text color="black">No active subscriptions found.</Text>
      )}
    </Box>
  );
};

export default OrganizationSubscriptions;
