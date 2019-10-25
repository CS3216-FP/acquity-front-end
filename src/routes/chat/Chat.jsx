import React from 'react';
import { useSelector } from 'react-redux';
import PageContainer from 'components/pageContainer';

import ChatList from './ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatInput from './ChatInput/ChatInput';
import ChatOffer from './ChatOffer/ChatOffer';
import './Chat.scss';

const Chat = () => {
  const chatRoomId = useSelector(state => state.chat.chatRoomId);

  return (
    <PageContainer>
      <div className="container">
        <h1 className="is-size-4 chat__window--header">Matches</h1>
        <hr className="chat__divider" />
        <div className="columns is-gapless">
          <div className="column is-hidden-mobile is-two-fifths">
            <div>
              <ChatList />
            </div>
          </div>
          <div className="column">
            {chatRoomId === '' ? (
              <div className="chat__chatroom">No messages here yet...</div>
            ) : (
              <div>
                <ChatOffer />
                <ChatRoom />
                <ChatInput />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Chat;
