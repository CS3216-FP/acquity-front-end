import React from 'react';
import { useSelector } from 'react-redux';
import './ChatList.scss';
import ChatItem from './ChatItem';

const ChatList = () => {
  const chatList = useSelector(state => state.chat.chatList);
  return (
    <div>
      {chatList.map(chat => (
        <ChatItem chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
