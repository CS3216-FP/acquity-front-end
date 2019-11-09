import React from 'react';
import { useSelector } from 'react-redux';

import './ChatMessage.scss';

const ChatOffer = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          userType === chat.userType ? 'right' : 'left'
        }`}
      >
        <p className="chatMessage__bubble__message">
          <span className="chatMessage__bubble__message--message">
            Price: {chat.price} Number Of Shares: {chat.numberOfShares}
          </span>
          <span className="chatMessage__bubble__message--timestamp">
            {timeString}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatOffer;
