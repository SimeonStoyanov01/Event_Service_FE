import React from 'react';
import { Box, Flex, HStack, Link, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={handleToggle}
        />
        <HStack spacing={8} alignItems="center">
          <Box>Event Service</Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <Link href="/" color="white">Home</Link>
            <Link href="/events" color="white">All Events</Link>
          </HStack>
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