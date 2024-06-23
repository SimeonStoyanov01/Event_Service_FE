import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AdminLayout from './components/Layouts/AdminLayout';
import UserLayout from './components/Layouts/UserLayout';
import BusinessAdminLayout from './components/Layouts/BusinessAdminLayout';
import BusinessUserLayout from './components/Layouts/BusinessUserLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import { ROLES } from './utils/constants';
import theme from './theme';
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
              <Route path="/admin/*" element={<AdminLayout />} />
            </Route>
            <Route element={<ProtectedRoute roles={[ROLES.USER]} />}>
              <Route path="/user/*" element={<UserLayout />} />
            </Route>
            <Route element={<ProtectedRoute roles={[ROLES.BUSINESS]} />}>
              <Route path="/business/*" element={<BusinessAdminLayout />} />
            </Route>
            <Route element={<ProtectedRoute roles={[ROLES.BUSINESS_ADMIN]} />}>
              <Route path="/business_admin/*" element={<BusinessUserLayout />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
};


export default App;
