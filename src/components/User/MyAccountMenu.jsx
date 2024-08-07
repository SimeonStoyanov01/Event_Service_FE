import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  useToast,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './MyAccountMenu.css';

const MyAccountMenu = () => {
  const { user, logout } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();

  };

  const renderMenuItems = () => {
    switch (user?.role) {
      case 'PERSONAL':
        return (
          <>
            <MenuItem as={NavLink} to="/user/myaccount" className="custom-menu-item">
              My Account
            </MenuItem>
            <MenuItem as={NavLink} to="/user/mysubscriptions" className="custom-menu-item">
              My Subscriptions
            </MenuItem>
            <MenuItem as={NavLink} to="/user/myreservations" className="custom-menu-item">
              My Reservations
            </MenuItem>
          </>
        );
      case 'ADMIN':
        return (
          <>
            <MenuItem as={NavLink} to="/admin/myaccount" className="custom-menu-item">
              My Account
            </MenuItem>
            <MenuItem as={NavLink} to="/admin/reports" className="custom-menu-item">
              My Reports
            </MenuItem>
          </>
        );
      case 'BUSINESS_ADMIN':
        return (
          <>
            <MenuItem as={NavLink} to="/businessadmin/myaccount" className="custom-menu-item">
              My Account
            </MenuItem>
            <MenuItem as={NavLink} to="/businessadmin/myearnings" className="custom-menu-item">
              My Earnings
            </MenuItem>
            <MenuItem as={NavLink} to="/businessadmin/myorganization" className="custom-menu-item">
              My organization
            </MenuItem>
          </>
        );
      case 'BUSINESS':
        return (
          <>
            <MenuItem as={NavLink} to="/businessuser/myaccount" className="custom-menu-item">
              My Account
            </MenuItem>
            <MenuItem as={NavLink} to="/businessuser/myearnings" className="custom-menu-item">
              My Earnings
            </MenuItem>
            <MenuItem as={NavLink} to="/businessuser/myorganization" className="custom-menu-item">
              My Organization
            </MenuItem>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} colorscheme="pink">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile" className="custom-menu-item">
          {renderMenuItems()}
        </MenuGroup>
        <MenuDivider />
        <MenuItem className="custom-menu-item" onClick={handleLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyAccountMenu;
