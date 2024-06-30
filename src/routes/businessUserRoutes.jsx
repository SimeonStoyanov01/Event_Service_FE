import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import BusinessUserLayout from '../components/Layouts/BusinessUserLayout';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import CreateEventForm from '../components/BusinessEvents/CreateBusinessEvent';

export function businessUserRoutes() {
  return (
    <>
      <Route path="/businessuser" element={<BusinessUserLayout />}>
        <Route index element={<div>Business Home</div>} />
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
        <Route path="create-event" element={<CreateEventForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/businessuser" />} />
    </>
  );
}
