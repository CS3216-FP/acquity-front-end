import React from 'react';
import { useSelector } from 'react-redux';

import './ChatMessage.scss';

const ChatMessage = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          userType === chat.userType ? 'right' : 'left'
        }`}
      >
        {chat.type === 'message' ? (
          <Message chat={chat} />
        ) : (
          <Offer chat={chat} />
        )}
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

const Offer = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        Price: {chat.price} Number Of Shares: {chat.numberOfShares}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

export default ChatMessage;
