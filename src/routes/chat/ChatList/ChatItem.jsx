import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import './ChatItem.scss';

const ChatItem = ({ chat, basePath }) => {
  const { chatRoomId } = useParams();

  const formatter = (value, unit, _suffix) => {
    let shortenedUnit;
    switch (unit) {
      case 'second':
      case 'minute':
      case 'hour':
      case 'day':
      case 'week':
      case 'year':
        shortenedUnit = unit.charAt(0);
        break;
      case 'month':
        shortenedUnit = 'mo';
        break;
      default:
        shortenedUnit = unit;
    }
    return `${value}${shortenedUnit}`;
  };

  return (
    <li role="row">
      <Link
        className={`chatlist__item columns is-marginless ${
          chat.chatRoomId === chatRoomId ? 'chatlist__item--selected' : ''
        }`}
        to={`${basePath}/${chat.chatRoomId}`}
      >
        {/* TODO(#23): online status icon hardcoded */}
        {/* <div className={`chatlist__status ${'chatlist__status--online'}`} /> */}
        <Avatar
          className="chatlist__item__avatar column is-narrow"
          userName={chat.chatRoomId}
          diameter="3rem"
        />
        <div className="column chatlist__item__details">
          <div className="detail__header">
            <div className="detail__header--name">{chat.dealerId}</div>
            <div className="detail__header--timeago">
              <TimeAgo date={chat.createdAt * 1000} formatter={formatter} />
            </div>
          </div>
          {/* TODO: Remove hardcode */}
          <div className="detail__content">
            <div>Selling Amt: 2000</div>
            <div>Lowest Price: $6.10</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ChatItem;
