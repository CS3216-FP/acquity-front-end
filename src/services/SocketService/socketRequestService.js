import snakecaseKeys from 'snakecase-keys';
import tokenUtils from 'utils/tokenUtils';
import {
  REQ_CHAT_ROOMS,
  REQ_CONVERSATION,
  REQ_NEW_MESSAGE
} from 'constants/socket';
import Socket from './socketSetup';

const getChatRooms = () => {
  Socket.socket.emit(REQ_CHAT_ROOMS, {
    token: tokenUtils.getToken()
  });
};

const getChatConversation = ({ chatRoomId }) => {
  Socket.socket.emit(
    REQ_CONVERSATION,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId
    })
  );
};

const addNewMessage = ({ chatRoomId, message }) => {
  Socket.socket.emit(
    REQ_NEW_MESSAGE,
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
