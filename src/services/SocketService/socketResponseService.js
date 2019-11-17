import humps from 'humps';
import store from 'app/store';
import {
  addNewMessage,
  updateOfferStatus,
  addNewOffer
} from 'reducers/ChatDux';
import {
  RECEIVE_NEW_EVENT,
  RECEIVE_ERROR,
  CHAT_TYPE,
  OFFER_TYPE,
  OFFER_RESPONSE_TYPE
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
    const { type } = payload;
    const data = humps.camelizeKeys(payload);
    switch (type) {
      case CHAT_TYPE:
        store.dispatch(addNewMessage(data));
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

const errorListener = socket => {
  // eslint-disable-next-line no-console
  socket.on(RECEIVE_ERROR, payload => console.error(payload));
};

const initialize = socket => {
  receiveNewMessageListener(socket);
  errorListener(socket);
};

export default {
  initialize
};
