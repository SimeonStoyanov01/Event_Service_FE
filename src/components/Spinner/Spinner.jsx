import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const PurpleSpinner = () => {
  return (
    <Flex height="100vh" align="center" justify="center">
      <Spinner size="xl" color="purple.500" />
    </Flex>
  );
};

export default PurpleSpinner;
