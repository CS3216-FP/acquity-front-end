import React from 'react';
import { Link } from 'react-router-dom';

import { BIDS } from 'constants/routes';
import OrderItem from 'components/orderItem';
import OrderItemGhost from 'components/orderItem/OrderItemGhost';

import '../itemStyle.scss';

const renderBids = (bids = [], isLoading) => {
  if (isLoading) {
    return <OrderItemGhost />;
  }
  if (bids.length === 0) {
    return (
      <div className="ongoingItems__emptyText">You have no ongoing bids!</div>
    );
  }
  return bids.map((item, i) => (
    <OrderItem
      className={bids.length > 1 ? 'column' : ''}
      key={item.id || i}
      item={item}
      actionLink={{ pathname: `/${BIDS}/edit/${item.id}`, item }}
    />
  ));
};

const OngoingBids = ({ bids, isLoading = true }) => {
  return (
    <div className="ongoingItems">
      <div className="columns ongoingItems__orders is-marginless">
        {renderBids(bids, isLoading)}
      </div>
      <Link to={`${BIDS}/new`}>
        <button
          disabled={isLoading || bids.length > 0}
          type="button"
          className="button button--cta hvr-grow info__button"
        >
          Create New Bid
        </button>
      </Link>
      {bids.length > 0 && (
        <div className="ongoingItems__disclaimer">
          You can only have one bid per company for each round
        </div>
      )}
    </div>
  );
};

export default OngoingBids;
