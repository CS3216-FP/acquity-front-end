import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { CHAT } from 'constants/routes';

import ChatNav from './ChatNav';
import ChatList from './chatList';
import ChatContent from './chatContent';
import './Chat.scss';

const Chat = () => {
  const { chatRoomId } = useParams();
  const chat = useSelector(state => state.chat.unarchived[chatRoomId]);
  const chatNavHeaderText = chat ? chat.friendlyName : '';

  if (chatRoomId && !chat) {
    return <Redirect to={CHAT} />;
  }

  return (
    <PageContainer className="chat">
      <ChatNav
        isShowingChatRoom={!!chatRoomId}
        headerText={chatNavHeaderText}
      />
      <div className="columns is-mobile is-gapless">
        <ChatList isShowingChatRoom={!!chatRoomId} />
        {chatRoomId && <ChatContent chatRoomId={chatRoomId} />}
      </div>
    </PageContainer>
  );
};

export default Chat;
