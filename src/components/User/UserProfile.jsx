import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Text><strong>Username:</strong> {user.username}</Text>
      <Text><strong>Email:</strong> {user.email}</Text>
      <Text><strong>First Name:</strong> {user.firstName}</Text>
      <Text><strong>Last Name:</strong> {user.lastName}</Text>
      <Text><strong>Phone Number:</strong> {user.phoneNumber}</Text>
      <Text><strong>Role:</strong> {user.role}</Text>
    </Box>
  );
};

export default UserProfile;
