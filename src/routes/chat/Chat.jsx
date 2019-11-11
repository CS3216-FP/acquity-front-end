import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PageContainer from 'components/pageContainer';

import ChatRooms from './ChatRooms';
import ChatMessages from './ChatConversation/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import ChatHeader from './ChatHeader';
import './Chat.scss';

const ChatNav = ({ isShowingChatRoom }) => {
  const history = useHistory();

  const handleBackClick = () => history.goBack();
  return (
    <div className="chat__header columns">
      <div className="column chat__header__left">
        {isShowingChatRoom && (
          <button
            onClick={handleBackClick}
            className="chat__header__back button button--cta button--nav--circle"
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </button>
        )}
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
      <ChatNav isShowingChatRoom={!!chatRoomId} />
      <div className="columns is-mobile is-gapless">
        <ChatRooms isShowingChatRoom={!!chatRoomId} />
        {chatRoomId && <ChatContent />}
      </div>
    </PageContainer>
  );
};

export default Chat;
