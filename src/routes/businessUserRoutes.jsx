import React from 'react';
import { Route } from 'react-router-dom';
import BusinessAdminLayout from '../components/Layouts/BusinessAdminLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

export function businessUserRoutes() {
  return <Route element={<ProtectedRoute roles={[ROLES.BUSINESS]} />}>
    <Route path="/business/*" element={<BusinessAdminLayout />} />
  </Route>;
}
