import React from 'react';
import { getCurrentPathWithoutParam } from 'utils';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ChatList.scss';
import ChatItem from './ChatItem';

const ChatList = () => {
  const chatList = useSelector(state => state.chat.chatList);
  const { url } = useRouteMatch();
  const basePath = getCurrentPathWithoutParam(url);

  return (
    <ul className="chatlist column is-hidden-mobile is-two-fifths">
      {chatList.map(chat => (
        <ChatItem key={chat.chatRoomId} chat={chat} basePath={basePath} />
      ))}
    </ul>
  );
};

export default ChatList;
