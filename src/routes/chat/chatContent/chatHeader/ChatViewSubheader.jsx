import React from 'react';
import { useSelector } from 'react-redux';

import { toCurrency } from 'utils/moneyUtils';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { useSocket } from 'contexts/socketContext';

import './ChatViewSubheader.scss';

const ChatViewSubheader = ({ handleClose, latestOffer }) => {
  const socket = useSocket();
  const { price, numberOfShares, id: offerId, chatRoomId } = latestOffer;
  const { userType } = useSelector(state => state.misc);

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId,
      userType,
      socket,
      chatRoomId
    });
  };

  const declineOffer = () => {
    SocketRequestService.declineOffer({
      offerId,
      userType,
      socket,
      chatRoomId
    });
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
          </div>
          <div className="chatViewSubheader__actions--cancel">
            <button
              type="button"
              className="as-non-button button chatOfferSubheader__form__button--cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatViewSubheader;
