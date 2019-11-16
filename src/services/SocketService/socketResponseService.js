import humps from 'humps';
import store from 'app/store';
import { addNewMessage } from 'reducers/ChatDux';
import { RECEIVE_NEW_MESSAGE, RECEIVE_NEW_OFFER } from 'constants/socket';

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
const addNewMessageListener = socket => {
  socket.on(RECEIVE_NEW_MESSAGE, payload => {
    store.dispatch(addNewMessage(humps.camelizeKeys(payload)));
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
const addNewOfferListener = socket => {
  socket.on(RECEIVE_NEW_OFFER, payload => {
    store.dispatch(addNewMessage(humps.camelizeKeys(payload)));
  });
};

// /**
//  * Receives offer accepted.
//  * Example:
//  * {
//  *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
//  *  "updated_at": 1573229085411.719,
//  *  "new_chat": {
//  *    "id": "fac16c9e-0928-4c53-b3df-d84ebf229ee0",
//  *    "price": 5,
//  *    "number_of_shares": 2000,
//  *    "offer_status": "PENDING",
//  *    "created_at": 1573229085411.719,
//  *    "user_type": "buyer",
//  *    "type": "offer"
//  *  },
//  *  "is_deal_closed": false
//  * }
//  *
//  * @param socket
//  */
// export const acceptOfferListener = socket => {
//   socket.on(RECEIVE_ACCEPT_OFFER, payload => {
//     store.dispatch(
//       setOfferStatus({
//         ...camelcaseKeys(payload, { deep: true })
//       })
//     );
//   });
// };

// /**
//  * Receives declined offer.
//  * Example:
//  * {
//  *  "chat_room_id": "4db2a763-bdb3-45b6-af8d-7944af8b1394",
//  *  "updated_at": 1573228223507.107,
//  *  "new_chat": {
//  *   "id": "9b4638c4-e2a2-48ce-aafe-995a158f4fbf",
//  *   "price": 5,
//  *   "number_of_shares": 100,
//  *   "offer_status": "REJECTED",
//  *   "created_at": 1573228223507.107,
//  *   "user_type": "buyer",
//  *   "type": "offer"
//  *  },
//  *  "is_deal_closed": false
//  * }
//  * @param socket
//  */
// export const declineOfferListener = socket => {
//   socket.on(RECEIVE_DECLINE_OFFER, payload => {
//     store.dispatch(
//       setOfferStatus({
//         ...camelcaseKeys(payload, { deep: true })
//       })
//     );
//   });
// };

const initialize = socket => {
  addNewMessageListener(socket);
  addNewOfferListener(socket);
};

export default {
  initialize
};
