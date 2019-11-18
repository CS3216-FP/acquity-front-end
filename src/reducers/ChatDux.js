import { createSlice } from 'redux-starter-kit';

export const initialState = {
  archived: {},
  unarchived: {}
};

/* eslint-disable no-param-reassign */
const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, { payload }) => {
      const { archived, unarchived } = payload;
      state.archived = archived;
      state.unarchived = unarchived;
    },
    addNewMessage: (state, { payload }) => {
      const { chatRoomId, updatedAt } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      chatRoom.chats.push(payload);
      chatRoom.updatedAt = updatedAt;
    },
    addNewOffer: (state, { payload }) => {
      const { chatRoomId, updatedAt } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      // Add offer as message
      chatRoom.chats.push(payload);
      // Update the latest offer
      chatRoom.latestOffer = payload;
      chatRoom.updatedAt = updatedAt;
    },
    updateOfferStatus: (state, { payload }) => {
      const { chatRoomId, updatedAt, offerStatus } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      // Update prior offer that got updated
      const oldOfferId = chatRoom.latestOffer.id;
      const priorOffer = chatRoom.chats.find(msg => msg.id === oldOfferId);
      priorOffer.offerStatus = offerStatus;

      // Add this updated offer as new message
      chatRoom.chats.push(payload);
      // Update chat room's status
      chatRoom.isDealClosed = payload.isDealClosed;
      // Update the latest offer
      chatRoom.latestOffer = payload;
      chatRoom.updatedAt = updatedAt;
    },
    clearUnreadCount: (state, { payload }) => {
      const { chatRoomId } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      chatRoom.unreadCount = 0;
    },
    incrementUnreadCount: (state, { payload }) => {
      const { chatRoomId, lastReadId } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      // Only update the lastReadId if the user has scrolled to the bottom and set the unreadCount to 0
      if (chatRoom.unreadCount === 0) {
        chatRoom.lastReadId = lastReadId;
      }
      chatRoom.unreadCount += 1;
    }
  }
});
/* eslint-enable no-param-reassign */

export const {
  setChats,
  addNewMessage,
  addNewOffer,
  updateOfferStatus,
  clearUnreadCount,
  incrementUnreadCount
} = chat.actions;

export default chat.reducer;
