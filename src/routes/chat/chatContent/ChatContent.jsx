import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pure } from 'recompose';

import { useSocket } from 'contexts/socketContext';

import ChatContentGhost from './ChatContentGhost';
import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = () => {
  const socket = useSocket();
  const { chatRoomId } = useParams();
  const chat = useSelector(state => state.chat.unarchived[chatRoomId]);
  const { isDealClosed, isDisbanded } = chat;

  if (!socket.connected) {
    return <ChatContentGhost />;
  }

  return (
    <div className="column chat__content">
      <ChatHeader chat={chat} />
      <ChatMessages chat={chat} />
      {isDealClosed && <SuccessfulMatch chat={chat} />}
      <ChatInput isDisbanded={isDisbanded} />
    </div>
  );
};

ChatContent.whyDidYouRender = true;

export default pure(ChatContent);
