import React from 'react';
import {
  socketConnect,
  socketDisconnect
} from 'services/SocketService/socketSetup';
import SocketResponseService from 'services/SocketService/socketResponseService';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const openChatSocket = () => {
    socketConnect();
    SocketResponseService.initialize();
  };

  const closeChatSocket = () => {
    socketDisconnect();
  };

  return (
    <SocketContext.Provider
      value={{ openChatSocket, closeChatSocket }}
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
