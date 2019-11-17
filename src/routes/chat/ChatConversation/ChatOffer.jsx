import React from 'react';
import { useSelector } from 'react-redux';

import { getTimeFromTimestamp } from 'utils';
import { useSocket } from 'contexts/socketContext';
import { useUser } from 'contexts/userContext';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { toSgdCurrency } from 'utils/moneyUtils';

import './ChatMessage.scss';
import './ChatOffer.scss';

const renderOfferStatus = ({ offer, isSentByUser, userType }) => {
  const { offerStatus } = offer;

  if (offerStatus === 'ACCEPTED') {
    return <AcceptedOffer isSentByUser={isSentByUser} />;
  }
  if (offerStatus === 'REJECTED') {
    return <RejectedOffer isSentByUser={isSentByUser} />;
  }

  return (
    <PendingOffer
      offer={offer}
      isSentByUser={isSentByUser}
      userType={userType}
    />
  );
};

const PendingOffer = ({ offer, isSentByUser, userType }) => {
  const socket = useSocket();
  const { id, chatRoomId } = offer;

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId: id,
      userType,
      socket,
      chatRoomId
    });
  };

  const declineOffer = () => {
    SocketRequestService.declineOffer({
      offerId: id,
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
        onClick={declineOffer}
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

const ChatOffer = ({ offer }) => {
  const user = useUser();
  const { userType } = useSelector(state => state.misc);
  const isSentByUser = offer.authorId === user.id;
  const timeString = getTimeFromTimestamp(offer.createdAt);

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          isSentByUser ? 'right' : 'left'
        }`}
      >
        <div className="offerMessage">
          <div
            className={`offerMessage__header offerMessage__header--${
              isSentByUser ? 'right' : 'left'
            }`}
          >
            Made an offer:
          </div>
          <div className="offerMessage__bubble__message">
            <div className="offerMessage__bubble__message--title">Offer</div>
            <div className="offerMessage__bubble__message--quantity">
              Qty: {offer.numberOfShares}
            </div>
            <div className="offerMessage__bubble__message--price">
              Price: {toSgdCurrency(offer.price)}
            </div>
            <div className="offerMessage__bubble__message--cost">
              Est. Total: {toSgdCurrency(offer.price * offer.numberOfShares)}
            </div>
            <span className="offerMessage__bubble__message--timestamp">
              {timeString}
            </span>
          </div>
          {renderOfferStatus({ offer, isSentByUser, userType })}
        </div>
      </div>
    </div>
  );
};

export default ChatOffer;
