import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';

import { useUser } from 'contexts/userContext';
import SocketRequestService from 'services/SocketService/socketRequestService';
import SocketResponseService from 'services/SocketService/socketResponseService';
import ApiService from 'services/apiService';
import { setChats } from 'reducers/ChatDux';
import {
  setChatSocketConnected,
  setChatLoaded,
  setChatError,
  setChatSocketError
} from 'reducers/LoadingDux';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const user = useUser();
  const dispatch = useDispatch();
  const socket = socketIOClient.connect(
    `${process.env.REACT_APP_BACKEND_API}chat`,
    {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    }
  );
  const userType = useSelector(rootState => rootState.misc.userType);

  useEffect(() => {
    let hasFetchedData = false;
    const fetchData = async () => {
      try {
        const response = await ApiService.get('chats', {
          params: { type: userType }
        });
        hasFetchedData = true;
        dispatch(setChats(response.data));
        dispatch(setChatLoaded());
      } catch (error) {
        dispatch(setChatError());
      }
    };

    // Don't even connect to socket or fetch any chats since user cannot have any chats anyways
    if (user.canBuy === 'YES' || user.canSell === 'YES') {
      socket.on('connect', () => {
        if (!hasFetchedData) {
          fetchData();
        }
        dispatch(setChatSocketConnected());
        SocketRequestService.initialize(socket);
        SocketResponseService.initialize(socket);
      });

      socket.on('connect_error', () => {
        dispatch(setChatSocketError());
      });
    } else {
      dispatch(setChatLoaded());
    }

    return () => socket.disconnect();
  }, [socket, dispatch, userType, user]);

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
