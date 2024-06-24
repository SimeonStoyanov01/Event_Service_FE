import React from 'react';
import { Box, Flex, HStack, Link, IconButton, useDisclosure, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import RegisterUserDrawer from './Register/RegisterUser/RegisterUserDrawer';
import MyAccountMenu from './User/MyAccountMenu';
import LoginButton from './Login/LoginButton';
import RegisterOrganizationDrawer from './Register/RegisterOrganization/RegisterOrganizationDrawer';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={handleToggle}
          />
          <Box color="white">Event Service</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link href="/" color="white">Home</Link>
            <Link href="/events" color="white">All Events</Link>
          </HStack>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          {user ? <MyAccountMenu /> : <LoginButton isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
          {!user && <RegisterUserDrawer />}
          {!user && <RegisterOrganizationDrawer />}
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Flex as="nav" direction="column" spacing={4}>
            <Link href="/" color="white">Home</Link>
            <Link href="/events" color="white">All Events</Link>
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;
