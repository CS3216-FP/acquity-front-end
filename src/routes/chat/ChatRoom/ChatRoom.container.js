import { connect } from 'react-redux';

import ChatRoom from './ChatRoom';

const matchState = state => {
  return {
    chatRoom: state.chat.chatRoom
  };
};

const matchDispatch = {};

export default connect(
  matchState,
  matchDispatch
)(ChatRoom);
