import React from 'react';
import { useSelector } from 'react-redux';
import './ChatList.scss';
import ChatItem from './ChatItem';

/* TODO(#24): add make offer button in chat functional */
const ChatList = () => {
  const chatList = useSelector(state => state.chat.chatList);
  return (
    <div>
      {chatList.map(chat => (
        <ChatItem key={chat.chatRoomId} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
