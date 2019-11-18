import React from 'react';
import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = ({ chat }) => {
  const { isDealClosed } = chat;
  return (
    <div className="column chat__content">
      <ChatHeader chat={chat} />
      <ChatMessages chat={chat} />
      {isDealClosed && <SuccessfulMatch matchDetails={chat.latestOffer} />}
      <ChatInput chat={chat} />
    </div>
  );
};

export default ChatContent;
