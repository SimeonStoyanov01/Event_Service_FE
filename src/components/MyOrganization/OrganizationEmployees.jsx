import React, { useState, useEffect } from 'react';
import {
  Box, Center, Spinner, Text, Button, Flex,
  Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import { getOrganizationEmployees } from '../../services/organizationService';
import { AddIcon } from '@chakra-ui/icons';
import RegisterBusinessUserDrawer from '../Register/RegisterBusinessUser/RegisterBusinessUserDrawer';
import PurpleSpinner from '../Spinner/Spinner';

const OrganizationEmployees = ({ organizationId }) => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getOrganizationEmployees(organizationId);
        setEmployees(employeesData.employeeModels);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [organizationId]);

  const toggleRegisterDrawer = () => {
    setIsRegisterDrawerOpen(!isRegisterDrawerOpen);
  };

  const handleEmployeeRegistered = () => {
    fetchEmployees();
    setIsRegisterDrawerOpen(false); 
  };

  const fetchEmployees = async () => {
    try {
      const employeesData = await getOrganizationEmployees(organizationId);
      setEmployees(employeesData.employeeModels);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return (
      <Center>
        <PurpleSpinner/>
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text color="red.500">Error fetching employees: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Box overflowX="auto">
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" color="black" fontWeight="bold">List of Employees</Text>
        <Button
          onClick={toggleRegisterDrawer}
          colorScheme="teal"
          leftIcon={<AddIcon />}
          mr={4}
        >
          Add Employee
        </Button>
      </Flex>

      <RegisterBusinessUserDrawer
        isOpen={isRegisterDrawerOpen}
        onClose={toggleRegisterDrawer}
        onEmployeeRegistered={handleEmployeeRegistered}
        organizationId={organizationId}
      />

      {employees && employees.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => (
              <Tr color="black" key={employee.userId}>
                <Td>{employee.firstName} {employee.lastName}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.username}</Td>
                <Td>{employee.role}</Td>
                <Td>{employee.phoneNumber ? employee.phoneNumber : 'N/A'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No employees found.</Text>
      )}
    </Box>
  );
};

export default OrganizationEmployees;
