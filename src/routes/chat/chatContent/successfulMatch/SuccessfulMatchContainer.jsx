import React from 'react';
import find from 'lodash/find';
import { useDispatch } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import { useUser } from 'contexts/userContext';
import { setUserRevealed } from 'reducers/ChatDux';
import SocketRequestService from 'services/SocketService/socketRequestService';
import { toCurrency } from 'utils/moneyUtils';

import RevealIdentityDisclaimer from './RevealIdentityDisclaimer';

import './SuccessfulMatchContainer.scss';

const SuccessfulMatchDetails = ({ numberOfShares, price }) => {
  return (
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
  );
};

const SuccessfulMatchReveal = ({ handleClick, isUserRevealed }) => {
  return (
    <>
      <div className="successfulMatch__header">
        Congratulations on the successful match!
      </div>
      <div className="successfulMatch__content">
        <div className="successfulMatch__content--text">
          To continue this transaction offline, you will need to:
        </div>
        <button
          onClick={handleClick}
          disabled={isUserRevealed}
          className="successfulMatch__button"
          type="button"
        >
          {isUserRevealed
            ? 'Waiting For Other User To Reveal'
            : 'Reveal My Identity'}
        </button>
        <RevealIdentityDisclaimer />
      </div>
    </>
  );
};

const SuccessfulMatchIdentities = ({ identities }) => {
  const user = useUser();
  const userIdentity = identities[user.id];
  const otherIdentity =
    identities[find(Object.keys(identities), id => id !== user.id)];

  return (
    <div className="successfulMatchIdentities columns is-multiline is-marginless">
      <div className="successfulMatchIdentities__container successfulMatchIdentities__container__left">
        <div className="successfulMatchIdentities__bubble column">
          <div className="successfulMatchIdentities--name">
            {otherIdentity.fullName}
          </div>
          <a
            className="successfulMatchIdentities--email"
            href={`mailto:${otherIdentity.email}`}
          >
            {otherIdentity.email}
          </a>
        </div>
      </div>
      <div className="successfulMatchIdentities__container successfulMatchIdentities__container__right">
        <div className="successfulMatchIdentities__bubble column">
          <div className="successfulMatchIdentities--name">
            {userIdentity.fullName}
          </div>
          <a
            className="successfulMatchIdentities--email"
            href={`mailto:${userIdentity.email}`}
          >
            {userIdentity.email}
          </a>
        </div>
      </div>
    </div>
  );
};

const SuccessfulMatchContainer = ({ chat }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { isRevealed, identities } = chat;
  const { price, numberOfShares } = chat.latestOffer;

  const handleRevealIdentity = () => {
    SocketRequestService.revealIdentity({ chatRoomId: chat.id, socket });
    dispatch(setUserRevealed({ chatRoomId: chat.id }));
  };

  return (
    <div className="successfulMatch">
      <SuccessfulMatchDetails numberOfShares={numberOfShares} price={price} />
      {identities ? (
        <SuccessfulMatchIdentities identities={identities} />
      ) : (
        <SuccessfulMatchReveal
          handleClick={handleRevealIdentity}
          isUserRevealed={isRevealed}
        />
      )}
    </div>
  );
};

export default SuccessfulMatchContainer;
