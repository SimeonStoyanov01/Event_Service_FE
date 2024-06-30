import React, { useEffect, useState } from 'react';
import {
  Box, Button, Center, Spinner, Text, useToast, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Switch
} from '@chakra-ui/react';
import { getMySubscriptions, cancelSubscription } from '../../services/subscriptionService';

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(true); 
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getMySubscriptions();
        setSubscriptions(response.subscriptionModels); 
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was an error fetching your subscriptions.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [toast]);

  const handleCancelClick = (subscription) => {
    setSelectedSubscription(subscription);
    setIsDialogOpen(true);
  };

  const handleCancelSubscription = async () => {
    try {
      const cancelData = { subscriptionId: selectedSubscription.subscriptionId, organizationId: selectedSubscription.organizationId };
      await cancelSubscription(cancelData);
      const updatedSubscriptions = subscriptions.map(sub => {
        if (sub.subscriptionId === selectedSubscription.subscriptionId) {
          return { ...sub, subscriptionStatus: 'CANCELED' };
        }
        return sub;
      });
      setSubscriptions(updatedSubscriptions);
      toast({
        title: 'Canceled',
        description: 'Subscription canceled successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data || 'There was an error canceling the subscription.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  const filteredSubscriptions = showActiveOnly ? subscriptions.filter(sub => sub.subscriptionStatus === 'ACTIVE' || sub.subscriptionStatus === 'PENDING') : subscriptions;

  if (loading) {
    return (
      <Center minHeight="80vh">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box mb={4} display="flex" alignItems="center">
        <Text color='black' fontSize="2xl" mr={2}>My Subscriptions</Text>
        <Switch
          color={'black'}
          colorScheme="purple"
          isChecked={showActiveOnly}
          onChange={() => setShowActiveOnly(!showActiveOnly)}
          size="md"
        >
          Show Active Only
        </Switch>
      </Box>
      {filteredSubscriptions.length > 0 ? (
        filteredSubscriptions.map((subscription) => (
          <Box
            key={subscription.subscriptionId}
            p={4}
            mb={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor="black"
          >
            <Text color="black" fontWeight="bold" mb={2}>Organization: {subscription.organizationName}</Text>
            <Text color="black">Subscription Time: {subscription.subscriptionTime}</Text>
            <Text color="black">Status: {subscription.subscriptionStatus}</Text>
            <Text color="black">Subscription ID: {subscription.subscriptionId}</Text>
            {subscription.subscriptionStatus !== 'CANCELED' && (
              <Button colorScheme="red" mt={2} onClick={() => handleCancelClick(subscription)}>
                Cancel Subscription
              </Button>
            )}
          </Box>
        ))
      ) : (
        <Text color='black'>No subscriptions found.</Text>
      )}

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" color="black">
              Cancel Subscription
            </AlertDialogHeader>
            <AlertDialogBody color="black">
              Are you sure you want to cancel this subscription?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleCancelSubscription} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MySubscriptions;
