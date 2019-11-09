import { createSlice } from 'redux-starter-kit';
import _orderBy from 'lodash/orderBy';

export const initialState = {
  chatRooms: [],
  chatConversation: {
    chatRoomId: '',
    sellerPrice: null,
    sellNumberOfShares: null,
    buyerPrice: null,
    buyerNumberOfShares: null,
    updatedAt: null,
    isDealClosed: true,
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
    acceptOffer: (state, { payload }) => {
      const { chatRoomId, newChat, updatedAt, isDealClosed } = payload;
      const messageIndex = state.chatConversation.conversation.findIndex(
        c => c.id === newChat.id
      );
      const chatRoomIndex = state.chatRooms.findIndex(
        c => c.chatRoomId === chatRoomId
      );

      // update chatConversation offer timestamp
      // eslint-disable-next-line no-param-reassign
      state.chatConversation.conversation[messageIndex] = newChat;
      // eslint-disable-next-line no-param-reassign
      state.chatConversation.isDealClosed = isDealClosed;

      // update chatRooms timestamp
      // eslint-disable-next-line no-param-reassign
      state.chatRooms[chatRoomIndex].createdAt = updatedAt;
      // eslint-disable-next-line no-param-reassign
      state.chatRooms[chatRoomIndex].isDealClosed = isDealClosed;
      // eslint-disable-next-line no-param-reassign
      state.chatRooms = _orderBy(state.chatRooms, ['createdAt'], ['desc']);
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
