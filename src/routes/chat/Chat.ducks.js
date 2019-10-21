import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';
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
      state.chatList = _orderBy(payload, ['created_at'], ['desc']);
    },
    fetchChatListAction: () => {
      SocketRequestService.requestChatList();
    }
  }
});

export const { updateChatListAction, fetchChatListAction } = chat.actions;

export default chat.reducer;
