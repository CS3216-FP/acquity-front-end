import React from 'react';
import { getCurrentPathWithoutParam } from 'utils';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ChatRooms.scss';
import ChatRoom from './ChatRoom';

const ChatRooms = () => {
  const chatRooms = useSelector(state => state.chat.chatRooms);
  const { url } = useRouteMatch();
  const basePath = getCurrentPathWithoutParam(url);

  return (
    <ul className="chatrooms column is-hidden-mobile is-two-fifths">
      {chatRooms.map(chat => (
        <ChatRoom key={chat.chatRoomId} chat={chat} basePath={basePath} />
      ))}
    </ul>
  );
};

export default ChatRooms;
