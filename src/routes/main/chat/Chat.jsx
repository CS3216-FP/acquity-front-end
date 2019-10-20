import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ThemeProvider } from '@livechat/ui-kit';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import UserChatList from './UserChatList';
import UserChatRoom from './UserChatRoom';
import UserChatInput from './UserChatInput';

Moment.startPooledTimer();

const Chat = ({ chatRoom }) => {
  return (
    <ThemeProvider>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={4}>
            <UserChatList />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          {chatRoom.length === 0 ? (
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
    chatRoom: state.chat.chatRoom
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
