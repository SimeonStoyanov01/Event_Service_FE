import React from 'react';
import { Route } from 'react-router-dom';
import BusinessUserLayout from '../components/Layouts/BusinessUserLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/PageableGrid';

export function businessUserRoutes() {
  return (
      <Route path="/businessuser" element={<BusinessUserLayout />}>
        <Route index element={<div>Business Home</div>} /> 
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
    </Route>
  );
}
