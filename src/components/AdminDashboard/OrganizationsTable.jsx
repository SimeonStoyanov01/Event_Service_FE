import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const OrganizationsTable = ({ organizations }) => {
    return (
        <Table variant="simple" color="black">
            <Thead>
                <Tr>
                    <Th>Organization Id</Th>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {organizations.map((organization) => (
                    <Tr key={organization.organizationId}>
                        <Td>{organization.organizationId}</Td>
                        <Td>{organization.organizationName}</Td>
                        <Td>{organization.organizationAddress}</Td>
                        <Td>{organization.organizationStatus}</Td>
                        <Td>
                            <Button as={NavLink} variant="solid" to={`/admin/organization/${organization.organizationId}`} mt={4} colorScheme="blue" size="lg">
                                View Details
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default OrganizationsTable;
