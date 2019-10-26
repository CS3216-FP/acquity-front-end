import React, { useCallback } from 'react';
import Avatar from 'react-avatar';
import Truncate from 'react-truncate';
import { useSelector, useDispatch } from 'react-redux';
import TimeAgo from 'react-timeago';

import { fetchChatRoomAction } from '../ChatDux';
import './ChatList.scss';

const ChatItem = ({ chat }) => {
  const currentChatRoomId = useSelector(state => state.chat.chatRoomId);

  const dispatch = useDispatch();

  const fetchChatRoom = useCallback(
    ({ chatRoomId }) => {
      dispatch(fetchChatRoomAction({ chatRoomId }));
    },
    [dispatch]
  );

  return (
    <div
      role="presentation"
      onClick={() => fetchChatRoom({ chatRoomId: chat.chatRoomId })}
      className={`columns is-marginless chatlist__item ${
        chat.chatRoomId === currentChatRoomId
          ? 'chatlist__item--selected'
          : 'chatlist__item--unselected'
      }`}
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
        {/* TODO(#23): online status icon hardcoded */}
        <div className={`chatlist__status ${'chatlist__status--online'}`} />
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
