import React from 'react';

import './ChatOffer.scss';

const ChatOffer = () => {
  return (
    <div>
      <div className="container">
        <h1 className="is-size-5 chatoffer__header">YOUR BID</h1>
        <h1 className="is-size-5 chatoffer__bids">
          <div className="columns is-mobile">
            {/* TODO(#22): add make offer button in chat functional */}
            <div className="column chatoffer__bids--text">Bid #0</div>
            <div className="column chatoffer__bids--text">Quantity: 300</div>
            <div className="column chatoffer__bids--text">Price: SGD 6.89</div>
          </div>
        </h1>
        <div className="columns is-gapless is-mobile">
          <div className="column">
            <button
              type="button"
              className="button is-success is-outlined is-fullwidth is-medium"
            >
              Make Offer
            </button>
          </div>
          <div className="column">
            <button
              type="button"
              className="button is-danger is-outlined is-fullwidth is-medium"
            >
              Cancel Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOffer;
