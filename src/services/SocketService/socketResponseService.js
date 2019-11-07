import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  setChatRooms,
  setChatConversation,
  addNewMessage
} from 'reducers/ChatDux';
import {
  RECEIVE_CHAT_ROOMS,
  RECEIVE_CONVERSATION,
  RECEIVE_NEW_MESSAGE
} from 'constants/socket';

export const setChatRoomsListener = socket => {
  socket.on(RECEIVE_CHAT_ROOMS, payload => {
    store.dispatch(
      setChatRooms({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const setChatConversationListener = socket => {
  socket.on(RECEIVE_CONVERSATION, payload => {
    store.dispatch(
      setChatConversation({
        ...camelcaseKeys(payload)
      })
    );
  });
};

export const addNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_MESSAGE, payload => {
    store.dispatch(
      addNewMessage({
        ...camelcaseKeys(payload)
      })
    );
  });
};

const initialize = socket => {
  setChatRoomsListener(socket);
  setChatConversationListener(socket);
  addNewMessageListener(socket);
};

export default {
  initialize
};
