import React from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';

import OrderItem from 'components/orderItem';
import OrderItemGhost from 'components/orderItem/OrderItemGhost';

import './Items.scss';

const OngoingItems = ({ ongoingItems, type, loading }) => {
  if (loading) {
    return <OrderItemGhost />;
  }

  return (
    <div className="ongoingItems">
      {ongoingItems.length === 0 ? (
        <>
          <div className="ongoingItems__emptyText">
            You have no ongoing {pluralize(type, 1)}!
          </div>
          <Link to={`${type}/new`}>
            <button
              type="button"
              className="button button--cta hvr-grow info__button"
            >
              Create New {type}
            </button>
          </Link>
        </>
      ) : (
        ongoingItems.map((item, i) => (
          <OrderItem
            key={item.id || i}
            item={item}
            actionLink={{ pathname: `/${type}/edit/${item.id}`, item }}
          />
        ))
      )}
    </div>
  );
};

export default OngoingItems;
