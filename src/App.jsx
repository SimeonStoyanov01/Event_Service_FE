import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import theme from './theme';
import PageableGrid from './components/BusinessEvents/BusinessEventsGrid/PageableGrid';
import { businessUserRoutes } from './routes/businessUserRoutes';
import { businessAdminRoutes } from './routes/businessAdminRoutes';
import { userRoutes } from './routes/userRoutes';
import { adminRoutes } from './routes/adminRoutes';
import EventDetail from './components/BusinessEvents/BusinessEventsGrid/BusinessEventDetails';
import AnswerInvitation from './components/InvitationAnswer/InvitationAnswer';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user && (
        <Route path="/" element={<Layout />}>
          <Route path="events" element={<PageableGrid />} />
          <Route path="events/:eventId" element={<EventDetail />} />
          <Route path="answer/:invitationId" element={<AnswerInvitation />} />
        </Route>
      )}
      {user && (
        <>
          {user.role === 'ADMIN' && adminRoutes()}
          {user.role === 'PERSONAL' && userRoutes()}
          {user.role === 'BUSINESS_ADMIN' && businessAdminRoutes()}
          {user.role === 'BUSINESS' && businessUserRoutes()}
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
