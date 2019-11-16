import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { useSelector } from 'react-redux';

import { SELLER } from 'constants/user';
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
        className={`chatroom__item columns is-mobile is-marginless ${
          chat.id === chatRoomId ? 'chatroom__item--selected' : ''
        }`}
        to={`${basePath}/${chat.id}`}
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
              <TimeAgo date={chat.updatedAt * 1000} formatter={formatter} />
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
  const otherPartyUserType = getOtherPartyUserType(userType);
  const price = getUserPrice(otherPartyUserType, sellerPrice, buyerPrice);
  const numberOfShares = getUserNumberOfShares(
    otherPartyUserType,
    sellerNumberOfShares,
    buyerNumberOfShares
  );
  return (
    <div className="detail__content">
      <div>
        {userType === SELLER ? 'Selling' : 'Buying'} Amt: {numberOfShares}
      </div>
      <div>
        {userType === SELLER ? 'Highest' : 'Lowest'} Price:{' '}
        {toSgdCurrency(price)}
      </div>
    </div>
  );
};

export default ChatRoom;
