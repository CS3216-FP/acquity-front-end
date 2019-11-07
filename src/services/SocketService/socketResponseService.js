import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  setChatRooms,
  setChatConversation,
  addNewMessage
} from 'reducers/ChatDux';
import {
  RES_CHAT_ROOMS,
  RES_CONVERSATION,
  RES_NEW_MESSAGE
} from 'constants/socket';
import Socket from './socketSetup';

export const setChatRoomsListener = () => {
  Socket.socket.on(RES_CHAT_ROOMS, payload => {
    store.dispatch(
      setChatRooms({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const setChatConversationListener = () => {
  Socket.socket.on(RES_CONVERSATION, payload => {
    store.dispatch(
      setChatConversation({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const addNewMessageListener = () => {
  Socket.socket.on(RES_NEW_MESSAGE, payload => {
    store.dispatch(
      addNewMessage({
        ...camelcaseKeys(payload)
      })
    );
  });
};

const initialize = () => {
  Socket.setChatListListener = setChatRoomsListener();
  Socket.setChatRoomListener = setChatConversationListener();
  Socket.addNewMessageListenser = addNewMessageListener();
};

export default {
  initialize
};
