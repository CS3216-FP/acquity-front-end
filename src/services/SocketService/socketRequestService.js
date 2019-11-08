import snakecaseKeys from 'snakecase-keys';

import tokenUtils from 'utils/tokenUtils';
import {
  EMIT_CHAT_ROOMS,
  EMIT_CONVERSATION,
  EMIT_NEW_MESSAGE
} from 'constants/socket';

const getChatRooms = ({ socket }) => {
  socket.emit(EMIT_CHAT_ROOMS, {
    token: tokenUtils.getToken()
  });
};

const getChatConversation = ({ chatRoomId, socket }) => {
  console.log(chatRoomId);
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

export default {
  getChatRooms,
  getChatConversation,
  addNewMessage
};
