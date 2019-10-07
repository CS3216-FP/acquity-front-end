import React from 'react';
import { useAuth } from 'contexts/authContext';

const UserContext = React.createContext();

const UserProvider = props => {
  const { data } = useAuth();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <UserContext.Provider value={data} {...props} />;
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

export { UserProvider, useUser };
