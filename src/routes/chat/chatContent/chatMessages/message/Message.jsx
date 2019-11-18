import React from 'react';

import { useUser } from 'contexts/userContext';
import { OFFER_RESPONSE_TYPE, OFFER_TYPE, CHAT_TYPE } from 'constants/socket';
import ChatMessage from './chat';
import ChatOffer from './offer';

const Message = ({ message }) => {
  const user = useUser();

  const renderMessage = () => {
    if (message.type === CHAT_TYPE) {
      return <ChatMessage message={message} />;
    }
    if (message.type === OFFER_TYPE || message.type === OFFER_RESPONSE_TYPE) {
      return <ChatOffer offer={message} />;
    }

    throw new Error(`Invalid chat type ${message.type}`);
  };

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          message.authorId === user.id ? 'right' : 'left'
        }`}
      >
        {renderMessage()}
      </div>
    </div>
  );
};

export default Message;
