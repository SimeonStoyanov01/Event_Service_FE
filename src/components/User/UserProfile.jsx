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
    <Box p={5} bg="white" shadow="md" borderWidth="1px" borderRadius="md">
      <Heading mb={4} size="md" color="black">User Profile</Heading>
      <Stack spacing={3}>
        <Box>
          <Text fontWeight="bold" color="black">Username:</Text>
          <Text color="black">{user.username}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="black">Email:</Text>
          <Text color="black">{user.email}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="black">First Name:</Text>
          <Text color="black">{user.firstName}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="black">Last Name:</Text>
          <Text color="black">{user.lastName}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="black">Phone Number:</Text>
          <Text color="black">{user.phoneNumber}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" color="black">Role:</Text>
          <Text color="black">{user.role}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserProfile;
