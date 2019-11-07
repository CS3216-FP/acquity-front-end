import React from 'react';

import { useUser } from 'contexts/userContext';
import './ChatMessage.scss';

const ChatMessage = ({ chat }) => {
  const user = useUser();
  const timeString = new Date(chat.createdAt * 1000).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          user.id === chat.authorId ? 'right' : 'left'
        }`}
      >
        <p className="chatMessage__bubble__message">
          <span className="chatMessage__bubble__message--message">
            {chat.message}
          </span>
          <span className="chatMessage__bubble__message--timestamp">
            {timeString}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
