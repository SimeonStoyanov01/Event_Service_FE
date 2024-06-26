import React from 'react';
import { List, ListItem, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { CalendarIcon, EditIcon, AtSignIcon, InfoIcon, SettingsIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const listItemBgColor = useColorModeValue('white', 'gray.800');
  const listItemTextColor = useColorModeValue('black', 'white');

  const renderSidebarItems = () => {
    switch (user?.role) {
      case 'PERSONAL':
        return (
          <>
            <ListItem>
              <NavLink to="/user">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <CalendarIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Dashboard</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/user/profile">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <AtSignIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Profile</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/user/settings">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <SettingsIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Settings</Text>
                </Box>
              </NavLink>
            </ListItem>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <ListItem>
              <NavLink to="/admin">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <CalendarIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Dashboard</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/admin/reports">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <InfoIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Reports</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/admin/users">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <AtSignIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Users</Text>
                </Box>
              </NavLink>
            </ListItem>
          </>
        );
      case 'BUSINESS_ADMIN':
        return (
          <>
            <ListItem>
             <NavLink to="/businessadmin/create-event">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <CalendarIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Create Event</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/businessadmin/earnings">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <InfoIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Earnings</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/businessadmin/events">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <EditIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Events</Text>
                </Box>
              </NavLink>
            </ListItem>
          </>
        );
      case 'BUSINESS':
        return (
          <>
            <ListItem>
              <NavLink to="/businessuser/create-event">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <CalendarIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Create Event</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/businessuser/earnings">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <InfoIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Earnings</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/businessuser/events">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <EditIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Events</Text>
                </Box>
              </NavLink>
            </ListItem>
          </>
        );
      default:
        return (
          <>
            <ListItem>
              <NavLink to="/">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <CalendarIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>Home</Text>
                </Box>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/about">
                <Box
                  display="flex"
                  alignItems="center"
                  p={3}
                  bg={listItemBgColor}
                  borderRadius="md"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <InfoIcon color="black" />
                  <Text ml={3} color={listItemTextColor}>About</Text>
                </Box>
              </NavLink>
            </ListItem>
          </>
        );
    }
  };

  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      {renderSidebarItems()}
    </List>
  );
};

export default Sidebar;
