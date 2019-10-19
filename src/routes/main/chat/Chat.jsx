import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ThemeProvider } from '@livechat/ui-kit';
import Moment from 'react-moment';

import UserChatList from './UserChatList';
import UserChatRoom from './UserChatRoom';
import UserChatInput from './UserChatInput';
import socketService from './socketService';

Moment.startPooledTimer();

const Chat = () => {
  socketService.initialize();

  return (
    <ThemeProvider>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={4}>
            <UserChatList />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8}>
          <div style={{ width: '100%', float: 'right' }}>
            <UserChatRoom />
            <UserChatInput />
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Chat;
