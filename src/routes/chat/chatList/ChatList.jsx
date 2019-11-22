import React from 'react';
import { getCurrentPathWithoutParam } from 'utils';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ErrorMessage from 'components/errorMessage';
import EmptyMessagesSvg from 'components/svgr/EmptyMessages';

import ChatListItem from './ChatListItem';
import './ChatList.scss';

const ChatList = ({ isShowingChatRoom }) => {
  const isChatError = useSelector(state => state.loading.isChatError);
  const chatList = useSelector(state => {
    return Object.values(state.chat.unarchived).sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
  });

  const { url } = useRouteMatch();
  const basePath = getCurrentPathWithoutParam(url);

  if (isChatError || chatList.length === 0) {
    return (
      <ul
        className={`chatrooms chatrooms__empty column ${
          isShowingChatRoom ? 'is-hidden-mobile' : 'is-full-mobile'
        } is-two-fifths-tablet`}
      >
        {isChatError && (
          <ErrorMessage message="Failed to retrieve chats. Please refresh the page to try again." />
        )}
        <div className="chatrooms__empty--empty">
          <EmptyMessagesSvg />
          <div className="chatrooms__empty--emptyText">No chats yet</div>
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
