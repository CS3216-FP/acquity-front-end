import React from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CHAT } from 'constants/routes';

import ChatRooms from './ChatRooms';
import ChatMessages from './ChatConversation/ChatMessages';
import ChatInput from './ChatInput/ChatInput';
import ChatHeader from './ChatHeader';
import './Chat.scss';

const ChatNav = ({ isShowingChatRoom, headerText }) => {
  return (
    <div className="chat__header columns">
      <div className="column is-full-mobile is-two-fifths-tablet chat__header__left">
        {isShowingChatRoom && (
          <Link
            to={CHAT}
            className="chat__header__back button button--cta button--nav--circle"
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </Link>
        )}
        <span>Matches</span>
      </div>
      <div className="column is-hidden-mobile chat__header__right">
        <span className="chat__header__right--text">{headerText}</span>
      </div>
    </div>
  );
};

const ChatContent = ({ chat }) => {
  return (
    <div className="column chat__content">
      <ChatHeader chat={chat} />
      <ChatMessages chat={chat} />
      {!chat.isDealClosed && <ChatInput chat={chat} />}
    </div>
  );
};

const Chat = () => {
  const { chatRoomId } = useParams();
  const chat = useSelector(state => state.chat.unarchived[chatRoomId]);

  if (chatRoomId && !chat) {
    return <Redirect to={CHAT} />;
  }

  return (
    <PageContainer className="chat">
      <ChatNav
        isShowingChatRoom={!!chatRoomId}
        headerText={chat.friendlyName}
      />
      <div className="columns is-mobile is-gapless">
        <ChatRooms isShowingChatRoom={!!chatRoomId} />
        {chatRoomId && <ChatContent chat={chat} />}
      </div>
    </PageContainer>
  );
};

export default Chat;
