import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';

import SocketRequestService from 'services/SocketService/socketRequestService';
import SocketResponseService from 'services/SocketService/socketResponseService';
import ApiService from 'services/apiService';
import { setChats } from 'reducers/ChatDux';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const dispatch = useDispatch();
  const socket = socketIOClient(`${process.env.REACT_APP_BACKEND_API}chat`);
  const userType = useSelector(rootState => rootState.misc.userType);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ApiService.get('chats', {
        params: { type: userType }
      });
      dispatch(setChats(response.data));
    };

    fetchData();
    SocketRequestService.initialize(socket);
    SocketResponseService.initialize(socket);

    return () => socket.disconnect();
  }, [socket, dispatch, userType]);

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
