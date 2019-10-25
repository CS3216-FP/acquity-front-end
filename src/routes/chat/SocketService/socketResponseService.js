import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  updateChatListAction,
  updateChatRoomAction,
  updateNewMessageAction
} from '../ChatDux';
import Socket from './socketSetup';

export const getChatList = () => {
  Socket.socket.on('get_chat_list', payload => {
    store.dispatch(
      updateChatListAction({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const getChatRoom = () => {
  Socket.socket.on('get_chat_room', payload => {
    store.dispatch(
      updateChatRoomAction({
        chatRoom: camelcaseKeys(payload)
      })
    );
  });
};

export const getNewMessage = () => {
  Socket.socket.on('get_new_message', payload => {
    store.dispatch(
      updateNewMessageAction({
        ...camelcaseKeys(payload)
      })
    );
  });
};

const initialize = () => {
  Socket.getChatList = getChatList();
  Socket.getChatRoom = getChatRoom();
  Socket.getNewMessage = getNewMessage();
};

export default {
  initialize
};
