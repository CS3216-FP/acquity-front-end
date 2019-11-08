import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';

export const initialState = {
  chatRooms: [],
  chatConversation: {
    conversation: []
  },
  chatRoomId: ''
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRooms: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRooms = _orderBy(payload, ['createdAt'], ['desc']);
    },
    setChatConversation: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatConversation = payload;
    },
    addNewMessage: (state, { payload }) => {
      const { newChat, chatRoomId } = payload;
      state.chatConversation.conversation.push({ ...newChat });
      const index = _findIndex(
        state.chatRooms,
        c => c.chatRoomId === chatRoomId
      );
      state.chatRooms.splice(index, 1, payload);
      // eslint-disable-next-line no-param-reassign
      state.chatRooms = _orderBy(state.chatRooms, ['createdAt'], ['desc']);
    }
  }
});

export const {
  setChatRooms,
  setChatConversation,
  addNewMessage
} = chat.actions;

export default chat.reducer;
