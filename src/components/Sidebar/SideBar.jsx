import React from 'react';
import { List, ListItem, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { CalendarIcon, EditIcon, AtSignIcon, InfoIcon, SettingsIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = () => {
    const { user } = useAuth();
    const listItemBgColor = useColorModeValue('white', 'gray.800');
    const listItemTextColor = useColorModeValue('black', 'white');
    const listItemHoverBgColor = useColorModeValue('gray.200', 'gray.700');

    const renderSidebarItems = () => {
        switch (user?.role) {
            case 'PERSONAL':
                return (
                    <>
                        <ListItem>
                            <NavLink to="/user/mypersonalevents">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <CalendarIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>My Events</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/user/createpersonalevent">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <AtSignIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Create Personal Event</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/user/report">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <SettingsIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Report an issue</Text>
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
                                    _hover={{ bg: listItemHoverBgColor }}
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
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <InfoIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Reports</Text>
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
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <CalendarIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Create Event</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/businessadmin/organizationevents">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <EditIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Events</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/businessadmin/report">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <InfoIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Write a report</Text>
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
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <CalendarIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Create Event</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/businessuser/organizationevents">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <EditIcon color="black" />
                                    <Text ml={3} flex="wrap" color={listItemTextColor}>Events</Text>
                                </Box>
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/businessuser/report">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={3}
                                    bg={listItemBgColor}
                                    borderRadius="md"
                                    _hover={{ bg: listItemHoverBgColor }}
                                >
                                    <InfoIcon color="black" />
                                    <Text ml={3} color={listItemTextColor}>Write a report</Text>
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
                                    _hover={{ bg: listItemHoverBgColor }}
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
                                    _hover={{ bg: listItemHoverBgColor }}
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
