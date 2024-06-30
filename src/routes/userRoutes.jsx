import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import UserLayout from '../components/Layouts/UserLayout';
import UserProfile from '../components/User/UserProfile';
import PageableGrid from '../components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import EventDetail from '../components/BusinessEvents/BusinessEventsGrid/BusinessEventDetails';
import MySubscriptions from '../components/Subscriptions/MySubscriptions';
import MyReservations from '../components/Reservation/MyReservations';
import CreatePersonalEvent from '../components/PersonalEvents/CreatePersonalEvent/CreatePersonalEvent';
import PersonalEventList from '../components/PersonalEvents/MyPersonalEvents/PersonalEventList';
import PersonalEventDetails from '../components/PersonalEvents/MyPersonalEvents/PersonalEventDetails/GetPersonalEvent';
import CreateReport from '../components/Reports/CreateReport';

export function userRoutes() {
  return (
    <>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<div>User Home</div>} />
        <Route path="events" element={<PageableGrid />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="myaccount" element={<UserProfile />} />
        <Route path="mysubscriptions" element={<MySubscriptions />} />
        <Route path="myreservations" element={<MyReservations />} />
        <Route path="createpersonalevent" element={<CreatePersonalEvent />} />
        <Route path="mypersonalevents" element={<PersonalEventList />} />
        <Route path="mypersonalevents/:personalEventId" element={<PersonalEventDetails />} />
        <Route path="report" element={<CreateReport isOpenedFromEventButton={false}/>} />
      </Route>
      <Route path="*" element={<Navigate to="/user" />} />
    </>
  );
}
