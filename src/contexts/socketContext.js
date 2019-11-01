import React, { useCallback, useEffect } from 'react';

import { fetchChatListAction } from 'reducers/ChatDux';
import {
  socketConnect,
  socketDisconnect
} from 'services/SocketService/socketSetup';
import SocketResponseService from 'services/SocketService/socketResponseService';
import { useDispatch } from 'react-redux';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const dispatch = useDispatch();

  const fetchChatList = useCallback(() => {
    dispatch(fetchChatListAction());
  }, [dispatch]);
  useEffect(() => {
    socketConnect();
    SocketResponseService.initialize();
    fetchChatList();
    return () => {
      socketDisconnect();
    };
  });

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default SocketProvider;
