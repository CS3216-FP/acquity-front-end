import React from 'react';
import { useSelector } from 'react-redux';

import ChatOffer from './ChatOffer';
import './ChatMessage.scss';

const renderMessage = chat => {
  if (chat.type === 'message') {
    return <Message chat={chat} />;
  }
  if (chat.type === 'offer') {
    return <ChatOffer chat={chat} />;
  }

  throw new Error(`Invalid chat type ${chat.type}`);
};

const ChatMessage = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          userType === chat.userType ? 'right' : 'left'
        }`}
      >
        {renderMessage(chat)}
      </div>
    </div>
  );
};

const Message = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        {chat.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

export default ChatMessage;
