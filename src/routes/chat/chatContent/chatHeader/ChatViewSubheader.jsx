import React, { useEffect } from 'react';

import { CANCEL_OFFER_TYPE } from 'constants/socket';
import { toCurrency } from 'utils/moneyUtils';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { useSocket } from 'contexts/socketContext';

import './ChatViewSubheader.scss';

const ChatViewSubheader = ({
  handleClose,
  latestOffer,
  isUserPendingOffer
}) => {
  const socket = useSocket();
  const { price, numberOfShares, id: offerId, chatRoomId } = latestOffer;

  // In case user opens this subheader but the other user has cancelled it.
  // Prevents crash, close immediately.
  useEffect(() => {
    if (!latestOffer || latestOffer.offerStatus === CANCEL_OFFER_TYPE) {
      handleClose();
    }
  }, [latestOffer, handleClose]);

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId,
      socket,
      chatRoomId
    });
    handleClose();
  };

  const declineOffer = () => {
    SocketRequestService.declineOffer({
      offerId,
      socket,
      chatRoomId
    });
    handleClose();
  };

  const cancelOffer = () => {
    SocketRequestService.cancelOffer({
      offerId,
      socket,
      chatRoomId
    });
    handleClose();
  };

  const renderActions = () => {
    if (isUserPendingOffer) {
      return (
        <button
          onClick={cancelOffer}
          type="button"
          className="button--danger button no-shadow"
        >
          Cancel Offer
        </button>
      );
    }

    return (
      <>
        <button
          onClick={acceptOffer}
          type="button"
          className="button--success button no-shadow"
        >
          Accept
        </button>
        <button
          onClick={declineOffer}
          type="button"
          className="button--danger button no-shadow"
        >
          Reject
        </button>
      </>
    );
  };

  return (
    <div className="chatViewSubheader">
      <div className="chatViewSubheader__header">View current offer:</div>
      <div className="chatViewSubheader__details columns is-multiline is-mobile is-marginless">
        <div className="chatViewSubheader__details__details column">
          <label htmlFor="numberOfShares" className="label">
            Quantity:
          </label>
          <div className="chatViewSubheader__details__details--value">
            {numberOfShares}
          </div>
        </div>
        <div className="chatViewSubheader__details__details column">
          <label htmlFor="numberOfShares" className="label">
            Price:
          </label>
          <div className="chatViewSubheader__details__details--value">
            {toCurrency(price)}
          </div>
        </div>
        <div className="chatViewSubheader__actions column">
          <div className="chatViewSubheader__actions--action">
            {renderActions()}
          </div>
          <div className="chatViewSubheader__actions--cancel">
            <button
              type="button"
              className="as-non-button button chatOfferSubheader__form__button--cancel"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatViewSubheader;
