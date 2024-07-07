import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text, useToast, Select } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { getInvitation, answerInvitation } from '../../services/invitationService';
import { getAllMenusPerEvent } from '../../services/menuService';

const AnswerInvitation = () => {
  const { invitationId } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const invitationData = await getInvitation(invitationId);
        setInvitation(invitationData.invitationModel);

        const personalEventId = invitationData.invitationModel.personalEventId;
        try {
          const menus = await getAllMenusPerEvent(personalEventId);
          setMenuItems(menus.menuModel);
        } catch (menuError) {
          if (menuError.response && menuError.response.status === 404) {
            setMenuItems([]);
          } else {
            console.error('Failed to fetch menu items:', menuError);
          }
        }
      } catch (error) {
        console.error('Failed to fetch invitation:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch invitation. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchInvitation();
  }, [invitationId, toast]);

  const handleMenuChange = (e) => {
    setSelectedMenuItem(e.target.value);
  };

  const handleAnswer = async (status) => {
    setLoading(true);

    const answerData = {
      invitationId,
      inviteeEmail: invitation.inviteeEmail,
      invitationStatus: status,
    };

    if (status === 'ACCEPTED' && selectedMenuItem) {
      answerData.menuName = selectedMenuItem;
    }

    try {
      await answerInvitation(answerData);
      toast({
        title: `Invitation ${status === 'ACCEPTED' ? 'Accepted' : 'Rejected'}`,
        status: status === 'ACCEPTED' ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to answer invitation. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!invitation) {
    return (
      <Flex align="center" justify="center" height="100%" width="100%">
        <Box p={8} maxW="md" borderWidth={1} borderRadius="md" boxShadow="lg">
          <Heading mb={4} textAlign="center">Loading...</Heading>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="center" height="100%" width="100%">
      <Box p={8} maxW="4xl" borderWidth={1}  backgroundColor="white" borderRadius="md"  boxShadow="lg" width="100%">
        <Heading mb={4} textAlign="center">Answer Invitation</Heading>
        <Text mb={4} color="black" textAlign="center">You have been invited to {invitation.personalEventName}.</Text>
        
        {menuItems.length > 0 && (
          <>
           <Text mb={4} color="black" textAlign="center">Menu items</Text>
          <Select 
            value={selectedMenuItem}
            onChange={handleMenuChange}
            mb={4}
            color="black"
            borderColor="purple.600"
          >
            {menuItems.map((menuItem) => (
              <option key={menuItem.menuId} value={menuItem.menuName}>
                {menuItem.menuName}
              </option>
            ))}
          </Select>
          </>
        )}
        
        <Flex justify="center" mt={4}>
          <Button
            mr={4}
            colorScheme="green"
            isLoading={loading}
            loadingText="Accepting..."
            onClick={() => handleAnswer('ACCEPTED')}
            leftIcon={<CheckIcon />}
          >
            Accept
          </Button>
          <Button
            colorScheme="red"
            isLoading={loading}
            loadingText="Rejecting..."
            onClick={() => handleAnswer('REJECTED')}
            leftIcon={<CloseIcon />}
          >
            Reject
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AnswerInvitation;
