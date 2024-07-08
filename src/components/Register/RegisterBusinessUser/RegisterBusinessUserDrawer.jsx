import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Stack,
  useToast,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { registerBusinessUser } from '../../../services/userService';

const RegisterBusinessUserDrawer = ({ isOpen, onClose, onEmployeeRegistered, organizationId }) => {
    const toast = useToast();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleRegister = async () => {
      try {
        const userData = {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          phoneNumber,
          organizationId,
        };
  
        const response = await registerBusinessUser(userData);
  
        toast({
          title: 'Registration successful.',
          description: 'Business user registered successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
  
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
  
        if (typeof onEmployeeRegistered === 'function') {
          onEmployeeRegistered();
        }
      } catch (error) {
        toast({
          title: 'Registration failed.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Heading>Register Business User</Heading>
          </DrawerHeader>
  
          <DrawerBody>
            <Stack spacing={3}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Stack>
          </DrawerBody>
  
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleRegister}>
              Register
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default RegisterBusinessUserDrawer;
