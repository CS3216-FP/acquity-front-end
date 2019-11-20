import React from 'react';

import { getTimeFromTimestamp } from 'utils';
import { useUser } from 'contexts/userContext';
import { toCurrency } from 'utils/moneyUtils';
import {
  ACCEPT_OFFER_TYPE,
  REJECT_OFFER_TYPE,
  CANCEL_OFFER_TYPE
} from 'constants/socket';

import '../offer/OfferMessage.scss';
import './OfferResponseMessage.scss';

const OfferMessage = ({ offer }) => {
  const user = useUser();
  const isSentByUser = offer.authorId === user.id;
  const timeString = getTimeFromTimestamp(offer.createdAt);
  const { offerStatus } = offer;

  const renderResponseMessageHeader = () => {
    switch (offerStatus) {
      case ACCEPT_OFFER_TYPE:
        return 'Accepted the offer:';
      case REJECT_OFFER_TYPE:
        return 'Rejected the offer:';
      case CANCEL_OFFER_TYPE:
        return 'Canceled the offer:';
      default:
        throw new Error(`Invalid offerResponse offer status ${offerStatus}`);
    }
  };

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          isSentByUser ? 'right' : 'left'
        }`}
      >
        <div className={`offerMessage offerResponseMessage--${offerStatus}`}>
          <div
            className={`offerMessage__header offerMessage__header--${
              isSentByUser ? 'right' : 'left'
            }`}
          >
            {renderResponseMessageHeader()}
          </div>
          <div className="offerMessage__bubble__message">
            <div className="offerMessage__bubble__message--title">Offer</div>
            <div className="offerMessage__bubble__message--quantity">
              Qty: {offer.numberOfShares}
            </div>
            <div className="offerMessage__bubble__message--price">
              Price: {toCurrency(offer.price)}
            </div>
            <div className="offerMessage__bubble__message--cost">
              Est. Total: {toCurrency(offer.price * offer.numberOfShares)}
            </div>
            <span className="offerMessage__bubble__message--timestamp">
              {timeString}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferMessage;
