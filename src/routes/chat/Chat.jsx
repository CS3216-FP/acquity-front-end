import React from 'react';
import PageContainer from 'components/pageContainer';
import { useParams } from 'react-router-dom';
import ChatRooms from './ChatRooms';
import ChatMessages from './ChatConversation/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import ChatHeader from './ChatHeader';
import './Chat.scss';

const ChatNav = () => {
  return (
    <div className="chat__header columns">
      <div className="column chat__header__left is-two-fifths">
        <span>Matches</span>
      </div>
    </div>
  );
};

const ChatContent = () => {
  return (
    <div className="column chat__content">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

const Chat = () => {
  const { chatRoomId } = useParams();

  return (
    <PageContainer className="chat">
      {/* TODO: clean up redux model to not use arrays and make keys more meaningful */}
      <ChatNav />
      <div className="columns is-gapless">
        <ChatRooms />
        {chatRoomId && <ChatContent />}
      </div>
    </PageContainer>
  );
};

export default Chat;
