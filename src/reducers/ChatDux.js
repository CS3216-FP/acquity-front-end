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
      /* eslint-disable no-param-reassign */
      state.chatRooms = _orderBy(payload, ['createdAt'], ['desc']);
      /* eslint-enable no-param-reassign */
    },
    setChatConversation: (state, { payload }) => {
      /* eslint-disable no-param-reassign */
      state.chatConversation = payload;
      /* eslint-enable no-param-reassign */
    },
    addNewMessage: (state, { payload }) => {
      const { newChat, chatRoomId, updatedAt } = payload;
      state.chatConversation.conversation.push({ ...newChat });
      const index = state.chatRooms.findIndex(c => c.chatRoomId === chatRoomId);

      /* eslint-disable no-param-reassign */
      state.chatRooms[index].createdAt = updatedAt;
      state.chatRooms = _orderBy(state.chatRooms, ['createdAt'], ['desc']);
      /* eslint-enable no-param-reassign */
    },
    acceptOffer: (state, { payload }) => {
      const { chatRoomId, newChat, updatedAt, isDealClosed } = payload;
      const messageIndex = state.chatConversation.conversation.findIndex(
        c => c.id === newChat.id
      );
      const chatRoomIndex = state.chatRooms.findIndex(
        c => c.chatRoomId === chatRoomId
      );

      /* eslint-disable no-param-reassign */
      // update chatConversation offer timestamp
      state.chatConversation.conversation[messageIndex] = newChat;
      state.chatConversation.isDealClosed = isDealClosed;
      // update chatRooms timestamp
      state.chatRooms[chatRoomIndex].createdAt = updatedAt;
      state.chatRooms[chatRoomIndex].isDealClosed = isDealClosed;
      state.chatRooms = _orderBy(state.chatRooms, ['createdAt'], ['desc']);
      /* eslint-enable no-param-reassign */
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
