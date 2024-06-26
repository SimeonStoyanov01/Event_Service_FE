import React from 'react';
import { Route } from 'react-router-dom';
import BusinessAdminLayout from '../components/Layouts/BusinessAdminLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/PageableGrid';
import CreateEventForm from '../components/BusinessEvents/CreateBusinessEvent';

export function businessAdminRoutes() {
  return (
      <Route path="/businessadmin" element={<BusinessAdminLayout />}>
        <Route index element={<div>Business Home</div>} /> 
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
        <Route path="create-event" element={<CreateEventForm />} />
    </Route>
  );
}
