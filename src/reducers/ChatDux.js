import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';

const chat = createSlice({
  name: 'chat',
  initialState: {
    chatRooms: [],
    chatConversation: [],
    chatRoomId: ''
  },
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
      state.chatConversation.push({ ...payload });
      const index = _findIndex(
        state.chatRooms,
        c => c.chatRoomId === payload.chatRoomId
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
