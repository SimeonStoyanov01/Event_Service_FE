import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import BusinessAdminLayout from '../components/Layouts/BusinessAdminLayout';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import CreateEventForm from '../components/BusinessEvents/CreateBusinessEvent/CreateBusinessEvent';
import BusinessEventsList from '../components/BusinessEvents/MyBusinessEvents/BusinessEventList';
import BusinessEventDetails from '../components/BusinessEvents/MyBusinessEvents/BusinessEventDetails/BusinessEventDetails';
import MyEarnings from '../components/MyEarnings/MyEarnings';
import MyOrganization from '../components/MyOrganization/MyOrganization';
import CreateReport from '../components/Reports/CreateReport';
import HomeScreen from '../components/Homescreen/Homescreen';
import EventDetail from '../components/BusinessEvents/BusinessEventsGrid/BusinessEventDetails';

export function businessAdminRoutes() {
  return (
    <>
      <Route path="/businessadmin" element={<BusinessAdminLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="events" element={<PageableGrid />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="myaccount" element={<UserProfile />} />
        <Route path="create-event" element={<CreateEventForm />} />
        <Route path="organizationevents" element={<BusinessEventsList />} />
        <Route path="organizationevents/:eventId" element={<BusinessEventDetails />} />
        <Route path="myearnings" element={<MyEarnings />} />
        <Route path="myorganization" element={<MyOrganization />} />
        <Route path="report" element={<CreateReport />} />
      </Route>
      <Route path="*" element={<Navigate to="/businessadmin" />} />
    </>
  );
}
