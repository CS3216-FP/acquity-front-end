import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { toSgdCurrency } from 'utils/moneyUtils';

import './ChatMessage.scss';
import './ChatOffer.scss';

const renderOfferStatus = ({ chat, isSentByUser, userType }) => {
  const { offerStatus } = chat;

  if (offerStatus === 'ACCEPTED') {
    return <AcceptedOffer isSentByUser={isSentByUser} />;
  }
  if (offerStatus === 'REJECTED') {
    return <RejectedOffer isSentByUser={isSentByUser} />;
  }

  return (
    <PendingOffer chat={chat} isSentByUser={isSentByUser} userType={userType} />
  );
};

const PendingOffer = ({ chat, isSentByUser, userType }) => {
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
  if (isSentByUser) {
    return (
      <div className="offerMessage__status offerMessage__status--pending">
        Offer pending
      </div>
    );
  }
  return (
    <div className="offerMessage__status__pendingActions">
      <button
        type="button"
        className="button--success offerMessage__status__pendingActions--accept no-shadow hvr-grow"
        onClick={acceptOffer}
      >
        Accept
      </button>
      <button
        type="button"
        className="button--danger offerMessage__status__pendingActions--reject no-shadow hvr-grow"
      >
        Reject
      </button>
    </div>
  );
};

const AcceptedOffer = ({ isSentByUser }) => {
  return (
    <div className="offerMessage__status offerMessage__status--accepted">
      {isSentByUser
        ? 'This offer has been accepted'
        : 'You accepted this offer'}
    </div>
  );
};

const RejectedOffer = ({ isSentByUser }) => {
  return (
    <div className="offerMessage__status offerMessage__status--rejected">
      {isSentByUser
        ? 'This offer has been rejected'
        : 'You rejected this offer'}
    </div>
  );
};

const ChatOffer = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);
  const isSentByUser = userType === chat.userType;
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
        <div className="offerMessage">
          <div
            className={`offerMessage__header offerMessage__header--${
              userType === chat.userType ? 'right' : 'left'
            }`}
          >
            Made an offer:
          </div>
          <div className="offerMessage__bubble__message">
            <div className="offerMessage__bubble__message--title">Offer</div>
            <div className="offerMessage__bubble__message--quantity">
              Qty: {chat.numberOfShares}
            </div>
            <div className="offerMessage__bubble__message--price">
              Price: {toSgdCurrency(chat.price)}
            </div>
            <div className="offerMessage__bubble__message--cost">
              Est. Total: {toSgdCurrency(chat.price * chat.numberOfShares)}
            </div>
            <span className="offerMessage__bubble__message--timestamp">
              {timeString}
            </span>
          </div>
          {renderOfferStatus({ chat, isSentByUser, userType })}
        </div>
      </div>
    </div>
  );
};

export default ChatOffer;
