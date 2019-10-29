import React from 'react';

import './ChatOffer.scss';

const ChatOfferDetails = ({ headerText, quantity, price }) => {
  return (
    <div className="chat__offer__details column counterpartDetails">
      <div className="chat__offer__details__header">{headerText}</div>
      <div className="chat__offer__details__details columns is-marginless">
        <div className="column is-paddingless details">
          <span className="details__label">Quantity:</span>
          <span className="details__value">{quantity}</span>
        </div>
        <div className="column is-paddingless details">
          <span className="details__label">Price:</span>
          <span className="details__value">SGD {price}</span>
        </div>
      </div>
    </div>
  );
};

const ChatOffer = () => {
  return (
    <div className="chat__offer column is-paddingless">
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText="Seller Offer"
          quantity="2000"
          price="6.89"
        />
        <ChatOfferDetails headerText="Your Bid" quantity="3000" price="6.30" />
      </div>
      {/* TODO(#22): add make offer button in chat functional */}
      <div className="chat__offer__actions columns is-gapless is-mobile">
        <button type="button" className="column button is-success is-outlined">
          Make Offer
        </button>
        <button type="button" className="column button is-danger is-outlined">
          Cancel Match
        </button>
      </div>
    </div>
  );
};

export default ChatOffer;
