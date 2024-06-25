import React from 'react';
import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import NavBar from './NavBar';
import { Link } from '@chakra-ui/react';

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box minHeight="100vh" minWidth="100vw" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav main"`}
        gridTemplateRows={'auto 1fr'}
        gridTemplateColumns={'250px 1fr'}
        minHeight="100vh"  // Ensure the grid takes full height of the viewport
        width="100vw"       // Ensure the grid takes full width of the viewport
        gap={1}             // Adjust gap between grid items as needed
      >
        <GridItem area={'header'} bg="green.300">
          <NavBar>       
           <Link href="/">Home</Link>
           <Link href="/events">All Events</Link>     
          </NavBar>

        </GridItem>
        <GridItem area={'nav'} bg="pink.700">
          {/* Add Nav items here */}
          <Box padding={4}>Default Nav Items</Box>
        </GridItem>
        <GridItem area={'main'} p={4} bg="orange.300">
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
