import React, { useState } from 'react';
import { Input, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const InvitationList = ({ onChange, initialEmails = [] }) => {
  const [inviteeEmails, setInviteeEmails] = useState(initialEmails);

  const handleAddEmail = () => {
    const updatedEmails = [...inviteeEmails, ''];
    setInviteeEmails(updatedEmails);
    onChange(updatedEmails);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = inviteeEmails.filter((_, i) => i !== index);
    setInviteeEmails(updatedEmails);
    onChange(updatedEmails);
  };

  const handleChange = (value, index) => {
    const updatedEmails = [...inviteeEmails];
    updatedEmails[index] = value;
    setInviteeEmails(updatedEmails);
    onChange(updatedEmails);
  };

  return (
    <Box mt={4}>
      <Flex color='black' mb={4}>
        <Box>You can skip this step if you want</Box>
        <Spacer />
        <IconButton
          icon={<AddIcon />}
          aria-label="Add invitee email"
          onClick={handleAddEmail}
          colorScheme="blue"
        />
      </Flex>
      {inviteeEmails.map((email, index) => (
        <Flex key={index} alignItems="center" mt={4}>
          <Input
            type="email"
            value={email}
            onChange={(e) => handleChange(e.target.value, index)}
            placeholder="Enter invitee email"
            mr={2}
          />
          {index < inviteeEmails.length && (
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Remove invitee email"
              onClick={() => handleRemoveEmail(index)}
              colorScheme="red"
            />
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default InvitationList;
