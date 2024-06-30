import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Stack,
  useToast,
  Heading,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { registerOrganization } from '../../../services/userService';
import './RegisterOrganizationDrawer.css'; 

const RegisterOrganizationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const steps = [
    { title: 'Organization Details', description: 'Enter organization information' },
    { title: 'Business Admin Details', description: 'Enter admin information' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [organizationName, setOrganizationName] = useState('');
  const [organizationAddress, setOrganizationAddress] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const handleRegister = async () => {
    try {
      const organizationData = {
        organizationName,
        organizationAddress,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
      };

      const response = await registerOrganization(organizationData);

      toast({
        title: 'Registration successful.',
        description: 'Your organization has been successfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Registration failed.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setOrganizationName('');
    setOrganizationAddress('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setActiveStep(0);
  };

  return (
    <>
      <Button colorscheme="teal" onClick={onOpen}>
        Register Organization
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Heading>Register your organization</Heading>
          </DrawerHeader>

          <DrawerBody>
            <Stepper colorScheme='purple' index={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon/>}
                      incomplete={<StepNumber className="step-number" />}
                      active={<StepNumber className="step-number" />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle className="step-title">{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Stack spacing={3} mt={5}>
                <Input
                  type="text"
                  placeholder="Organization Name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Organization Address"
                  value={organizationAddress}
                  onChange={(e) => setOrganizationAddress(e.target.value)}
                />
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={3} mt={5}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" className="drawer-footer-buttons">
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            {activeStep === 1 ? (
              <>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button colorscheme="blue" onClick={handleRegister}>
                  Register
                </Button>
              </>
            ) : (
              <Button colorscheme="blue" onClick={handleNext}>
                Next
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RegisterOrganizationDrawer;
