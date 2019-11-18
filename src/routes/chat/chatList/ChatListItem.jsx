import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import { toSgdCurrency } from 'utils/moneyUtils';
import './ChatListItem.scss';

const ChatListItem = ({ chat, basePath }) => {
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
          <div className="columns">
            <div className="column">
              <div className="detail__header--security">Grab match</div>
              <LatestOffer offer={chat.latestOffer} />
            </div>
            {!!chat.unreadCount && (
              <div className="column is-narrow chatroom__item__details--unread">
                <i className="fas fa-circle" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

const LatestOffer = ({ offer }) => {
  if (!offer) {
    return <div className="detail__content">No pending offers</div>;
  }

  const { price, numberOfShares } = offer;

  return (
    <div className="detail__content">
      {offer.offerStatus === 'ACCEPTED' && (
        <div className="detail__content__success">
          <span role="img" aria-label="Party popper emoji">
            🎉🎉
          </span>
          <span className="detail__content__success--text">
            Successful match
          </span>
          <span role="img" aria-label="Party popper emoji">
            🎉🎉
          </span>
        </div>
      )}
      <div>Offered Quantity: {numberOfShares}</div>
      <div>Offered Price: {toSgdCurrency(price)}</div>
    </div>
  );
};

export default ChatListItem;
