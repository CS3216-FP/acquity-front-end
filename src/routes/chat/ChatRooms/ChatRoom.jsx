import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import './ChatRoom.scss';

const ChatRoom = ({ chat, basePath }) => {
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
        className={`chatroom__item columns is-marginless ${
          chat.chatRoomId === chatRoomId ? 'chatroom__item--selected' : ''
        }`}
        to={`${basePath}/${chat.chatRoomId}`}
      >
        <Avatar
          className="chatroom__item__avatar column is-narrow"
          userName={chat.friendlyName}
          diameter="3rem"
        />
        <div className="column chatroom__item__details">
          <div className="detail__header">
            <div className="detail__header--name">{chat.friendlyName}</div>
            <div className="detail__header--timeago">
              <TimeAgo date={chat.updatedAt} formatter={formatter} />
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

export default ChatRoom;
