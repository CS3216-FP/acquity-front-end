import humps from 'humps';

import tokenUtils from 'utils/tokenUtils';
import {
  EMIT_REQUEST_AUTHENTICATE,
  EMIT_NEW_MESSAGE,
  EMIT_NEW_OFFER,
  EMIT_EDIT_OFFER_STATUS,
  EMIT_UPDATE_LAST_READ,
  EMIT_REVEAL_IDENTITY,
  ACCEPT_OFFER_TYPE,
  REJECT_OFFER_TYPE,
  CANCEL_OFFER_TYPE
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
 *  token: string,
 *  chatRoomId: string,
 *  message: string,
 * }
 */
const addNewMessage = ({ chatRoomId, message, socket }) => {
  socket.emit(
    EMIT_NEW_MESSAGE,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      message,
      chatRoomId
    })
  );
};

/**
 * Emit event to add new offer.
 * Example:
 * {
 *  token: string,
 *  chatRoomId: string,
 *  price: string,
 *  numberOfShares: string,
 * }
 */
const addNewOffer = ({ chatRoomId, price, numberOfShares, socket }) => {
  socket.emit(
    EMIT_NEW_OFFER,
    humps.decamelizeKeys({
      token: tokenUtils.getToken(),
      price,
      numberOfShares,
      chatRoomId
    })
  );
};

/**
 * Emit event to accept offer.
 * Example:
 * {
 *  token: string,
 *  chatRoomId: string,
 *  offerId: string,
 *  offerStatus: ACCEPT_OFFER_TYPE
 * }
 */
const acceptOffer = ({ chatRoomId, offerId, socket }) => {
  const payload = humps.decamelizeKeys({
    token: tokenUtils.getToken(),
    offerId,
    chatRoomId,
    offerStatus: ACCEPT_OFFER_TYPE
  });
  socket.emit(EMIT_EDIT_OFFER_STATUS, payload);
};

/**
 * Emit event to decline offer.
 * Example:
 * {
 *  token: string,
 *  chatRoomId: string,
 *  offerId: string,
 *  offerStatus: REJECT_OFFER_TYPE
 * }
 */
const declineOffer = ({ chatRoomId, offerId, socket }) => {
  const payload = humps.decamelizeKeys({
    token: tokenUtils.getToken(),
    offerId,
    chatRoomId,
    offerStatus: REJECT_OFFER_TYPE
  });

  socket.emit(EMIT_EDIT_OFFER_STATUS, payload);
};

/**
 * Emit event to delete offer.
 * Example:
 * {
 *  token: string,
 *  chatRoomId: string,
 *  offerId: string,
 *  offerStatus: CANCEL_OFFER_TYPE
 * }
 */
const cancelOffer = ({ chatRoomId, offerId, socket }) => {
  const payload = humps.decamelizeKeys({
    token: tokenUtils.getToken(),
    offerId,
    chatRoomId,
    offerStatus: CANCEL_OFFER_TYPE
  });

  socket.emit(EMIT_EDIT_OFFER_STATUS, payload);
};

const updateUnreadMessage = ({ chatRoomId, lastReadId, socket }) => {
  const payload = humps.decamelizeKeys({
    token: tokenUtils.getToken(),
    chatRoomId,
    lastReadId
  });
  socket.emit(EMIT_UPDATE_LAST_READ, payload);
};

const revealIdentity = ({ chatRoomId, socket }) => {
  const payload = humps.decamelizeKeys({
    token: tokenUtils.getToken(),
    chatRoomId
  });

  socket.emit(EMIT_REVEAL_IDENTITY, payload);
};

const initialize = socket => {
  authenticate({ socket });
};

export default {
  initialize,
  addNewMessage,
  addNewOffer,
  acceptOffer,
  declineOffer,
  cancelOffer,
  updateUnreadMessage,
  revealIdentity
};
