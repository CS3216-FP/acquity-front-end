import React, { useState } from 'react';

import { toSgdCurrency } from 'utils/moneyUtils';
import { SELLER, BUYER } from 'constants/user';
import { useUser } from 'contexts/userContext';

import ChatOfferSubheader from './ChatOfferSubheader';
import RevealIdentitySubheader from './RevealIdentitySubheader';
import './ChatHeader.scss';

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
  const user = useUser();
  const [isShowOfferSubheader, setIsShowOfferSubheader] = useState(false);
  const { isDealClosed, buyerId } = chat;

  const handleOpenOfferSubheader = () => {
    setIsShowOfferSubheader(true);
  };

  const handleCloseOfferSubheader = () => {
    setIsShowOfferSubheader(false);
  };

  const renderSubheader = () => {
    if (isDealClosed) {
      return <RevealIdentitySubheader />;
    }
    if (isShowOfferSubheader) {
      return <ChatOfferSubheader handleClose={handleCloseOfferSubheader} />;
    }
    return (
      <div className="chat__header__actions columns is-gapless is-mobile">
        <button
          type="button"
          className="column button is-success is-outlined"
          onClick={handleOpenOfferSubheader}
        >
          Make Offer
        </button>
        <button type="button" className="column button is-danger is-outlined">
          Cancel Match
        </button>
      </div>
    );
  };

  return (
    <div className="chat__header column is-paddingless">
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText={`${user.id === buyerId ? BUYER : SELLER} Offer`}
          quantity={0}
          price={toSgdCurrency(0)}
        />
        <ChatOfferDetails
          headerText="Your Bid"
          quantity={0}
          price={toSgdCurrency(0)}
        />
      </div>
      {renderSubheader()}
    </div>
  );
};

export default ChatHeader;
