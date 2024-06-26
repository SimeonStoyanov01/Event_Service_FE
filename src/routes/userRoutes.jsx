import React from 'react';
import { Route } from 'react-router-dom';
import UserLayout from '../components/Layouts/UserLayout';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/PageableGrid';

export function userRoutes() {
  return (
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<div>User Home</div>} /> 
        <Route path="events" element={<PageableGrid />} />
        <Route path="myaccount" element={<UserProfile />} />
      </Route>
  );
}
