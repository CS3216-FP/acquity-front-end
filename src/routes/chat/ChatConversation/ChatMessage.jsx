import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';

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
      <OfferStatus chat={chat} />
    </p>
  );
};

const OfferStatus = ({ chat }) => {
  const { offerStatus } = chat;
  const isDealClose = useSelector(
    state => state.chat.chatConversation.isDealClosed
  );
  if (isDealClose) {
    if (offerStatus === 'ACCEPTED') {
      return <AcceptedOffer />;
    }
    return <div />;
  }
  if (offerStatus === 'REJECTED') {
    return <RejectedOffer />;
  }

  return <PendingOffer chat={chat} />;
};

const PendingOffer = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);
  const socket = useSocket();
  const { chatRoomId } = useParams();

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId: chat.id,
      userType,
      socket,
      chatRoomId
    });
  };

  const declineOffer = () => {
    SocketRequestService.declineOffer({
      offerId: chat.id,
      userType,
      socket,
      chatRoomId
    });
  };
  if (userType === chat.userType) {
    return <div>Pending...</div>;
  }
  return (
    <div className="columns is-gapless is-mobile">
      <button
        type="button"
        className="column button is-success is-outlined"
        onClick={acceptOffer}
      >
        Accept
      </button>
      <button
        type="button"
        className="column button is-danger is-outlined"
        onClick={declineOffer}
      >
        Reject
      </button>
    </div>
  );
};

const AcceptedOffer = () => {
  return <div>This offer has been accepted!</div>;
};

const RejectedOffer = () => {
  return <div>This offer has been rejected.</div>;
};

export default ChatMessage;
