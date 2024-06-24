// components/MyAccountMenu.jsx
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
import { logout } from '../../services/authService';
import './MyAccountMenu.css';
import { useAuth } from '../../contexts/AuthContext';

const MyAccountMenu = () => {
    const { logout } = useAuth();
    const toast = useToast();
  
    const handleLogout = async () => {
        await logout();
    };

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="pink">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile" className="custom-menu-item">
          <MenuItem className="custom-menu-item">My Account</MenuItem>
          <MenuItem className="custom-menu-item">Payments</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem className="custom-menu-item">Docs</MenuItem>
          <MenuItem className="custom-menu-item">FAQ</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem className="custom-menu-item" onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyAccountMenu;
