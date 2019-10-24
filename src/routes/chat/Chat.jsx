import React from 'react';
import Moment from 'react-moment';

import ChatList from './ChatList/ChatList.container';
import ChatRoom from './ChatRoom/ChatRoom.container';
import ChatInput from './ChatInput/ChatInput.container';
import ChatOffer from './ChatOffer/ChatOffer';
import SocketResponseService from './SocketService/socketResponseService';
import './Chat.scss';

SocketResponseService.initialize();
Moment.startPooledTimer();

const Chat = ({ fetchChatList, chatRoomId }) => {
  React.useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);
  return (
    <div>
      <div className="container chat">
        <div className="columns is-marginless">
          <div className="column">
            <div className="is-primary chat__window--view">
              <div className="container">
                <h1 className="is-size-4 chat__window--header">Matches</h1>
                <hr style={{ backgroundColor: '#595f6f' }} />
                <div className="columns is-gapless">
                  <div className="column is-hidden-mobile is-two-fifths">
                    <div>
                      <ChatList />
                    </div>
                  </div>
                  <div className="column">
                    {chatRoomId === '' ? (
                      <div className="chat__chatroom">
                        No messages here yet...
                      </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
