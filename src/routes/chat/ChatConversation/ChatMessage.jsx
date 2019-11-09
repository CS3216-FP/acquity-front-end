import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SocketRequestService from 'services/SocketService/socketRequestService';

import './ChatMessage.scss';
import { useSocket } from '../../../contexts/socketContext';

const ChatMessage = ({ chat }) => {
  const userType = useSelector(state => state.misc.userType);

  return (
    <div className="chatMessage">
      <div
        className={`chatMessage__bubble chatMessage__bubble--${
          userType === chat.userType ? 'right' : 'left'
        }`}
      >
        {chat.type === 'message' ? (
          <Message chat={chat} />
        ) : (
          <Offer chat={chat} />
        )}
      </div>
    </div>
  );
};

const Message = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        {chat.message}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
    </p>
  );
};

/**
 * Emit event to accept offer. // TODO: Does not change offer to accepted
 * Example:
 * {
 *  "token": "...",
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "user_type": "buyer",
 *  "offer_id": "fac16c9e-0928-4c53-b3df-d84ebf229ee0"
 * }
 * @param chatRoomId
 * @param offerId
 * @param userType
 * @param socket
 */
const Offer = ({ chat }) => {
  const timeString = new Date(chat.createdAt).toLocaleTimeString([], {
    timeStyle: 'short'
  });
  const userType = useSelector(state => state.misc.userType);
  const isDealClose = useSelector(
    state => state.chat.chatConversation.isDealClosed
  );
  const socket = useSocket();
  const { chatRoomId } = useParams();

  const acceptOffer = () => {
    SocketRequestService.acceptOffer({
      offerId: chat.id,
      userType,
      socket,
      chatRoomId
    });
  };
  return (
    <p className="chatMessage__bubble__message">
      <span className="chatMessage__bubble__message--message">
        Price: {chat.price} Number Of Shares: {chat.numberOfShares}
      </span>
      <span className="chatMessage__bubble__message--timestamp">
        {timeString}
      </span>
      {isDealClose ? (
        <div />
      ) : (
        <div className="columns is-gapless is-mobile">
          <button
            type="button"
            className="column button is-success is-outlined"
            onClick={acceptOffer}
          >
            Accept
          </button>
          <button type="button" className="column button is-danger is-outlined">
            Reject
          </button>
        </div>
      )}
    </p>
  );
};

export default ChatMessage;
