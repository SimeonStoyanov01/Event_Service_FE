import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../components/Layouts/AdminLayout';
import PageableGrid from '../components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import UserProfile from '../components/User/UserProfile';

export function adminRoutes() {
  return (
    <>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<div>Admin Home</div>} />
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" />} />
    </>
  );
}
