import React, { useEffect } from 'react';
import io from 'socket.io-client';

import SocketResponseService from 'services/SocketService/socketResponseService';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const socket = io(`${process.env.REACT_APP_BACKEND_API}chat`);

  useEffect(() => {
    SocketResponseService.initialize(socket);

    return () => socket.disconnect();
  }, [socket]);

  return (
    <SocketContext.Provider
      value={socket}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error(`useSocket must be used within a SocketProvider`);
  }
  return context;
};

export { SocketProvider, useSocket };
