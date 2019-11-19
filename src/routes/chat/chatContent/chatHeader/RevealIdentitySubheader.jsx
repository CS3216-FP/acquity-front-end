import React from 'react';

import { useSocket } from 'contexts/socketContext';
import SocketRequestService from 'services/SocketService/socketRequestService';

import './RevealIdentitySubheader.scss';

const RevealIdentitySubheader = ({ chatRoomId, isRevealed }) => {
  const socket = useSocket();

  const handleRevealIdentity = () => {
    SocketRequestService.revealIdentity({ chatRoomId, socket });
  };

  return (
    <div className="revealIdentitySubheader">
      {isRevealed ? (
        <div className="revealIdentitySubheader--revealed">
          Identities have been revealed!
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
