import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';

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
      const { newChat, chatRoomId, updatedAt } = payload;
      state.chatConversation.conversation.push({ ...newChat });
      const index = state.chatRooms.findIndex(c => c.chatRoomId === chatRoomId);
      // eslint-disable-next-line no-param-reassign
      state.chatRooms[index].createdAt = updatedAt;
      // eslint-disable-next-line no-param-reassign
      state.chatRooms = _orderBy(state.chatRooms, ['createdAt'], ['desc']);
    },
    acceptOffer: () => {
      // TODO: set offer message in chatConversation.conversation to ACCEPTED
    },
    declineOffer: () => {
      // TODO: set offer message in chatConversation.conversation to REJECTED
    }
  }
});

export const {
  setChatRooms,
  setChatConversation,
  addNewMessage,
  acceptOffer,
  declineOffer
} = chat.actions;

export default chat.reducer;
