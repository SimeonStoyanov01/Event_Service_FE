import React from 'react';
import { Box, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import NavBar from '../NavBars/AdminNavBar';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Sidebar/SideBar';
import backgroundImage from '../../assets/SideNavPic.png'

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
        minHeight="100vh"  
        width="100vw"    
        gap={1}    
      >
        <GridItem area={'header'} bg="green.300">
          <NavBar>
            <NavLink to="/user">Home</NavLink>
            <NavLink to="/user/events">AllEvents</NavLink>
          </NavBar>
        </GridItem>
        <GridItem
          area={'nav'}
          bg="gray.300"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover" 
          backgroundPosition="center" 
        >
          <Sidebar/>
        </GridItem>
        <GridItem area={'main'} p={4} bg="white.300">
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserLayout;
