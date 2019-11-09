import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useSelector } from 'react-redux';

import Avatar from 'components/avatar';
import {
  getUserPrice,
  getUserNumberOfShares,
  getOtherPartyUserType
} from 'utils/userUtils';
import { toSgdCurrency } from 'utils/moneyUtils';
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
          <OtherPartyOffer chat={chat} />
        </div>
      </Link>
    </li>
  );
};

const OtherPartyOffer = ({ chat }) => {
  const {
    sellerPrice,
    buyerPrice,
    sellerNumberOfShares,
    buyerNumberOfShares
  } = chat;
  const userType = useSelector(state => state.misc.userType);
  const otherPartyUserType = getOtherPartyUserType({ userType });
  const price = getUserPrice({
    userType: otherPartyUserType,
    sellerPrice,
    buyerPrice
  });
  const numberOfShares = getUserNumberOfShares({
    userType: otherPartyUserType,
    buyerNumberOfShares,
    sellerNumberOfShares
  });
  return (
    <div className="detail__content">
      <div>
        {userType === 'seller' ? 'Selling' : 'Buying'} Amt: {numberOfShares}
      </div>
      <div>
        {userType === 'seller' ? 'Highest' : 'Lowest'} Price:{' '}
        {toSgdCurrency(price)}
      </div>
    </div>
  );
};

export default ChatRoom;
