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
  Box,
  FormLabel,
  useToast,
  InputGroup,
  Switch,
  Heading,
} from '@chakra-ui/react';
import { login } from '../../services/authService';
import './LoginPage.css'; // Import the CSS file

const LoginDrawer = ({ isOpen, onClose }) => {
  const firstField = React.useRef();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      toast({
        title: 'Login successful.',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();

    } catch (error) {
      toast({
        title: 'Login failed.',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }      window.location.reload();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Heading>Login to your account</Heading>
        </DrawerHeader>

        <DrawerBody>
          <Heading size="md" mb={4}>Enter your credentials</Heading>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                ref={firstField}
                id="email"
                placeholder="Please enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <FormLabel htmlFor="show-password" mt={2}>Show Password</FormLabel>
              <Switch
                id="show-password"
                isChecked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginDrawer;
