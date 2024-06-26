import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import theme from './theme';
import PageableGrid from './components/BusinessEvents/PageableGrid';
import { businessUserRoutes } from './routes/businessUserRoutes';
import { businessAdminRoutes } from './routes/businessAdminRoutes';
import { userRoutes } from './routes/userRoutes';
import { adminRoutes } from './routes/adminRoutes';

const RoleBasedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      {user.role === 'ADMIN' && adminRoutes()}
      {user.role === 'PERSONAL' && userRoutes()}
      {user.role === 'BUSINESS_ADMIN' && businessAdminRoutes()}
      {user.role === 'BUSINESS' && businessUserRoutes()}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/events" element={<Layout><PageableGrid /></Layout>} />
            <Route path="*" element={<RoleBasedRoutes />} />
          </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
