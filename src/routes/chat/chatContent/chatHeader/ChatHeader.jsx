import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import { useUser } from 'contexts/userContext';
import { PENDING_OFFER_TYPE } from 'constants/socket';
import { SELLER, BUYER } from 'constants/user';
import socketRequestService from 'services/SocketService/socketRequestService';
import { toCurrency } from 'utils/moneyUtils';

import ChatOfferSubheader from './ChatOfferSubheader';
import RevealIdentitySubheader from './RevealIdentitySubheader';
import './ChatHeader.scss';
import DisbandedSubheader from './DisbandedSubheader';
import ChatViewSubheader from './ChatViewSubheader';
import CancelMatchModal from './cancelMatchModel';

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
    disbandInfo,
    id,
    isRevealed,
    latestOffer,
    identities
  } = chat;
  const socket = useSocket();
  const user = useUser();
  const isUserBuyer = useSelector(state => state.misc.userType === BUYER);
  const [isShowOfferSubheader, setIsShowOfferSubheader] = useState(false);
  const [isShowViewOfferSubheader, setIsShowViewOfferSubheader] = useState(
    false
  );
  const [isShowCancelMatchModal, setIsShowCancelMatchModal] = useState(false);

  const hasPendingOffer =
    latestOffer && latestOffer.offerStatus === PENDING_OFFER_TYPE;
  const isUserPendingOffer =
    hasPendingOffer && latestOffer.authorId === user.id;

  const handleOpenOfferSubheader = () => {
    if (hasPendingOffer) {
      setIsShowViewOfferSubheader(true);
    } else {
      setIsShowOfferSubheader(true);
    }
  };

  const handleCloseOfferSubheader = () => {
    // We set both to false because the states may change due to change in latestOffer
    setIsShowViewOfferSubheader(false);
    setIsShowOfferSubheader(false);
  };

  const handleOpenCancelMatchModal = () => {
    setIsShowCancelMatchModal(true);
  };

  const handleCloseCancelMatchModal = () => {
    setIsShowCancelMatchModal(false);
  };

  const handleDisbandClick = () => {
    socketRequestService.disbandChatRoom({ chatRoomId: id, socket });
    setIsShowCancelMatchModal(false);
  };

  const renderOfferButtonText = () => {
    if (hasPendingOffer) {
      return 'View Current Offer';
    }
    return 'Make Offer';
  };

  const renderSubheader = () => {
    if (disbandInfo) {
      return <DisbandedSubheader />;
    }
    if (isDealClosed) {
      return (
        <RevealIdentitySubheader
          chatRoomId={id}
          isUserRevealed={isRevealed}
          isBothRevealed={!!identities}
        />
      );
    }
    if (isShowOfferSubheader) {
      return <ChatOfferSubheader handleClose={handleCloseOfferSubheader} />;
    }
    if (isShowViewOfferSubheader) {
      return (
        <ChatViewSubheader
          handleClose={handleCloseOfferSubheader}
          latestOffer={latestOffer}
          isUserPendingOffer={isUserPendingOffer}
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
        <button
          onClick={handleOpenCancelMatchModal}
          type="button"
          className="column button is-danger is-outlined"
        >
          Cancel Match
        </button>
        <CancelMatchModal
          isModalOpen={isShowCancelMatchModal}
          handleCloseModal={handleCloseCancelMatchModal}
          handleConfirm={handleDisbandClick}
        />
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
        {otherOrderDetails && (
          <ChatOfferDetails
            headerText={otherOrderDetailsHeaderText}
            quantity={otherOrderDetails.numberOfShares}
            price={toCurrency(otherOrderDetails.price)}
          />
        )}
        {userOrderDetails && (
          <ChatOfferDetails
            headerText={userOrderDetailsHeaderText}
            quantity={userOrderDetails.numberOfShares}
            price={toCurrency(userOrderDetails.price)}
          />
        )}
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
