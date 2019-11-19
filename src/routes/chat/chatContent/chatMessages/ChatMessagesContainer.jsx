import React, { useEffect, useState } from 'react';
import { pure } from 'recompose';
import ScrollToBottom from 'react-scroll-to-bottom';
import groupBy from 'lodash/groupBy';

import { getDate } from 'utils/dateUtils';

import './ChatMessages.scss';
import ChatMessages from './ChatMessages';

// This container is required since we want to use ScrollToBottom hooks inside
// ChatMessages
const ChatMessagesContainer = ({ chat }) => {
  const { chats, lastReadId, unreadCount, id } = chat;
  const [groupedChats, setGroupedChats] = useState([]);
  const lastChatId =
    chats && chats.length > 0 ? chats[chats.length - 1].id : null;

  useEffect(() => {
    setGroupedChats(Object.entries(groupBy(chats, getDate)));
  }, [chats]);

  return (
    <ScrollToBottom
      className="chatMessages"
      followButtonClassName="chatMessages__scrollButton"
    >
      <ChatMessages
        groupedChats={groupedChats}
        lastReadId={lastReadId}
        unreadCount={unreadCount}
        lastChatId={lastChatId}
        chatRoomId={id}
      />
    </ScrollToBottom>
  );
};

ChatMessagesContainer.whyDidYouRender = true;

export default pure(ChatMessagesContainer);
