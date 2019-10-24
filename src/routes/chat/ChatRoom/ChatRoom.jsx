import React from 'react';
import Avatar from 'react-avatar';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';
import { useSelector } from 'react-redux';

import './ChatRoom.scss';

const ChatList = () => {
  const chatRoom = useSelector(state => state.chat.chatRoom);

  return (
    <div>
      {chatRoom.map(chat => (
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
                  </div>
                </div>
                <div className="column">
                  <div>{chat.message}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
