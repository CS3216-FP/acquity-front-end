import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { ThemeProvider } from '@livechat/ui-kit';

import UserChatList from './UserChatList';
import UserChatRoom from './UserChatRoom';
import UserChatInput from './UserChatInput';
import { join } from '../../../services/socketService';

const Chat = () => {
  const room = 'sample_room';

  join({ room });

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
            <UserChatInput room={room} />
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Chat;
