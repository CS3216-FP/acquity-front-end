import React, { useEffect } from 'react';
import 'simplebar/dist/simplebar.min.css';
import {
  ThemeProvider,
  Row,
  TextComposer,
  TextInput,
  SendButton,
  Avatar
} from '@livechat/ui-kit';

import { emit, sub } from '../../../services/socketService';

const UserChatInput = ({ room }) => {
  useEffect(() => {
    sub();
  });
  return (
    <ThemeProvider>
      <TextComposer
        defaultValue="Hello, can you help me?"
        onSend={msg => emit({ room, msg })}
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
