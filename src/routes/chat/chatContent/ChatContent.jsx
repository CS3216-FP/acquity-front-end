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
  const { isDealClosed, isRevealed, isDisbanded } = chat;
  const showSuccessfulMatch = isDealClosed && !isRevealed;

  if (!socket.connected) {
    return <ChatContentGhost />;
  }

  return (
    <div className="column chat__content is-full-mobile is-three-fifths-tablet">
      <ChatHeader chat={chat} />
      <ChatMessages chat={chat} />
      {showSuccessfulMatch && <SuccessfulMatch chat={chat} />}
      <ChatInput isDisbanded={isDisbanded} />
    </div>
  );
};

ChatContent.whyDidYouRender = true;

export default pure(ChatContent);
