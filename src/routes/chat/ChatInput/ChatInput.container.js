import { connect } from 'react-redux';

import { fetchNewMessageAction } from '../Chat.ducks';
import ChatInput from './ChatInput';

const matchState = state => {
  return {
    chatRoomId: state.chat.chatRoomId
  };
};

const matchDispatch = {
  fetchNewMessage: fetchNewMessageAction
};

export default connect(
  matchState,
  matchDispatch
)(ChatInput);
