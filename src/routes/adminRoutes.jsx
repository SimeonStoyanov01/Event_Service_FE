import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../components/Layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

export function adminRoutes() {
  return <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
    <Route path="/admin/*" element={<AdminLayout />} />
  </Route>;
}
