import React, { useCallback, useEffect } from 'react';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import { useSelector, useDispatch } from 'react-redux';
import TimeAgo from 'react-timeago';

import { fetchChatListAction, fetchChatRoomAction } from '../ChatDux';
import './ChatList.scss';

const ChatItem = ({ chat }) => {
  const currentChatRoomId = useSelector(state => state.chat.chatRoomId);

  const dispatch = useDispatch();

  const fetchChatList = useCallback(() => {
    dispatch(fetchChatListAction());
  }, [dispatch]);
  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  const fetchChatRoom = useCallback(
    ({ chatRoomId }) => {
      dispatch(fetchChatRoomAction({ chatRoomId }));
    },
    [dispatch]
  );

  return (
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
          <Avatar color="grey" name={chat.dealerName} size={40} round="40px" />
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
            <TimeAgo
              title={(chat.createdAt * 1000).toLocaleString()}
              date={chat.createdAt * 1000}
            />
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
  );
};

export default ChatItem;
