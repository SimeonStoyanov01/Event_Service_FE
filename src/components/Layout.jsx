// src/components/Layout.jsx
import React from 'react';
import { Box, Container, Flex, useColorMode } from '@chakra-ui/react';
import NavBar from './NavBar';
import LoginDrawer from './LoginPage';

const Layout = () => {
  const { colorMode } = useColorMode();
  return (
    <Box minHeight="600vh" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>

      <Container maxW="container.lg" mt={4}>
        <LoginDrawer />
      </Container>
    </Box>
  );
};

export default Layout;
