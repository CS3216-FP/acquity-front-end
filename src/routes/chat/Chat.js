import React from 'react';
import Moment from 'react-moment';

import ChatList from './ChatList/ChatList';
import ChatRoom from './ChatRoom/ChatRoom';
import ChatInput from './ChatInput/ChatInput';
import ChatOffer from './ChatOffer/ChatOffer';
import SocketResponseService from './SocketService/socketResponseService';

SocketResponseService.initialize();
Moment.startPooledTimer();

const Chat = ({ fetchChatList, chatList }) => {
  let data = [
    {
      chatRoomId: '1',
      dealerName: 'Dealer',
      dealerId: 'Dealer ID',
      createdAt: 4356346534.345,
      message: 'This is a message'
    }
  ];
  data = chatList;
  return (
    <div>
      <div
        className="container"
        style={{
          paddingTop: 50
        }}
      >
        <div className="columns">
          <div className="column">
            <div
              className="is-primary"
              style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: 'white',
                boxShadow: '0px 0px 20px 2px grey'
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
                      <ChatList onClick={() => fetchChatList(data)} />
                    </div>
                  </div>
                  <div className="column">
                    <div>
                      <ChatOffer />
                      <ChatRoom />
                      <ChatInput />
                    </div>
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
