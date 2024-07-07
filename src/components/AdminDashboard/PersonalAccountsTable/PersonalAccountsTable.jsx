// PersonalAccountsTable.jsx

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PersonalAccountsTable = ({ personalUsers }) => {
  return (
    <Table color="black" variant="simple">
      <Thead>
        <Tr>
          <Th>User ID</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Phone Number</Th>
        </Tr>
      </Thead>
      <Tbody>
        {personalUsers.map(user => (
          <Tr key={user.userId}>
            <Td>{user.userId}</Td>
            <Td>{user.username}</Td>
            <Td>{user.email}</Td>
            <Td>{user.firstName}</Td>
            <Td>{user.lastName}</Td>
            <Td>{user.phoneNumber}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PersonalAccountsTable;
