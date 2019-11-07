import snakecaseKeys from 'snakecase-keys';
import tokenUtils from 'utils/tokenUtils';
import Socket from './socketSetup';

const requestChatList = () => {
  Socket.socket.emit('req_chat_rooms', {
    token: tokenUtils.getToken()
  });
};

const requestChatRoom = ({ chatRoomId }) => {
  Socket.socket.emit(
    'set_chat_room',
    snakecaseKeys({
      token: tokenUtils.getToken(),
      chatRoomId
    })
  );
};

const requestNewMessage = ({ chatRoomId, message }) => {
  Socket.socket.emit(
    'set_new_message',
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
