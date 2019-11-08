import snakecaseKeys from 'snakecase-keys';

import tokenUtils from 'utils/tokenUtils';
import {
  EMIT_CHAT_ROOMS,
  EMIT_CONVERSATION,
  EMIT_NEW_MESSAGE,
  EMIT_NEW_OFFER,
  EMIT_ACCEPT_OFFER,
  EMIT_DECLINE_OFFER
} from 'constants/socket';

/**
 * Emit event to get a list of chat rooms.
 * Example:
 * {
 *  "token": "...",
 *  "user_type": "buyer",
 *  "is_archived": false
 * }
 * @param socket
 * @param userType
 */
const getChatRooms = ({ socket, userType }) => {
  socket.emit(
    EMIT_CHAT_ROOMS,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      userType
    })
  );
};

/**
 * Emit event to get conversation for a chat room.
 * Example:
 * {
 *  "token": "...",
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394"
 * }
 * @param chatRoomId
 * @param socket
 */
const getChatConversation = ({ chatRoomId, socket }) => {
  socket.emit(
    EMIT_CONVERSATION,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId
    })
  );
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
 */
const addNewMessage = ({ chatRoomId, message, socket }) => {
  socket.emit(
    EMIT_NEW_MESSAGE,
    snakecaseKeys({
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
    snakecaseKeys({
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
    snakecaseKeys({
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
    snakecaseKeys({
      token: tokenUtils.getToken(),
      offerId,
      userType,
      chatRoomId
    })
  );
};

export default {
  getChatRooms,
  getChatConversation,
  addNewMessage,
  addNewOffer,
  acceptOffer,
  declineOffer
};
