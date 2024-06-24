import React from 'react';
import { Button } from '@chakra-ui/react';
import LoginDrawer from './LoginPage';// Adjust the import path as per your file structure

const LoginButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Login
      </Button>
      <LoginDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LoginButton;
