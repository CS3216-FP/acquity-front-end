import React from 'react';
import { getCurrentPathWithoutParam } from 'utils';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EmptyMessagesSvg from 'components/svgr/EmptyMessages';

import ChatListItem from './ChatListItem';
import './ChatList.scss';

const ChatList = ({ isShowingChatRoom }) => {
  const chatList = useSelector(state => {
    return Object.values(state.chat.unarchived).sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
  });

  const { url } = useRouteMatch();
  const basePath = getCurrentPathWithoutParam(url);

  if (chatList.length === 0) {
    return (
      <ul
        className={`chatrooms column ${
          isShowingChatRoom ? 'is-hidden-mobile' : 'is-full-mobile'
        } is-two-fifths-tablet`}
      >
        <div className="chatrooms--empty">
          <EmptyMessagesSvg />
          <div className="chatrooms--empty__text">No chats yet</div>
        </div>
      </ul>
    );
  }

  return (
    <ul
      className={`chatrooms column ${
        isShowingChatRoom ? 'is-hidden-mobile' : 'is-full-mobile'
      } is-two-fifths-tablet`}
    >
      {chatList.map(chat => (
        <ChatListItem key={chat.id} chat={chat} basePath={basePath} />
      ))}
    </ul>
  );
};

export default ChatList;
