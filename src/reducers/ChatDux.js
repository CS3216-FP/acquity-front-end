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
      const { newChat, chatRoomId, updatedAt } = payload;
      const chatRoom = state.unarchived[chatRoomId];
      if (!chatRoom) return;

      chatRoom.chats.push({ ...newChat });
      chatRoom.updatedAt = updatedAt;
    }
  }
});
/* eslint-enable no-param-reassign */

export const { setChats, addNewMessage } = chat.actions;

export default chat.reducer;
