import React from 'react';
import { useSelector } from 'react-redux';

import { toSgdCurrency } from 'utils/moneyUtils';
import RevealIdentityDisclaimer from './RevealIdentityDisclaimer';
import './SuccessfulMatchContainer.scss';

const SuccessfulMatchContainer = ({ chatRoomId }) => {
  const { price, numberOfShares } = useSelector(
    state => state.chat.unarchived[chatRoomId].latestOffer
  );
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
              {toSgdCurrency(price)}
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
        <button className="successfulMatch__button" type="button">
          Reveal My Identity
        </button>
        <RevealIdentityDisclaimer />
      </div>
    </div>
  );
};

export default SuccessfulMatchContainer;
