import store from 'app/store';
import { updateChatListAction } from '../Chat.ducks';
import Socket from './socketSetup';

export const getChatList = () => {
  Socket.socket.on('get_chat_list', payload => {
    store.dispatch(
      updateChatListAction({
        ...payload
      })
    );
  });
};

const initialize = () => {
  Socket.getChatList = getChatList();
};

export default {
  initialize
};
