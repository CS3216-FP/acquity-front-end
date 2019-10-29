import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';

import ChatMessage from './ChatMessage';
import './ChatRoom.scss';

const ChatRoom = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [prevMessageLength, setPrevMessageLength] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  // ref to message container (for keeping scroll to bottom of chat)
  let chatMessagesBottomRef = document.getElementById('chatMessages--bottom');
  let chatMessagesRef = document.getElementById('messagesContainer');
  let newMessageDividerRef = document.getElementById('newMessageDivider');

  const chatMessages = useSelector(state => state.chat.chatRoom);

  const handleScroll = useCallback(
    event => {
      const node = event.target;
      const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
      setIsBottom(bottom);
      if (bottom) {
        setPrevMessageLength(chatMessages.length);
        setUnreadCount(0);
      }
    },
    [chatMessages.length]
  );

  const setChatMessagesRef = node => {
    if (node) {
      node.addEventListener('scroll', handleScroll);
      chatMessagesRef = node;
    }
  };

  const scrollToNewMessages = () => {
    if (newMessageDividerRef) {
      newMessageDividerRef.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  // Scroll to bottom of container if at bottom of screen
  useEffect(() => {
    if (chatMessagesBottomRef && chatMessagesRef) {
      if (isBottom || prevMessageLength === 0) {
        chatMessagesBottomRef.scrollIntoView({
          block: 'end'
        });
        setPrevMessageLength(chatMessages.length);
      } else {
        setUnreadCount(chatMessages.length - prevMessageLength);
      }
    }

    return () => {
      chatMessagesRef.removeEventListener('scroll', handleScroll);
    };
  }, [
    chatMessages,
    chatMessagesBottomRef,
    chatMessagesRef,
    isBottom,
    prevMessageLength,
    handleScroll
  ]);

  return (
    <div ref={setChatMessagesRef} id="chatMessages" className="chatMessages">
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
      {chatMessages.map((message, index) => {
        return (
          <div key={message.createdAt}>
            {/* TODO: Next time when each message has properties like firstUnreadMessage, can use that to demarcate the new message boundary, and scroll to this instead of the bottom on first load */}
            {index === prevMessageLength && (
              <div
                id="newMessageDivider"
                ref={element => {
                  newMessageDividerRef = element;
                }}
                className="is-divider"
                data-content="NEW MESSAGES"
              />
            )}
            <ChatMessage chat={message} />
          </div>
        );
      })}
      {/* For scrolling to bottom */}
      <div
        ref={element => {
          chatMessagesBottomRef = element;
        }}
        id="chatMessages--bottom"
      />
    </div>
  );
};

export default ChatRoom;
