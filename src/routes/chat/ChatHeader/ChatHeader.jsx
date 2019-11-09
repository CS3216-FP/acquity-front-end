import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';
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
          <span className="details__value">SGD {price}</span>
        </div>
      </div>
    </div>
  );
};

const ChatCreateOffer = ({ setOffer }) => {
  const [price, setPrice] = useState('');
  const [shares, setShares] = useState('');
  const { chatRoomId } = useParams();
  const socket = useSocket();
  const userType = useSelector(state => state.misc.userType);

  const sendOffer = () => {
    SocketRequestService.addNewOffer({
      price,
      numberOfShares: shares,
      chatRoomId,
      userType,
      socket
    });
  };
  const cancelOffer = () => {
    setOffer(false);
  };
  return (
    <div>
      <div className="field">
        <div className="control">
          <input
            className="input is-info"
            type="text"
            placeholder="Price"
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input is-info"
            type="text"
            placeholder="Number of Shares"
            onChange={e => setShares(e.target.value)}
          />
        </div>
      </div>
      <div className="chat__header__actions columns is-gapless is-mobile">
        <button
          type="button"
          className="column button is-success is-outlined"
          onClick={sendOffer}
        >
          Create
        </button>
        <button
          type="button"
          className="column button is-danger is-outlined"
          onClick={cancelOffer}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const ChatHeader = () => {
  const [offer, setOffer] = useState(true);

  const createOffer = () => {
    setOffer(true);
  };
  return (
    <div className="chat__header column is-paddingless">
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText="Seller Offer"
          quantity="2000"
          price="6.89"
        />
        <ChatOfferDetails headerText="Your Bid" quantity="3000" price="6.30" />
      </div>
      {offer ? (
        <ChatCreateOffer setOffer={setOffer} />
      ) : (
        <div className="chat__header__actions columns is-gapless is-mobile">
          <button
            type="button"
            className="column button is-success is-outlined"
            onClick={createOffer}
          >
            Make Offer
          </button>
          <button type="button" className="column button is-danger is-outlined">
            Cancel Match
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
