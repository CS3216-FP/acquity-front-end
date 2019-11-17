import humps from 'humps';
import store from 'app/store';
import {
  addNewMessage,
  updateOfferStatus,
  addNewOffer
} from 'reducers/ChatDux';
import {
  RECEIVE_NEW_MESSAGE,
  RECEIVE_ERROR,
  RECEIVE_UPDATE_OFFER,
  CHAT_TYPE,
  OFFER_TYPE
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
const addNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_MESSAGE, payload => {
    const { type } = payload;
    switch (type) {
      case CHAT_TYPE:
        store.dispatch(addNewMessage(humps.camelizeKeys(payload)));
        break;
      case OFFER_TYPE:
        store.dispatch(addNewOffer(humps.camelizeKeys(payload)));
        break;
      default:
        throw new Error(
          `Invalid message type received from ${RECEIVE_NEW_MESSAGE} listener`
        );
    }
  });
};

const errorListener = socket => {
  // eslint-disable-next-line no-console
  socket.on(RECEIVE_ERROR, payload => console.error(payload));
};

/**
 * Listener for updating of offers
 * payload: {
    oldOfferMessageId: string,
    type: OFFER_TYPE,
    id: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    chatRoomId: string,
    authorId: string,
    price: number,
    numberOfShares: number,
    offerStatus: "ACCEPTED" | "REJECTED",
  }
 */
export const updateOfferListener = socket => {
  socket.on(RECEIVE_UPDATE_OFFER, payload => {
    store.dispatch(updateOfferStatus(humps.camelizeKeys(payload)));
  });
};

const initialize = socket => {
  addNewMessageListener(socket);
  updateOfferListener(socket);
  errorListener(socket);
};

export default {
  initialize
};
