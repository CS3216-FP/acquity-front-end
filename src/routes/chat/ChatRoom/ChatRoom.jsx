import React from 'react';
import { useSelector } from 'react-redux';

import ChatMessage from './ChatMessage';
import './ChatRoom.scss';

const ChatRoom = () => {
  const chatRoom = useSelector(state => state.chat.chatRoom);

  return (
    <div>
      {chatRoom.map(chat => (
        <ChatMessage chat={chat} />
      ))}
    </div>
  );
};

export default ChatRoom;
