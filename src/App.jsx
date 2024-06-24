import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import theme from './theme';
import {businessUserRoutes} from './routes/businessUserRoutes'
import { businessAdminRoutes } from './routes/businessAdminRoutes';
import { userRoutes } from './routes/userRoutes';
import { adminRoutes } from './routes/adminRoutes';
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
      <Routes>
            <Route path="/" element={<Layout />} />
            {adminRoutes()}
            {userRoutes()}
            {businessUserRoutes()}
            {businessAdminRoutes()}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
};


export default App;


