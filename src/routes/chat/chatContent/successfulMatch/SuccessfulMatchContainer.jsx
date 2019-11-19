import React from 'react';

import { toCurrency } from 'utils/moneyUtils';
import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';

import RevealIdentityDisclaimer from './RevealIdentityDisclaimer';

import './SuccessfulMatchContainer.scss';

const SuccessfulMatchContainer = ({ chat }) => {
  const socket = useSocket();
  const { price, numberOfShares } = chat.latestOffer;

  const handleRevealIdentity = () => {
    SocketRequestService.revealIdentity({ chatRoomId: chat.id, socket });
  };

  return (
    <div className="successfulMatch">
      <div className="successfulMatch__details">
        <div className="successfulMatch__details--text">Final details</div>
        <div className="successfulMatch__details__details columns is-mobile is-marginless">
          <div className="column">
            Quantity:
            <span className="successfulMatch__details__details--value">
              {numberOfShares}
            </span>
          </div>
          <div className="column">
            Price:
            <span className="successfulMatch__details__details--value">
              {toCurrency(price)}
            </span>
          </div>
        </div>
      </div>
      <div className="successfulMatch__header">
        Congratulations on the successful match!
      </div>
      <div className="successfulMatch__content">
        <div className="successfulMatch__content--text">
          To continue this transaction offline, you will need to:
        </div>
        <button
          onClick={handleRevealIdentity}
          className="successfulMatch__button"
          type="button"
        >
          Reveal My Identity
        </button>
        <RevealIdentityDisclaimer />
      </div>
    </div>
  );
};

export default SuccessfulMatchContainer;
