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
      const { chatRoomId, updatedAt, oldMessageId, offerStatus } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      // Update prior offer that got updated
      const priorOffer = chatRoom.chats.find(msg => msg.id === oldMessageId);
      priorOffer.offerStatus = offerStatus;

      // Add this updated offer as new message
      chatRoom.chats.push(payload);
      // Update the latest offer
      chatRoom.latestOffer = payload;
      chatRoom.updatedAt = updatedAt;
    }
  }
});
/* eslint-enable no-param-reassign */

export const {
  setChats,
  addNewMessage,
  addNewOffer,
  updateOfferStatus
} = chat.actions;

export default chat.reducer;
