import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import groupBy from 'lodash/groupBy';

import { getDate } from 'utils/dateUtils';

import './ChatMessages.scss';
import ChatMessages from './ChatMessages';

// This container is required since we want to use ScrollToBottom hooks inside
// ChatMessages
const ChatMessagesContainer = ({ chat }) => {
  const [groupedChats, setGroupedChats] = useState([]);
  const { chats, lastReadId, unreadCount } = chat;

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
      />
    </ScrollToBottom>
  );
};

export default ChatMessagesContainer;
