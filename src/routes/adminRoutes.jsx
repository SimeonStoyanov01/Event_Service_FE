// routes/adminRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../components/Layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';
import PageableGrid from '../components/BusinessEvents/PageableGrid';
import UserProfile from '../components/User/UserProfile';

export function adminRoutes() {
  return (
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Home</div>} /> 
        <Route path="events" element={<PageableGrid/>} />
        <Route path="myaccount" element={<UserProfile/>} />
    </Route>
  );
}
