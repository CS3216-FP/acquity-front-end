import React from 'react';
import { useSelector } from 'react-redux';

import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = ({ chatRoomId }) => {
  const { isDealClosed, isRevealed, isDisbanded } = useSelector(
    state => state.chat.unarchived[chatRoomId]
  );
  const showSuccessfulMatch = isDealClosed && !isRevealed;
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
