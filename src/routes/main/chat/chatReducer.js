import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _orderBy from 'lodash/orderBy';

const initialState = {
  chatList: [],
  chatRoom: [],
  message: '',
  chat_room_id: ''
};

const chatReducer = handleActions(
  {
    get_chat_list: (state = initialState, action) => {
      const chatList = _orderBy(action.payload, ['created_at'], ['desc']);
      return {
        ...state,
        chatList
      };
    },
    get_chat_room: (state = initialState, action) => {
      return {
        ...state,
        chatRoom: action.payload
      };
    },
    get_new_message: (state = initialState, action) => {
      const chatRoomId = action.payload.chat_room_id;
      const { chatList, chatRoom } = _cloneDeep(state);
      const index = _findIndex(
        chatList,
        chat => chat.chat_room_id === chatRoomId
      );
      chatList.splice(index, 1, action.payload);
      const sortedChatList = _orderBy(chatList, ['created_at'], ['desc']);
      return {
        ...state,
        chatList: sortedChatList,
        chatRoom:
          state.chat_room_id === chatRoomId
            ? [...chatRoom, action.payload]
            : [...chatRoom]
      };
    },
    set_chat_room_id: (state = initialState, action) => {
      return {
        ...state,
        chat_room_id: action.payload.chatRoomId
      };
    }
  },
  initialState
);

export default chatReducer;
