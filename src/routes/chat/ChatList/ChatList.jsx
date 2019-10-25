import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchChatListAction } from '../ChatDux';
import './ChatList.scss';
import ChatItem from './ChatItem';

const ChatList = () => {
  const chatList = useSelector(state => state.chat.chatList);

  const dispatch = useDispatch();

  const fetchChatList = useCallback(() => {
    dispatch(fetchChatListAction());
  }, [dispatch]);
  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  return (
    <div>
      {chatList.map(chat => (
        <ChatItem chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
