import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  getUserPrice,
  getUserNumberOfShares,
  getOtherPartyUserType
} from 'utils/userUtils';
import { toSgdCurrency } from 'utils/moneyUtils';
import { SELLER, BUYER } from 'constants/user';
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
  const [isOffer, setIsOffer] = useState(true);
  const {
    sellerPrice,
    buyerPrice,
    sellerNumberOfShares,
    buyerNumberOfShares
  } = useSelector(state => state.chat.chatConversation);
  const userType = useSelector(state => state.misc.userType);
  const otherPartyUserType = getOtherPartyUserType(userType);
  const userPrice = getUserPrice(userType, sellerPrice, buyerPrice);
  const userNumberOfShares = getUserNumberOfShares(
    userType,
    sellerNumberOfShares,
    buyerNumberOfShares
  );
  const otherPartyPrice = getUserPrice(
    otherPartyUserType,
    sellerPrice,
    buyerPrice
  );
  const otherPartyNumberOfShares = getUserNumberOfShares(
    otherPartyUserType,
    sellerNumberOfShares,
    buyerNumberOfShares
  );
  const createOffer = () => {
    setIsOffer(true);
  };
  return (
    <div className="chat__header column is-paddingless">
      <div className="columns is-mobile is-marginless">
        <ChatOfferDetails
          headerText={`${userType === SELLER ? BUYER : SELLER} Offer`}
          quantity={otherPartyNumberOfShares}
          price={toSgdCurrency(otherPartyPrice)}
        />
        <ChatOfferDetails
          headerText="Your Bid"
          quantity={userNumberOfShares}
          price={toSgdCurrency(userPrice)}
        />
      </div>
      {isOffer ? (
        <ChatCreateOffer setOffer={setIsOffer} />
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
