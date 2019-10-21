import React from 'react';
import Moment from 'react-moment';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import SocketResponseService from './socketResponseService';

SocketResponseService.initialize();
Moment.startPooledTimer();

const Chat = ({ fetchChatList, chatList }) => {
  let data = [
    {
      chatRoomId: '1',
      dealerName: 'Dealer',
      dealerId: 'Dealer ID',
      createdAt: 4356346534.345,
      message: 'This is a message'
    }
  ];
  data = chatList;
  return (
    <button type="button" onClick={() => fetchChatList(data)}>
      hi
      <ChatList />
      <ChatRoom />
      <ChatInput />
    </button>
  );
};

export default Chat;
