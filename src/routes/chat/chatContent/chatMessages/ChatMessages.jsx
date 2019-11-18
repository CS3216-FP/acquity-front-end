import React, { createRef, useEffect, useRef, useCallback } from 'react';
import { useSticky } from 'react-scroll-to-bottom';
import pluralize from 'pluralize';
import { useDispatch } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import { updateUnreadCount } from 'reducers/ChatDux';
import { displayChatRelativeTime } from 'utils/dateUtils';
import SocketRequestService from 'services/SocketService/socketRequestService';

import Message from './message';
import './ChatMessages.scss';

const ChatMessages = ({
  groupedChats,
  lastReadId,
  unreadCount,
  lastChatId,
  chatRoomId
}) => {
  const newMessageDividerRef = createRef();
  const firstUpdate = useRef(true);
  const dispatch = useDispatch();
  const [isSticky] = useSticky();
  const socket = useSocket();

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

  const handleUpdateUnreadMessage = useCallback(
    isUnmount => {
      if (isSticky && lastChatId) {
        if (isUnmount) {
          dispatch(
            updateUnreadCount({ chatRoomId, newUnreadCount: 0, lastChatId })
          );
        } else {
          dispatch(updateUnreadCount({ chatRoomId, newUnreadCount: 0 }));
        }
        SocketRequestService.updateUnreadMessage({
          chatRoomId,
          lastReadId: lastChatId,
          socket
        });
      }
    },
    [lastChatId, dispatch, updateUnreadCount]
  );

  useEffect(() => {
    // To emulate componentDidUpdate instead of componentDidMount
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleUpdateUnreadMessage();
    }
    // On dismount, we just update regardless
    return () => handleUpdateUnreadMessage(true);
  }, [handleUpdateUnreadMessage]);

  const UnreadMessageDivider = () => {
    return (
      <div
        id="newMessageDivider"
        className="is-divider"
        data-content="Unread messages"
        ref={newMessageDividerRef}
      />
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
      {!lastReadId && <UnreadMessageDivider />}
      {groupedChats.map(groupChat => (
        <div className="chatMessages__group" key={groupChat[0]}>
          {renderNewDateLine(groupChat[0])}
          {groupChat[1].map(message => {
            return (
              <div key={message.id}>
                <Message message={message} />
                {lastReadId === message.id && lastChatId !== message.id && (
                  <UnreadMessageDivider />
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
