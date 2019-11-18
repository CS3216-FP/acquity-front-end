import React from 'react';
import { useSelector } from 'react-redux';

import { useSocket } from 'contexts/socketContext';

import ChatContentGhost from './ChatContentGhost';
import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = ({ chatRoomId }) => {
  const socket = useSocket();
  const { isDealClosed, isRevealed, isDisbanded } = useSelector(
    state => state.chat.unarchived[chatRoomId]
  );
  const showSuccessfulMatch = isDealClosed && !isRevealed;

  if (!socket.connected) {
    return <ChatContentGhost />;
  }

  return (
    <div className="column chat__content">
      <ChatHeader chatRoomId={chatRoomId} />
      <ChatMessages chatRoomId={chatRoomId} />
      {showSuccessfulMatch && <SuccessfulMatch chatRoomId={chatRoomId} />}
      <ChatInput isDisbanded={isDisbanded} />
    </div>
  );
};

export default ChatContent;
