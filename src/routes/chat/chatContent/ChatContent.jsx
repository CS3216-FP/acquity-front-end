import React from 'react';
import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = ({ chatRoomId, showSuccessfulMatch }) => {
  return (
    <div className="column chat__content">
      <ChatHeader chatRoomId={chatRoomId} />
      <ChatMessages chatRoomId={chatRoomId} />
      {showSuccessfulMatch && <SuccessfulMatch chatRoomId={chatRoomId} />}
      <ChatInput />
    </div>
  );
};

export default ChatContent;
