import React, { createRef, useEffect, useCallback, useRef } from 'react';
import { pure } from 'recompose';
import { useSticky } from 'react-scroll-to-bottom';
import pluralize from 'pluralize';
import { useDispatch } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import { clearUnreadCount } from 'reducers/ChatDux';
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
  const lastReadChatId = useRef(lastReadId);
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

  const handleUpdateUnreadMessage = useCallback(() => {
    dispatch(clearUnreadCount({ chatRoomId }));
    SocketRequestService.updateUnreadMessage({
      chatRoomId,
      lastReadId: lastReadChatId.current,
      socket
    });
  }, [chatRoomId, socket, dispatch]);

  useEffect(() => {
    if (isSticky) {
      lastReadChatId.current = lastChatId;
      dispatch(clearUnreadCount({ chatRoomId }));
    }
  }, [isSticky, lastChatId, lastReadChatId, dispatch, chatRoomId]);

  useEffect(() => {
    // On dismount, we just update regardless
    return () => {
      handleUpdateUnreadMessage();
    };
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
    <div>
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
      {!lastReadId && !groupedChats && <UnreadMessageDivider />}
      {groupedChats.map(groupChat => (
        <div className="chatMessages__group" key={groupChat[0]}>
          {renderNewDateLine(groupChat[0])}
          {groupChat[1].map(message => {
            return (
              <div key={message.id}>
                {lastReadId === message.id && lastChatId !== message.id && (
                  <UnreadMessageDivider />
                )}
                <Message message={message} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

ChatMessages.whyDidYouRender = true;

export default pure(ChatMessages);
