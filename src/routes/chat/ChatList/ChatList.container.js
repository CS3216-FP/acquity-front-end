import { connect } from 'react-redux';

import { fetchChatRoomAction } from '../Chat.ducks';
import ChatList from './ChatList';

const matchState = state => {
  return {
    chatList: state.chat.chatList,
    chatRoomId: state.chat.chatRoomId
  };
};

const matchDispatch = {
  fetchChatRoom: fetchChatRoomAction
};

export default connect(
  matchState,
  matchDispatch
)(ChatList);
