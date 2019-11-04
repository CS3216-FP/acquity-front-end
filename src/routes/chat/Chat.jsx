import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageContainer from 'components/pageContainer';
import { fetchChatRoomAction, fetchChatListAction } from 'reducers/ChatDux';

import ChatList from './ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatInput from './ChatInput/ChatInput';
import ChatOffer from './ChatOffer';
import './Chat.scss';
import { useSocket } from '../../contexts/socketContext';

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
  const dispatch = useDispatch();
  const { chatRoomId } = useParams();
  const correspondentName = useSelector(
    state => state.chat.chatRoom.length > 0 && state.chat.chatRoom[0].dealerName
  );
  const userType = useSelector(state => state.misc.userType);

  const { socketInit, socketEnd } = useSocket();
  useEffect(() => {
    socketInit();
    dispatch(fetchChatListAction({ userType }));
    if (chatRoomId) {
      console.log(userType);
      dispatch(fetchChatRoomAction({ chatRoomId, userType }));
    }
    return () => {
      socketEnd();
    };
  });
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
