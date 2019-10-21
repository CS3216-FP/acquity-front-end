import React from 'react';

const ChatOffer = () => {
  return (
    <div>
      <div className="container">
        <h1
          className="is-size-5"
          style={{
            color: '#595f6f',
            textAlign: 'center'
          }}
        >
          YOUR BID
        </h1>
        <h1
          className="is-size-5"
          style={{
            textAlign: 'center',
            paddingBottom: 10,
            paddingTop: 10
          }}
        >
          <div className="columns">
            <div
              className="column"
              style={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              Bid #0
            </div>
            <div
              className="column"
              style={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              Quantity: 300
            </div>
            <div
              className="column"
              style={{ textAlign: 'center', fontWeight: 'bold' }}
            >
              Price: SGD 6.89
            </div>
          </div>
        </h1>
        <div className="columns is-gapless">
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
