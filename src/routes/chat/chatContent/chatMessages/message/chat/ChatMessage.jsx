import React from 'react';

import { getTimeFromTimestamp } from 'utils';

import './ChatMessage.scss';

const ChatMessage = ({ message }) => {
  const timeString = getTimeFromTimestamp(message.createdAt);

  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message is-text-wrap">
        {message.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

export default ChatMessage;
