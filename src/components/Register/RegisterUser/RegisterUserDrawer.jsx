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
  useDisclosure,
  useToast,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { registerUser } from '../../../services/userService';
import LoginDrawer from '../../Login/LoginPage';
import './RegisterUserDrawer.css'; 

const RegisterUserDrawer = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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
      };

      const response = await registerUser(userData);

      toast({
        title: 'Registration successful.',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      setIsRegisterOpen(false);
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

  const handleLoginLinkClick = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <Button colorscheme="teal" onClick={() => setIsRegisterOpen(true)}>
        Register
      </Button>
      <Drawer isOpen={isRegisterOpen} placement="right" onClose={() => setIsRegisterOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" className="chakra-heading">
            <Heading>Register to your account</Heading>
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
              <Text className='chakra-input'>
                Already have an account?{' '}
                <Link color="purple.500" onClick={handleLoginLinkClick}>
                  Login here
                </Link>
              </Text>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={() => setIsRegisterOpen(false)}>
              Cancel
            </Button>
            <Button colorscheme="blue" onClick={handleRegister}>
              Register
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <LoginDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default RegisterUserDrawer;
