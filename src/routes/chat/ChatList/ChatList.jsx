import React from 'react';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import Moment from 'react-moment';
import differenceInHours from 'date-fns/differenceInHours';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatListAction, fetchChatRoomAction } from '../ChatDux';

import './ChatList.scss';

const ChatList = () => {
  const currentChatRoomId = useSelector(state => state.chat.chatRoomId);
  const chatList = useSelector(state => state.chat.chatList);

  const dispatch = useDispatch();

  const fetchChatList = React.useCallback(() => {
    dispatch(fetchChatListAction());
  }, [dispatch]);
  React.useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  const fetchChatRoom = React.useCallback(
    ({ chatRoomId }) => {
      dispatch(fetchChatRoomAction({ chatRoomId }));
    },
    [dispatch]
  );

  return (
    <div>
      {chatList.map(chat => (
        <div
          role="presentation"
          key={chat.chatRoomId}
          onClick={() => fetchChatRoom({ chatRoomId: chat.chatRoomId })}
          className="columns is-marginless chatlist__item"
          style={{
            backgroundColor:
              chat.chatRoomId === currentChatRoomId ? 'blue' : 'white',
            color: chat.chatRoomId === currentChatRoomId ? 'white' : 'black'
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
                className="chatlist__name"
                lines={1}
                ellipsis={<span>...</span>}
              >
                {chat.dealerName}
              </Truncate>
              <Truncate
                className="chatlist__date"
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
              className="chatlist__status"
              style={{
                backgroundColor: '#00FF7F'
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
