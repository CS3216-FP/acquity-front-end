import React from 'react';

import { useUser } from 'contexts/userContext';
import { OFFER_RESPONSE_TYPE, OFFER_TYPE, CHAT_TYPE } from 'constants/socket';
import ChatMessage from './chat';
import ChatOffer from './offer';
import ChatOfferResponse from './offerResponse';

const Message = ({ message }) => {
  const user = useUser();
  const { type } = message;

  const renderMessage = () => {
    switch (type) {
      case CHAT_TYPE:
        return <ChatMessage message={message} />;
      case OFFER_TYPE:
        return <ChatOffer offer={message} />;
      case OFFER_RESPONSE_TYPE:
        return <ChatOfferResponse offer={message} />;
      default:
        throw new Error(`Unable to render invalid message type ${type}`);
    }
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
