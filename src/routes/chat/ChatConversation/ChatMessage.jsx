import React from 'react';

import { useUser } from 'contexts/userContext';
import { OFFER_RESPONSE_TYPE, OFFER_TYPE, CHAT_TYPE } from 'constants/socket';
import { getTimeFromTimestamp } from 'utils';

import ChatOffer from './ChatOffer';
import './ChatMessage.scss';

const renderMessage = message => {
  if (message.type === CHAT_TYPE) {
    return <Message message={message} />;
  }
  if (message.type === OFFER_TYPE || message.type === OFFER_RESPONSE_TYPE) {
    return <ChatOffer offer={message} />;
  }

  throw new Error(`Invalid chat type ${message.type}`);
};

const ChatMessage = ({ message }) => {
  const user = useUser();

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          message.authorId === user.id ? 'right' : 'left'
        }`}
      >
        {renderMessage(message)}
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  const timeString = getTimeFromTimestamp(message.createdAt);

  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        {message.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

export default ChatMessage;
