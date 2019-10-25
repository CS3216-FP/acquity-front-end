import React, { useCallback, useEffect } from 'react';
import {
  socketConnect,
  socketDisconnect
} from 'services/SocketService/socketSetup';
import SocketResponseService from 'services/SocketService/socketResponseService';
import { useDispatch } from 'react-redux';
import { fetchChatListAction } from 'routes/chat/ChatDux';

const SocketContext = React.createContext();

const SocketProvider = props => {
  const dispatch = useDispatch();

  const fetchChatList = useCallback(() => {
    dispatch(fetchChatListAction());
  }, []);
  useEffect(() => {
    socketConnect();
    SocketResponseService.initialize();
    fetchChatList();
    return () => {
      socketDisconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

export default SocketProvider;
