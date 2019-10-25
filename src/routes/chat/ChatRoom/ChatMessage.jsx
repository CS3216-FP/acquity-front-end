import React from 'react';
import Avatar from 'react-avatar';
import TimeAgo from 'react-timeago';

import './ChatRoom.scss';

const ChatMessage = ({ chat }) => {
  return (
    <div key={chat.createdAt} className="columns is-marginless is-mobile">
      <div className="column">
        <div className="columns is-mobile chatroom__window">
          <div className="column is-2">
            <div>
              <Avatar color="grey" name="Bar" size={40} round="40px" />
            </div>
          </div>
          <div className="column">
            <div className="columns is-marginless is-mobile">
              <div className="column is-8">{chat.authorName}</div>
              <div className="column chatroom__date">
                <TimeAgo
                  title={(chat.createdAt * 1000).toLocaleString()}
                  date={chat.createdAt * 1000}
                />
              </div>
            </div>
            <div className="column">
              <div>{chat.message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
