import React from 'react';
import { Route } from 'react-router-dom';
import UserLayout from '../components/Layouts/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

export function userRoutes() {
  return <Route element={<ProtectedRoute roles={[ROLES.USER]} />}>
    <Route path="/user/*" element={<UserLayout />} />
  </Route>;
}
