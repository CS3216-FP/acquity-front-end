import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  updateChatList,
  updateChatRoom,
  updateNewMessage
} from 'reducers/ChatDux';
import {
  RES_CHAT_ROOMS,
  RES_CONVERSATION,
  RES_NEW_MESSAGE
} from 'constants/socket';
import Socket from './socketSetup';

export const getChatList = () => {
  Socket.socket.on(RES_CHAT_ROOMS, payload => {
    store.dispatch(
      updateChatList({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const getChatRoom = () => {
  Socket.socket.on(RES_CONVERSATION, payload => {
    store.dispatch(
      updateChatRoom({
        chatRoom: camelcaseKeys(payload)
      })
    );
  });
};

export const getNewMessage = () => {
  Socket.socket.on(RES_NEW_MESSAGE, payload => {
    store.dispatch(
      updateNewMessage({
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
