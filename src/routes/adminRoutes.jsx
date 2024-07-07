import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../components/Layouts/AdminLayout';
import PageableGrid from '../components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import UserProfile from '../components/User/UserProfile';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import OrganizationDetails from '../components/AdminDashboard/OrganizationDetails/OrganizationDetails';
import ReportsList from '../components/Reports/ReportsList';
import EventDetail from '../components/BusinessEvents/BusinessEventsGrid/BusinessEventDetails';

export function adminRoutes() {
  return (
    <>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="organization/:organizationId" element={<OrganizationDetails />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
        <Route path="reports" element={<ReportsList />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" />} />
    </>
  );
}
