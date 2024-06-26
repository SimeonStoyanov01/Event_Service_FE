import React from 'react';
import { Box, Text, Skeleton, Stack, Heading } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Stack spacing={4}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <Box p={5} bg={'purple.600'} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading mb={4} size="md" color="white">User Profile</Heading>
      <Stack spacing={3}>
        <Box>
          <Text fontWeight="bold" color="white">Username:</Text>
          <Text color="white">{user.username}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">Email:</Text>
          <Text color="white">{user.email}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">First Name:</Text>
          <Text color="white">{user.firstName}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">Last Name:</Text>
          <Text color="white">{user.lastName}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">Phone Number:</Text>
          <Text color="white">{user.phoneNumber}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="white">Role:</Text>
          <Text color="white">{user.role}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;
