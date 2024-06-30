import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Textarea, useToast } from '@chakra-ui/react';
import { createReport } from '../../services/reportService';

const CreateReport = ({ eventId }) => {
  const toast = useToast();
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');

  const handleCreateReport = async () => {
    try {
      const reportData = {
        description,
        subject,
      };
      await createReport(reportData);
      toast({
        title: 'Report Created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setDescription('');
      setSubject('');
    } catch (error) {
      console.error('Failed to create report:', error);
      toast({
        title: 'Error',
        description: 'Failed to create report. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading mb={4} textAlign="center">
        Create Report
      </Heading>
      <Input
        mb={8}
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        bg="white"
        color="black"
      />
      <Textarea
        mb={8}
        placeholder="Description"
        minHeight="300px"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        bg="white"
        color="black"
      />
      <Flex justify="flex-end">
        <Button
          size="lg"
          colorScheme="blue"
          onClick={handleCreateReport}
          isLoading={false}
          loadingText="Creating..."
          ml={2}
        >
          Create Report
        </Button>
      </Flex>
    </>
  );
};

export default CreateReport;
