import React, { createRef } from 'react';
import pluralize from 'pluralize';

import { displayChatRelativeTime } from 'utils/dateUtils';

import Message from './message';
import './ChatMessages.scss';

const ChatMessages = ({ groupedChats, lastReadId, unreadCount }) => {
  const newMessageDividerRef = createRef();

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
        <div className="chatMessages__group" key={groupChat[0]}>
          {renderNewDateLine(groupChat[0])}
          {groupChat[1].map(message => {
            return (
              <div key={message.id}>
                <Message message={message} />
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
    </>
  );
};

export default ChatMessages;
