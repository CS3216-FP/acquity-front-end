import snakecaseKeys from 'snakecase-keys';
import tokenUtils from 'utils/tokenUtils';
import {
  REQ_CHAT_ROOMS,
  REQ_CONVERSATION,
  REQ_NEW_MESSAGE
} from 'constants/socket';
import Socket from './socketSetup';

const requestChatList = () => {
  Socket.socket.emit(REQ_CHAT_ROOMS, {
    token: tokenUtils.getToken()
  });
};

const requestChatRoom = ({ chatRoomId }) => {
  Socket.socket.emit(
    REQ_CONVERSATION,
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId
    })
  );
};

const requestNewMessage = ({ chatRoomId, message }) => {
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
  requestChatList,
  requestChatRoom,
  requestNewMessage
};
