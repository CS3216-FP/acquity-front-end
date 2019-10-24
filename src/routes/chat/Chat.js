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
      <div
        className="container testing"
        style={{
          paddingTop: 50
        }}
      >
        <div className="columns is-marginless">
          <div className="column">
            <div
              className="is-primary"
              style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: 'white',
                boxShadow: '0px 0px 20px 2px grey',
                marginRight: 20
              }}
            >
              <div className="container">
                <h1
                  className="is-size-4"
                  style={{
                    paddingTop: 40,
                    paddingLeft: 20,
                    color: '#595f6f'
                  }}
                >
                  Matches
                </h1>
                <hr style={{ backgroundColor: '#595f6f' }} />
                <div className="columns is-gapless">
                  <div className="column is-hidden-mobile is-two-fifths">
                    <div>
                      <ChatList />
                    </div>
                  </div>
                  <div className="column">
                    {chatRoomId === '' ? (
                      <div
                        style={{
                          textAlign: 'center',
                          paddingTop: 40,
                          fontSize: 20
                        }}
                      >
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
