import { connect } from 'react-redux';

import { fetchChatListAction } from './Chat.ducks';
import Chat from './Chat';

const matchState = state => {
  return {
    chatRoomId: state.chat.chatRoomId
  };
};

const matchDispatch = {
  fetchChatList: fetchChatListAction
};

export default connect(
  matchState,
  matchDispatch
)(Chat);
