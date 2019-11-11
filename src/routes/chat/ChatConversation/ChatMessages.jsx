import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import pluralize from 'pluralize';

import SocketRequestService from 'services/SocketService/socketRequestService';
import { useSocket } from 'contexts/socketContext';

import SuccessfulMatchContainer from './SuccessfulMatchContainer';
import ChatMessage from './ChatMessage';
import './ChatMessages.scss';

const ChatMessages = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [prevMessageLength, setPrevMessageLength] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  // ref to message container (for keeping scroll to bottom of chat)
  let chatMessagesBottomRef = document.getElementById('chatMessages--bottom');
  let chatMessagesRef = document.getElementById('messagesContainer');
  let newMessageDividerRef = document.getElementById('newMessageDivider');

  const { isDealClosed } = useSelector(state => state.chat.chatConversation);
  const chatMessages = useSelector(
    state => state.chat.chatConversation.conversation
  );

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

  const { chatRoomId } = useParams();
  const socket = useSocket();

  const userType = useSelector(state => state.misc.userType);
  useEffect(() => {
    SocketRequestService.getChatConversation({ chatRoomId, socket, userType });
  }, [chatRoomId, socket, userType]);

  return (
    <>
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
      {/* TODO: Add pending state where user has revealed and waiting on other */}
      {isDealClosed && <SuccessfulMatchContainer />}
    </>
  );
};

export default ChatMessages;
