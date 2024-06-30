import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import NavBar from '../NavBars/AdminNavBar';
import Sidebar from '../Sidebar/SideBar';

const AdminLayout = () => {
  const { colorMode } = useColorMode();

  return (
    <Box minHeight="100vh" minWidth="100vw" bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav main"`}
        gridTemplateRows={'auto 1fr'}
        gridTemplateColumns={'250px 1fr'}
        minHeight="100vh"
        width="100vw"
        gap={1}
      >
        <GridItem area={'header'} bg="blue.300">
          <NavBar>
            <NavLink to="/admin">Home</NavLink>
            <NavLink to="/admin/events">AllEvents</NavLink>
          </NavBar>
        </GridItem>
        <GridItem area={'nav'} bg="gray.300">
          <Sidebar />
        </GridItem>
        <GridItem area={'main'} p={4} bg="white.300">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
