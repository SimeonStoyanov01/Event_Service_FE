import React from 'react';
import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import NavBar from '../NavBar';

const AdminLayout = ({ children }) => {
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
        <GridItem area={'header'} bg="blue.300">
          <NavBar />
        </GridItem>
        <GridItem area={'nav'} bg="purple.700">
          {/* Add Nav items here */}
          <Box>Admin Nav Items</Box>
        </GridItem>
        <GridItem area={'main'} p={4} bg="yellow.300">
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
