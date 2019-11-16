import humps from 'humps';

import tokenUtils from 'utils/tokenUtils';
import {
  EMIT_REQUEST_AUTHENTICATE,
  EMIT_NEW_MESSAGE,
  EMIT_NEW_OFFER,
  EMIT_ACCEPT_OFFER,
  EMIT_DECLINE_OFFER
} from 'constants/socket';

/**
 * Emit event to authenticate user with the backend.
 * Must be done before any other emit calls to be able to receive messages on
 * the response channels in SocketResponseService
 */
const authenticate = ({ socket }) => {
  socket.emit(EMIT_REQUEST_AUTHENTICATE, { token: tokenUtils.getToken() });
};

/**
 * Emit event to add new message.
 * Example:
 * {
 *  "token": "...",
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "message": "hello world"
 * }
 * @param chatRoomId
 * @param message
 * @param socket
 * @param userType
 */
const addNewMessage = ({ chatRoomId, message, socket, userType }) => {
  socket.emit(
    EMIT_NEW_MESSAGE,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      message,
      chatRoomId,
      userType
    })
  );
};

/**
 * Emit event to add new offer.
 * Example:
 * {
 *  "token": "...",
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "price": "5",
 *  "number_of_shares": "100",
 *  "user_type": "buyer"
 * }
 * @param chatRoomId
 * @param price
 * @param numberOfShares
 * @param userType
 * @param socket
 */
const addNewOffer = ({
  chatRoomId,
  price,
  numberOfShares,
  userType,
  socket
}) => {
  socket.emit(
    EMIT_NEW_OFFER,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      price,
      numberOfShares,
      userType,
      chatRoomId
    })
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
const acceptOffer = ({ chatRoomId, offerId, userType, socket }) => {
  socket.emit(
    EMIT_ACCEPT_OFFER,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

/**
 * Emit event to decline offer.
 * Example:
 * {
 *  "token": "..."
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "user_type": "buyer",
 *  "offer_id": "9b4638c4-e2a2-48ce-aafe-995a158f4fbf"
 * }
 * @param chatRoomId
 * @param offerId
 * @param userType
 * @param socket
 */
const declineOffer = ({ chatRoomId, offerId, userType, socket }) => {
  socket.emit(
    EMIT_DECLINE_OFFER,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

const initialize = socket => {
  authenticate({ socket });
};

export default {
  initialize,
  addNewMessage,
  addNewOffer,
  acceptOffer,
  declineOffer
};
