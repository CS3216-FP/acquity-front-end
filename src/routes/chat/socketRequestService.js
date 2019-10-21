import tokenUtils from '../../utils/tokenUtils';
import Socket from './socketSetup';

const requestChatList = () => {
  Socket.socket.emit('set_chat_list', {
    token: tokenUtils.getToken()
  });
};

export default {
  requestChatList
};
