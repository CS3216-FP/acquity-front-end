import humps from 'humps';
import { batch } from 'react-redux';

import store from 'app/store';
import {
  addNewMessage,
  updateOfferStatus,
  addNewOffer,
  incrementUnreadCount,
  updateIdentities
} from 'reducers/ChatDux';
import {
  RECEIVE_NEW_EVENT,
  RECEIVE_ERROR,
  CHAT_TYPE,
  OFFER_TYPE,
  OFFER_RESPONSE_TYPE,
  RECEIVE_REVEAL_IDENTITY
} from 'constants/socket';

/**
 * Listener for new messages
 * payload: {
    type: CHAT_TYPE | OFFER_TYPE,
    id: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    chatRoomId: string,
    authorId: string,
    message?: string, // Only for type=CHAT_TYPE
    // Below only if type=OFFER_TYPE
    price?: number,
    numberOfShares?: number,
    offerStatus?: "PENDING" | "ACCEPTED" | "REJECTED",
  }
 */
const receiveNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_EVENT, payload => {
    const state = store.getState();
    const data = humps.camelizeKeys(payload);
    const { type, authorId, chatRoomId, id } = data;
    switch (type) {
      case CHAT_TYPE:
        if (authorId !== state.misc.user.id) {
          batch(() => {
            store.dispatch(addNewMessage(data));
            store.dispatch(
              incrementUnreadCount({ chatRoomId, lastReadId: id })
            );
          });
        } else {
          store.dispatch(addNewMessage(data));
        }
        break;
      case OFFER_TYPE:
        store.dispatch(addNewOffer(data));
        break;
      case OFFER_RESPONSE_TYPE:
        store.dispatch(updateOfferStatus(data));
        break;
      default:
        throw new Error(
          `Invalid message type received from ${RECEIVE_NEW_EVENT} listener`
        );
    }
  });
};

const receiveRevealIdentitiesListener = socket => {
  socket.on(RECEIVE_REVEAL_IDENTITY, payload => {
    const data = humps.camelizeKeys(payload);
    store.dispatch(updateIdentities(data));
  });
};

const errorListener = socket => {
  // eslint-disable-next-line no-console
  socket.on(RECEIVE_ERROR, payload => console.error(payload));
};

const initialize = socket => {
  receiveNewMessageListener(socket);
  receiveRevealIdentitiesListener(socket);
  errorListener(socket);
};

export default {
  initialize
};
