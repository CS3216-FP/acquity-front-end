import React, { useState } from 'react';
import { toCurrency } from 'utils/moneyUtils';
import { SELLER, BUYER } from 'constants/user';
import { PENDING_OFFER_TYPE } from 'constants/socket';
import { useUser } from 'contexts/userContext';

import ChatOfferSubheader from './ChatOfferSubheader';
import RevealIdentitySubheader from './RevealIdentitySubheader';
import './ChatHeader.scss';
import DisbandedSubheader from './DisbandedSubheader';
import ChatViewSubheader from './ChatViewSubheader';

const ChatOfferDetails = ({ headerText, quantity, price }) => {
  return (
    <div className="chat__header__details column counterpartDetails">
      <div className="chat__header__details__header">{headerText}</div>
      <div className="chat__header__details__details columns is-marginless">
        <div className="column is-paddingless details">
          <span className="details__label">Quantity:</span>
          <span className="details__value">{quantity}</span>
        </div>
        <div className="column is-paddingless details">
          <span className="details__label">Price:</span>
          <span className="details__value">{price}</span>
        </div>
      </div>
    </div>
  );
};

const ChatHeader = ({ chat }) => {
  const {
    isDealClosed,
    buyOrder,
    sellOrder,
    isDisbanded,
    id,
    isRevealed,
    latestOffer
  } = chat;
  const user = useUser();
  const [isShowEditOfferSubheader, setIsShowEditOfferSubheader] = useState(
    false
  );
  const [isShowViewOfferSubheader, setIsShowViewOfferSubheader] = useState(
    false
  );

  const hasPendingOffer =
    latestOffer && latestOffer.offerStatus === PENDING_OFFER_TYPE;
  const isUserPendingOffer =
    hasPendingOffer && latestOffer.authorId === user.id;
  const isUserBuyer = chat.buyerId === user.id;

  const handleOpenOfferSubheader = () => {
    if (hasPendingOffer && !isUserPendingOffer) {
      setIsShowViewOfferSubheader(true);
    } else {
      setIsShowEditOfferSubheader(true);
    }
  };

  const handleCloseOfferSubheader = () => {
    if (hasPendingOffer && !isUserPendingOffer) {
      setIsShowViewOfferSubheader(false);
    } else {
      setIsShowEditOfferSubheader(false);
    }
  };

  const renderOfferButtonText = () => {
    if (hasPendingOffer) {
      if (isUserPendingOffer) return 'Edit Offer';
      return 'View Offer';
    }
    return 'Make Offer';
  };

  const renderSubheader = () => {
    if (isDisbanded) {
      return <DisbandedSubheader />;
    }
    if (isDealClosed) {
      return (
        <RevealIdentitySubheader chatRoomId={id} isRevealed={isRevealed} />
      );
    }
    if (isShowEditOfferSubheader) {
      return <ChatOfferSubheader handleClose={handleCloseOfferSubheader} />;
    }
    if (isShowViewOfferSubheader) {
      return (
        <ChatViewSubheader
          handleClose={handleCloseOfferSubheader}
          latestOffer={latestOffer}
        />
      );
    }
    return (
      <div className="chat__header__actions columns is-gapless is-mobile">
        <button
          type="button"
          className="column button is-success is-outlined"
          onClick={handleOpenOfferSubheader}
        >
          {renderOfferButtonText()}
        </button>
        <button type="button" className="column button is-danger is-outlined">
          Cancel Match
        </button>
      </div>
    );
  };

  const renderChatOfferDetails = () => {
    const userOrderDetails = isUserBuyer ? buyOrder : sellOrder;
    const otherOrderDetails = isUserBuyer ? sellOrder : buyOrder;
    const userOrderDetailsHeaderText = isUserBuyer ? 'Your Bid' : 'Your Ask';
    const otherOrderDetailsHeaderText = isUserBuyer
      ? `${SELLER} Offer`
      : `${BUYER} Offer`;

    return (
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText={otherOrderDetailsHeaderText}
          quantity={otherOrderDetails.numberOfShares}
          price={toCurrency(otherOrderDetails.price)}
        />
        <ChatOfferDetails
          headerText={userOrderDetailsHeaderText}
          quantity={userOrderDetails.numberOfShares}
          price={toCurrency(userOrderDetails.price)}
        />
      </div>
    );
  };

  return (
    <div className="chat__header column is-paddingless">
      <div className="chat__header__details--mobile">{chat.friendlyName}</div>
      {renderChatOfferDetails()}
      {renderSubheader()}
    </div>
  );
};

export default ChatHeader;
