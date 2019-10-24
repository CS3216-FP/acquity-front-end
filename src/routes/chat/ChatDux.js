import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
import _findIndex from 'lodash/findIndex';
import SocketRequestService from './SocketService/socketRequestService';

const chat = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    chatRoom: [],
    message: '',
    chatRoomId: ''
  },
  reducers: {
    updateChatListAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatList = _orderBy(payload, ['createdAt'], ['desc']);
    },
    fetchChatListAction: () => {
      SocketRequestService.requestChatList();
    },
    fetchChatRoomAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoomId = payload.chatRoomId;
      SocketRequestService.requestChatRoom({ chatRoomId: payload.chatRoomId });
    },
    updateChatRoomAction: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.chatRoom = payload.chatRoom;
    },
    fetchNewMessageAction: (state, { payload }) => {
      SocketRequestService.requestNewMessage(payload);
    },
    updateNewMessageAction: (state, { payload }) => {
      state.chatRoom.push({ ...payload });
      const index = _findIndex(
        state.chatList,
        c => c.chatRoomId === payload.chatRoomId
      );
      state.chatList.splice(index, 1, payload);
    }
  }
});

export const {
  updateChatListAction,
  fetchChatListAction,
  fetchChatRoomAction,
  updateChatRoomAction,
  fetchNewMessageAction,
  updateNewMessageAction
} = chat.actions;

export default chat.reducer;
