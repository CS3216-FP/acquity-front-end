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

const getChatRooms = ({ socket, userType }) => {
  socket.emit(
    EMIT_CHAT_ROOMS,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      userType
    })
  );
};

const getChatConversation = ({ chatRoomId, socket }) => {
  socket.emit(
    EMIT_CONVERSATION,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId
    })
  );
};

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
