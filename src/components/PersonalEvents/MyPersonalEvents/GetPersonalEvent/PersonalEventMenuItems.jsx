import React, { useState, useEffect } from 'react';
import {
  Box, Text, IconButton, Spinner, Center, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, FormControl, FormLabel,
  useToast // Import useToast from Chakra UI
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { getAllMenusPerEvent, deleteMenu, createMenu, getMenu } from '../../../../services/menuService'; // Adjust the import path as needed

const MenuItems = ({ personalEventId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMenu, setNewMenu] = useState({ menuName: '' });
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuData = await getAllMenusPerEvent(personalEventId);
        setMenuItems(menuData.menuModel);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoadingMenus(false);
      }
    };

    fetchMenuItems();
  }, [personalEventId]);

  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId);
      setMenuItems((prevItems) => prevItems.filter((item) => item.menuId !== menuId));
      showToast('Menu item deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      showToast('Failed to delete menu item', 'error');
    }
  };
  const handleCreateMenu = async (menuName) => {
    try {
      const newMenuItem = await createMenu({ menuName, personalEventId });
      console.log(newMenuItem); // Verify the structure of newMenuItem in the console
  
      // Assuming newMenuItem is structured as { menuId, menuName, personalEventId }
      setMenuItems((prevItems) => [...prevItems, newMenuItem.menuModel]); // Update state immediately with the newly created item
  
      onClose();
      showToast('Menu item created successfully', 'success');
      setNewMenu({ menuName: '' }); // Clear the input after successful creation
    } catch (error) {
      console.error('Error creating menu item:', error);
      showToast('Failed to create menu item', 'error');
    }
  };
  
  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 3000, // Toast message duration
      isClosable: true,
    });
  };

  return (
    <Box mt={8}>
      {loadingMenus ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="black">Menu Name</Th>
                  <Th color="black">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <Tr key={item.menuId}>
                      <Td color="black">{item.menuName}</Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => handleDeleteMenu(item.menuId)}
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={2} color="black" textAlign="center">
                      No menu items found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>

          <Button
            mt={4}
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="purple"
          >
            Add Menu Item
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New Menu Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="menuName" isRequired>
                  <FormLabel>Menu Name</FormLabel>
                  <Input
                    value={newMenu.menuName}
                    onChange={(e) => setNewMenu({ ...newMenu, menuName: e.target.value })}
                    borderColor="purple.500"
                    variant="outline"
                    color="black"
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="purple" mr={3} onClick={() => handleCreateMenu(newMenu.menuName)}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default MenuItems;
