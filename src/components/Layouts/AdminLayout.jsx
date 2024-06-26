// AdminLayout.jsx
import React from 'react';
import { Box, Grid, GridItem, useColorMode} from '@chakra-ui/react';
import NavBar from '../NavBars/AdminNavBar';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
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
        minHeight="100vh"  // Ensure the grid takes full height of the viewport
        width="100vw"       // Ensure the grid takes full width of the viewport
        gap={1}             // Adjust gap between grid items as needed
      >
        <GridItem area={'header'} bg="blue.300">
          <NavBar>
            {/* <Link href="/">Home</Link>
            <Link href="/admin/">All Events</Link> */}
            <NavLink to="/admin">Home</NavLink>
            <NavLink to="/admin/events">AllEvents</NavLink>
          </NavBar>
        </GridItem>
        <GridItem area={'nav'} bg="gray.300">
          <Sidebar/>
        </GridItem>
        <GridItem area={'main'} p={4} bg="white.300">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
