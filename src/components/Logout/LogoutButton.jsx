import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { logout } from '../../services/authService';

const Logout = () => {
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      toast({
        title: 'Logout successful.',
        description: 'You have successfully logged out.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Logout failed.',
        description: 'Failed to logout. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
