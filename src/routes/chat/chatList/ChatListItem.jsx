import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Avatar from 'components/avatar';
import { toCurrency } from 'utils/moneyUtils';
import './ChatListItem.scss';

const ChatListItem = ({ chat, basePath }) => {
  const { chatRoomId } = useParams();
  const {
    id,
    friendlyName,
    updatedAt,
    latestOffer,
    disbandInfo,
    unreadCount
  } = chat;

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
          id === chatRoomId ? 'chatroom__item--selected' : ''
        }`}
        to={`${basePath}/${id}`}
      >
        <Avatar
          className="chatroom__item__avatar column is-narrow"
          userName={friendlyName}
          diameter="3rem"
        />
        <div className="column chatroom__item__details">
          <div className="detail__header">
            <div className="detail__header--name">{friendlyName}</div>
            <div className="detail__header--timeago">
              <TimeAgo date={updatedAt * 1000} formatter={formatter} />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="detail__header--security">Grab match</div>
              {disbandInfo && <CancelledMatch />}
              <LatestOffer offer={latestOffer} />
            </div>
            {!!unreadCount && (
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

const CancelledMatch = () => {
  return (
    <div className="detail__content">
      <div className="detail__content__danger">
        <span className="detail__content__danger--text">Match cancelled</span>
      </div>
    </div>
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
      <div>Offered Price: {toCurrency(price)}</div>
    </div>
  );
};

export default ChatListItem;
