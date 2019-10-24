import tokenUtils from '../../../utils/tokenUtils';
import Socket from './socketSetup';

const requestChatList = () => {
  Socket.socket.emit('set_chat_list', {
    token: tokenUtils.getToken()
  });
};

const requestChatRoom = ({ chatRoomId }) => {
  Socket.socket.emit('set_chat_room', {
    token: tokenUtils.getToken(),
    chatRoomId
  });
};

const requestNewMessage = ({ chatRoomId, message }) => {
  Socket.socket.emit('set_new_message', {
    token: tokenUtils.getToken(),
    message,
    chatRoomId
  });
};

export default {
  requestChatList,
  requestChatRoom,
  requestNewMessage
};
