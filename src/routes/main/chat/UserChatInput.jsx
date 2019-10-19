import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import {
  ThemeProvider,
  Row,
  TextComposer,
  TextInput,
  SendButton,
  Avatar
} from '@livechat/ui-kit';

import Socket from './socketService';

const UserChatInput = () => {
  return (
    <ThemeProvider>
      <TextComposer
        defaultValue="Hello, can you help me?"
        onSend={msg =>
          Socket.sendNewMessage({
            text: msg,
            chatRoomId: 'f0dec6e1-07e9-42e2-8bad-7c5568f0348c'
          })
        }
      >
        <Row align="center">
          <Avatar
            imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
            style={{ marginRight: '10px' }}
          />
          <TextInput fill />
          <SendButton fit />
        </Row>
      </TextComposer>
    </ThemeProvider>
  );
};

export default UserChatInput;
