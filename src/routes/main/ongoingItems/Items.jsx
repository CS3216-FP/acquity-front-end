import React from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

import OrderItem from 'components/orderItem';
import OrderItemGhost from 'components/orderItem/OrderItemGhost';

import './Items.scss';

const OngoingItems = ({ ongoingItems, type, loading }) => {
  if (loading) {
    return (
      <div className="ongoingItems">
        <div className="columns ongoingItems__orders is-marginless">
          <OrderItemGhost />
        </div>
      </div>
    );
  }

  return (
    <div className="ongoingItems">
      <div className="columns ongoingItems__orders is-marginless">
        {ongoingItems.length === 0 ? (
          <div className="ongoingItems__emptyText">
            You have no ongoing {pluralize(type, 1)}!
          </div>
        ) : (
          ongoingItems.map((item, i) => (
            <OrderItem
              className={ongoingItems.length > 1 ? 'column' : ''}
              key={item.id || i}
              item={item}
              actionLink={{ pathname: `/${type}/edit/${item.id}`, item }}
            />
          ))
        )}
      </div>
      <Link to={`${type}/new`}>
        <button
          disabled={
            (type === 'bids' && ongoingItems.length > 0) ||
            (type === 'offers' && ongoingItems.length > 1)
          }
          type="button"
          className="button button--cta hvr-grow info__button"
        >
          Create New {type}
        </button>
      </Link>
      <div className="ongoingItems__disclaimer">
        {type === 'bids' && ongoingItems.length > 0
          ? 'You can only have one bid per company for each round.'
          : ''}
        {type === 'offers' && ongoingItems.length > 1
          ? 'You can only post up to two offers for each round.'
          : ''}
      </div>
    </div>
  );
};

export default OngoingItems;
