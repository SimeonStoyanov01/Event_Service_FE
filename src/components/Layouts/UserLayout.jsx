import React from 'react';
import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import NavBar from '../NavBar';
import { Outlet } from 'react-router-dom';

const UserLayout = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box minHeight="100vh" minWidth="100vw" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav main"`}
        gridTemplateRows={'auto 1fr'}
        gridTemplateColumns={'250px 1fr'}
        height="100vh"
      >
        <GridItem area={'header'} bg="green.300">
          <NavBar role="User" />
        </GridItem>
        <GridItem area={'nav'} bg="pink.700">
          <Box>ssdffd</Box>
        </GridItem>
        <GridItem area={'main'} p={4} bg="orange.300">
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserLayout;