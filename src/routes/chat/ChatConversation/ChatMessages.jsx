import React, { useEffect, useState, createRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import groupBy from 'lodash/groupBy';

import pluralize from 'pluralize';

import { displayChatRelativeTime, getDate } from 'utils/dateUtils';

import SuccessfulMatchContainer from './SuccessfulMatchContainer';
import ChatMessage from './ChatMessage';
import './ChatMessages.scss';

const ChatMessages = ({ chat }) => {
  const [groupedChats, setGroupedChats] = useState([]);
  const newMessageDividerRef = createRef();

  const { isDealClosed, chats, lastReadId, unreadCount } = chat;

  useEffect(() => {
    setGroupedChats(Object.entries(groupBy(chats, getDate)));
  }, [chats]);

  const scrollToNewMessages = () => {
    if (newMessageDividerRef.current) {
      newMessageDividerRef.current.scrollIntoView({
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
      <ScrollToBottom
        className="chatMessages"
        followButtonClassName="chatMessages__scrollButton"
      >
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
                <div key={message.id}>
                  <ChatMessage message={message} />
                  {lastReadId === message.id && (
                    <div
                      id="newMessageDivider"
                      ref={newMessageDividerRef}
                      className="is-divider"
                      data-content="NEW MESSAGES"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </ScrollToBottom>
      {/* TODO: Add pending state where user has revealed and waiting on other */}
      {isDealClosed && (
        <SuccessfulMatchContainer matchDetails={chat.latestOffer} />
      )}
    </>
  );
};

export default ChatMessages;
