import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ThemeProvider } from '@livechat/ui-kit';
import { connect } from 'react-redux';

import UserChatList from './UserChatList';
import UserChatRoom from './UserChatRoom';
import UserChatInput from './UserChatInput';

const Chat = ({ chatRoom, chatRoomId }) => {
  return (
    <ThemeProvider>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={4}>
            <UserChatList />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          {chatRoom.length === 0 && chatRoomId === '' ? (
            <div
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '90px'
              }}
            >
              No messages here yet...
            </div>
          ) : (
            <div>
              <UserChatRoom />
              <UserChatInput />
            </div>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

function matchStateToProps(state) {
  return {
    chatRoom: state.chat.chatRoom,
    chatRoomId: state.chat.chat_room_id
  };
}

// eslint-disable-next-line no-unused-vars
function matchDispatchToProps(dispatch) {
  return {};
}

export default connect(
  matchStateToProps,
  matchDispatchToProps()
)(Chat);
