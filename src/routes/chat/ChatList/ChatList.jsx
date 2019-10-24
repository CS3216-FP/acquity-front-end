import React from 'react';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';

import './ChatList.scss';

const ChatList = ({ chatList, fetchChatRoom, chatRoomId }) => {
  return (
    <div>
      {chatList.map(chat => (
        <div
          role="presentation"
          key={chat.chatRoomId}
          onClick={() => fetchChatRoom({ chatRoomId: chat.chatRoomId })}
          className="columns is-marginless"
          style={{
            height: 150,
            backgroundColor: chat.chatRoomId === chatRoomId ? 'blue' : 'white',
            color: chat.chatRoomId === chatRoomId ? 'white' : 'black',
            paddingLeft: 10,
            paddingRight: 20,
            paddingTop: 10
          }}
        >
          <div className="column is-one-fifth">
            <div>
              <Avatar
                color="grey"
                name={chat.dealerName}
                size={40}
                round="40px"
              />
            </div>
          </div>
          <div className="column">
            <div>
              <Truncate
                style={{ fontWeight: 'bold' }}
                lines={1}
                ellipsis={<span>...</span>}
              >
                {chat.dealerName}
              </Truncate>
              <Truncate
                style={{ fontSize: 14, float: 'right' }}
                lines={1}
                ellipsis={<span>...</span>}
              >
                {differenceInHours(
                  new Date(),
                  new Date(chat.createdAt * 1000)
                ) >= 24 ? (
                  <Moment format="D MMM YYYY" withTitle>
                    {new Date(chat.createdAt * 1000).toDateString()}
                  </Moment>
                ) : (
                  <Moment fromNow>{new Date(chat.createdAt * 1000)}</Moment>
                )}
              </Truncate>
            </div>
            <div
              style={{
                float: 'right',
                height: 10,
                width: 10,
                backgroundColor: '#00FF7F',
                borderRadius: 10
              }}
            />
            <div>Selling Amt: 2000</div>
            <div>Lowest Prices: $6.10</div>
            <div>
              <Truncate lines={1} ellipsis={<span>...</span>}>
                {chat.message}
              </Truncate>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
