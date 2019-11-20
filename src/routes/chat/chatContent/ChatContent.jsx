import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { pure } from 'recompose';

import ChatContentGhost from './ChatContentGhost';
import ChatMessages from './chatMessages';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import SuccessfulMatch from './successfulMatch';

const ChatContent = () => {
  const { chatRoomId } = useParams();
  const chat = useSelector(state => state.chat.unarchived[chatRoomId]);
  const isLoading = useSelector(state => !state.loading.isSocketConnected);
  const { isDealClosed, disbandInfo } = chat;

  if (isLoading) {
    return <ChatContentGhost />;
  }

  return (
    <div className="column chat__content is-full-mobile is-three-fifths-tablet">
      <ChatHeader chat={chat} />
      <ChatMessages chat={chat} />
      {isDealClosed && <SuccessfulMatch chat={chat} />}
      <ChatInput isDisbanded={!!disbandInfo} />
    </div>
  );
};

ChatContent.whyDidYouRender = true;

export default pure(ChatContent);
