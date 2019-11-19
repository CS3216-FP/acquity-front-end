import React from 'react';
import { useDispatch } from 'react-redux';

import { useSocket } from 'contexts/socketContext';
import { setUserRevealed } from 'reducers/ChatDux';
import SocketRequestService from 'services/SocketService/socketRequestService';

import './RevealIdentitySubheader.scss';

const RevealIdentitySubheader = ({
  chatRoomId,
  isUserRevealed,
  isBothRevealed
}) => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleRevealIdentity = () => {
    SocketRequestService.revealIdentity({ chatRoomId, socket });
    dispatch(setUserRevealed({ chatRoomId }));
  };

  const getRevealedSubheaderText = () => {
    if (isUserRevealed && !isBothRevealed)
      return 'Waiting on other user to reveal';
    if (isBothRevealed) return 'Identities have been revealed!';

    throw new Error(`Invalid reveal identity conditions`);
  };

  return (
    <div className="revealIdentitySubheader">
      {isUserRevealed || isBothRevealed ? (
        <div className="revealIdentitySubheader--revealed">
          {getRevealedSubheaderText()}
        </div>
      ) : (
        <button
          onClick={handleRevealIdentity}
          className="revealIdentitySubheader__button"
          type="button"
        >
          Reveal My Identity
        </button>
      )}
    </div>
  );
};

export default RevealIdentitySubheader;
