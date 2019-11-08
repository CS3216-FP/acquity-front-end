import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  setChatRooms,
  setChatConversation,
  addNewMessage,
  addNewOffer,
  acceptOffer,
  declineOffer
} from 'reducers/ChatDux';
import {
  RECEIVE_CHAT_ROOMS,
  RECEIVE_CONVERSATION,
  RECEIVE_NEW_MESSAGE,
  RECEIVE_NEW_OFFER,
  RECEIVE_ACCEPT_OFFER,
  RECEIVE_DECLINE_OFFER
} from 'constants/socket';

export const setChatRoomsListener = socket => {
  socket.on(RECEIVE_CHAT_ROOMS, payload => {
    store.dispatch(
      setChatRooms({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const setChatConversationListener = socket => {
  socket.on(RECEIVE_CONVERSATION, payload => {
    store.dispatch(
      setChatConversation({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const addNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_MESSAGE, payload => {
    store.dispatch(
      addNewMessage({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const addNewOfferListener = socket => {
  socket.on(RECEIVE_NEW_OFFER, payload => {
    store.dispatch(
      addNewOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const acceptOfferListener = socket => {
  socket.on(RECEIVE_ACCEPT_OFFER, payload => {
    store.dispatch(
      acceptOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

export const declineOfferListener = socket => {
  socket.on(RECEIVE_DECLINE_OFFER, payload => {
    store.dispatch(
      declineOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

const initialize = socket => {
  setChatRoomsListener(socket);
  setChatConversationListener(socket);
  addNewMessageListener(socket);
  addNewOfferListener(socket);
  acceptOfferListener(socket);
  declineOfferListener(socket);
};

export default {
  initialize
};
