import React, { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import groupBy from 'lodash/groupBy';

import pluralize from 'pluralize';

import { displayChatRelativeTime, getDate } from 'utils/dateUtils';

import SuccessfulMatchContainer from './SuccessfulMatchContainer';
import ChatMessage from './ChatMessage';
import './ChatMessages.scss';

const ChatMessages = ({ chat }) => {
  const [groupedChats, setGroupedChats] = useState([]);
  let newMessageDividerRef = document.getElementById('newMessageDivider');

  const { isDealClosed, chats, lastReadMessageId, unreadCount } = chat;

  useEffect(() => {
    setGroupedChats(Object.entries(groupBy(chats, getDate)));
  }, [chats]);

  const scrollToNewMessages = () => {
    if (newMessageDividerRef) {
      newMessageDividerRef.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  const renderNewDateLine = date => {
    return (
      <div className="chatMessages__dateline">
        <span className="chatMessages__dateline--value">
          {displayChatRelativeTime(date)}
        </span>
      </div>
    );
  };

  return (
    <>
      <ScrollableFeed>
        <div id="chatMessages" className="chatMessages">
          {unreadCount > 0 && (
            <button
              type="button"
              className="chatMessages__unread"
              onClick={scrollToNewMessages}
            >
              <span className="chatMessages__unread--count">
                {pluralize('New Message', unreadCount, true)}
              </span>
              <span>Scroll To Unread</span>
            </button>
          )}
          {groupedChats.map(groupChat => (
            <div key={groupChat[0]}>
              {renderNewDateLine(groupChat[0])}
              {groupChat[1].map(message => {
                return (
                  <div key={message.createdAt}>
                    {/* TODO: Next time when each message has properties like firstUnreadMessage, can use that to demarcate the new message boundary, and scroll to this instead of the bottom on first load */}
                    {lastReadMessageId === message.id && (
                      <div
                        id="newMessageDivider"
                        ref={element => {
                          newMessageDividerRef = element;
                        }}
                        className="is-divider"
                        data-content="NEW MESSAGES"
                      />
                    )}
                    <ChatMessage message={message} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollableFeed>
      {/* TODO: Add pending state where user has revealed and waiting on other */}
      {isDealClosed && <SuccessfulMatchContainer />}
    </>
  );
};

export default ChatMessages;
