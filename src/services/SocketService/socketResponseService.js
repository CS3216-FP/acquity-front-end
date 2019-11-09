import camelcaseKeys from 'camelcase-keys';
import store from 'app/store';
import {
  setChatRooms,
  setChatConversation,
  addNewMessage,
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

/**
 * Receives a list of chat rooms.
 * Example:
 * [
 *  {
 *   "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *   "friendly_name": "Jasmine heron 2740",
 *   "is_deal_closed": false,
 *   "seller_price": 10,
 *   "seller_number_of_shares": 400,
 *   "buyer_price": 10,
 *   "buyer_number_of_shares": 100,
 *   "updated_at": 1573225975481.102
 *  }
 * ]
 * @param socket
 */
export const setChatRoomsListener = socket => {
  socket.on(RECEIVE_CHAT_ROOMS, payload => {
    store.dispatch(
      setChatRooms({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

/**
 * Receives the conversation for a chat room.
 * Example:
 * {
 * "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 * "seller_price": 10,
 * "seller_number_of_shares": 400,
 * "buyer_price": 10,
 * "buyer_number_of_shares": 100,
 * "updated_at": 1573228223507.107,
 * "is_deal_closed": false,
 * "conversation": [
 *   {
 *     "id": "6f45cd6d-0198-4360-ad50-889d1749e435",
 *     "message": "hello world",
 *     "created_at": 1573227977677.968,
 *     "user_type": "buyer",
 *     "type": "message"
 *   },
 *   {
 *     "id": "9b4638c4-e2a2-48ce-aafe-995a158f4fbf",
 *     "price": 5,
 *     "number_of_shares": 100,
 *     "offer_status": "PENDING",
 *     "created_at": 1573228223507.107,
 *     "user_type": "buyer",
 *     "type": "offer"
 *   }
 *  ]
 * }
 * @param socket
 */
export const setChatConversationListener = socket => {
  socket.on(RECEIVE_CONVERSATION, payload => {
    store.dispatch(
      setChatConversation({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

/**
 * Receives new message.
 * Example:
 * {
 * "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 * "updated_at": 1573228653301.362,
 * "new_chat": {
 *   "id": "5fa9142b-db46-49d2-91ff-03488b1e9337",
 *   "message": "hello world",
 *   "created_at": 1573228653301.362,
 *   "user_type": "buyer",
 *   "type": "message"
 *  }
 * }
 * @param socket
 */
export const addNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_MESSAGE, payload => {
    store.dispatch(
      addNewMessage({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

/**
 * Receives new offer.
 * Example:
 * {
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "updated_at": 1573228223507.107,
 *  "new_chat": {
 *   "id": "9b4638c4-e2a2-48ce-aafe-995a158f4fbf",
 *   "price": 5,
 *   "number_of_shares": 100,
 *   "offer_status": "PENDING",
 *   "created_at": 1573228223507.107,
 *   "user_type": "buyer",
 *   "type": "offer"
 *  },
 *  "is_deal_closed": false
 * }
 *
 * @param socket
 */
export const addNewOfferListener = socket => {
  socket.on(RECEIVE_NEW_OFFER, payload => {
    store.dispatch(
      addNewMessage({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

/**
 * Receives offer accepted.
 * Example:
 * {
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "updated_at": 1573229085411.719,
 *  "new_chat": {
 *    "id": "fac16c9e-0928-4c53-b3df-d84ebf229ee0",
 *    "price": 5,
 *    "number_of_shares": 2000,
 *    "offer_status": "PENDING",
 *    "created_at": 1573229085411.719,
 *    "user_type": "buyer",
 *    "type": "offer"
 *  },
 *  "is_deal_closed": false
 * }
 *
 * @param socket
 */
export const acceptOfferListener = socket => {
  socket.on(RECEIVE_ACCEPT_OFFER, payload => {
    store.dispatch(
      acceptOffer({
        ...camelcaseKeys(payload, { deep: true })
      })
    );
  });
};

/**
 * Receives declined offer.
 * Example:
 * {
 *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
 *  "updated_at": 1573228223507.107,
 *  "new_chat": {
 *   "id": "9b4638c4-e2a2-48ce-aafe-995a158f4fbf",
 *   "price": 5,
 *   "number_of_shares": 100,
 *   "offer_status": "REJECTED",
 *   "created_at": 1573228223507.107,
 *   "user_type": "buyer",
 *   "type": "offer"
 *  },
 *  "is_deal_closed": false
 * }
 * @param socket
 */
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
