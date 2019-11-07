import React from 'react';
import { AuthProvider } from './authContext';
import { UserProvider } from './userContext';
import { SocketProvider } from './socketContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <SocketProvider>{children}</SocketProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
