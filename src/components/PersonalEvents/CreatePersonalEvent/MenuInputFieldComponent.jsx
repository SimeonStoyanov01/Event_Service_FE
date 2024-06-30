import React, { useState } from 'react';
import { Input, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const MenuItems = ({ onChange, items }) => {
  const [menuItems, setMenuItems] = useState(items.map(item => ({ name: item, personalEventId: '' }))); // Initialize state with initial items as objects

  const handleAddItem = () => {
    const updatedItems = [...menuItems, { name: '', personalEventId: '' }]; // Add an empty item object to the list
    setMenuItems(updatedItems);
    onChange(updatedItems.map(item => item.name)); // Notify parent component of updated items as an array of names
  };

  const handleRemoveItem = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);   
    setMenuItems(updatedItems);
    onChange(updatedItems.map(item => item.name)); 
  };

  const handleChange = (value, index) => {
    const updatedItems = [...menuItems];
    updatedItems[index].name = value; 
    setMenuItems(updatedItems);
    onChange(updatedItems.map(item => item.name));
  };

  return (
    <Box mt={4}>
        <Flex color='black' mb={4}>
          <Box>You can skip this step if you want</Box>
          <Spacer />
          <IconButton
            icon={<AddIcon />}
            aria-label="Add menu item"
            onClick={handleAddItem}
            colorScheme="blue"
          />
        </Flex>
      {menuItems.map((item, index) => (
        <Flex key={index} alignItems="center" mt={4}>
          <Input
            type="text"
            value={item.name}
            onChange={(e) => handleChange(e.target.value, index)}
            placeholder="Enter menu item"
            mr={2}
          />
          {index < menuItems.length && (
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Remove menu item"
              onClick={() => handleRemoveItem(index)}
              colorScheme="red"
            />
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default MenuItems;