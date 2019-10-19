import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _orderBy from 'lodash/orderBy';

const initialState = {
  chatList: [],
  chatRoom: [],
  message: '',
  chat_room_id: 'f0dec6e1-07e9-42e2-8bad-7c5568f0348c'
};

const chatReducer = handleActions(
  {
    get_chat_list: (state = initialState, action) => {
      return {
        ...state,
        chatList: action.payload
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
    }
  },
  initialState
);

export default chatReducer;
