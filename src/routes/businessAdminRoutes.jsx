import React from 'react';
import { Route } from 'react-router-dom';
import BusinessUserLayout from '../components/Layouts/BusinessUserLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

export function businessAdminRoutes() {
  return <Route element={<ProtectedRoute roles={[ROLES.BUSINESS_ADMIN]} />}>
    <Route path="/business_admin/*" element={<BusinessUserLayout />} />
  </Route>;
}
