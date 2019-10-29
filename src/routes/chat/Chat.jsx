import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/pageContainer';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatInput from './ChatInput/ChatInput';
import ChatOffer from './ChatOffer';
import './Chat.scss';

const ChatHeader = ({ correspondentName }) => {
  return (
    <>
      <div className="chat__header columns">
        <div className="column chat__header__left is-two-fifths">
          <span>Matches</span>
          <span className="view-archive">View archive</span>
        </div>
        <div className="column chat__header--user">{correspondentName}</div>
      </div>
    </>
  );
};

const ChatContent = () => {
  return (
    <div className="column chat__content">
      <ChatOffer />
      <ChatRoom />
      <ChatInput />
    </div>
  );
};

const Chat = () => {
  const { chatRoomId } = useParams();
  const correspondentName = useSelector(
    state => state.chat.chatRoom.length > 0 && state.chat.chatRoom[0].dealerName
  );

  return (
    <PageContainer className="chat">
      {/* TODO: clean up redux model to not use arrays and make keys more meaningful */}
      <ChatHeader correspondentName={correspondentName} />
      <div className="columns is-gapless">
        <ChatList />
        {chatRoomId && <ChatContent />}
      </div>
    </PageContainer>
  );
};

export default Chat;
