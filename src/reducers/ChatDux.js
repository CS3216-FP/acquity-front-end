import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';
import SocketRequestService from 'services/SocketService/socketRequestService';

const chat = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    chatRoom: [],
    message: '',
    chatRoomId: ''
  },
  reducers: {
    updateChatList: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(payload, ['createdAt'], ['desc']);
    },
    fetchChatList: () => {
      SocketRequestService.requestChatList();
    },
    fetchChatRoom: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoomId = payload.chatRoomId;
      SocketRequestService.requestChatRoom({ chatRoomId: payload.chatRoomId });
    },
    updateChatRoom: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoom = payload.chatRoom;
    },
    fetchNewMessage: (state, { payload }) => {
      SocketRequestService.requestNewMessage(payload);
    },
    updateNewMessage: (state, { payload }) => {
      state.chatRoom.push({ ...payload });
      const index = _findIndex(
        state.chatList,
        c => c.chatRoomId === payload.chatRoomId
      );
      state.chatList.splice(index, 1, payload);
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(state.chatList, ['createdAt'], ['desc']);
    }
  }
});

export const {
  updateChatList,
  fetchChatList,
  fetchChatRoom,
  updateChatRoom,
  fetchNewMessage,
  updateNewMessage
} = chat.actions;

export default chat.reducer;
