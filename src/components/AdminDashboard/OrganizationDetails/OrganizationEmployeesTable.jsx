
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const OrganizationEmployeesTable = ({ users }) => {
    return (
        <Table color="black" variant="simple">
            <Thead>
                <Tr>
                    <Th>User Id</Th>
                    <Th>Username</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((user) => (
                    <Tr key={user.userId}>
                        <Td>{user.userId}</Td>
                        <Td>{user.username}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default OrganizationEmployeesTable;
