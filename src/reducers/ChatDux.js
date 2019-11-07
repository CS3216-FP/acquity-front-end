import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';
import SocketRequestService from 'services/SocketService/socketRequestService';

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
    getChatRooms: () => {
      SocketRequestService.getChatRooms();
    },
    getChatConversation: (state, { payload }) => {
      const { chatRoomId } = payload;
      // eslint-disable-next-line no-param-reassign
      state.chatRoomId = chatRoomId;
      SocketRequestService.getChatConversation({ chatRoomId });
    },
    setChatConversation: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatConversation = payload;
    },
    getNewMessage: (state, { payload }) => {
      SocketRequestService.getNewMessage(payload);
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
  getChatRooms,
  getChatConversation,
  setChatConversation,
  getNewMessage,
  addNewMessage
} = chat.actions;

export default chat.reducer;
