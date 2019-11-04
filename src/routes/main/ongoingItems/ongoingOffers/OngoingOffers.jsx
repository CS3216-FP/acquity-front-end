import React from 'react';
import { Link } from 'react-router-dom';

import { OFFERS } from 'constants/routes';
import OrderItem from 'components/orderItem';
import OrderItemGhost from 'components/orderItem/OrderItemGhost';

import '../itemStyle.scss';

const renderOffers = (offers = [], isLoading) => {
  if (isLoading) {
    return <OrderItemGhost />;
  }
  if (offers.length === 0) {
    return (
      <div className="ongoingItems__emptyText">You have no ongoing asks!</div>
    );
  }
  return offers.map((item, i) => (
    <OrderItem
      className={offers.length > 1 ? 'column' : ''}
      key={item.id || i}
      item={item}
      actionLink={{ pathname: `${OFFERS}/edit/${item.id}`, item }}
    />
  ));
};

// Default isLoading to true to easier catch bugs, force isLoading to be passed in
const OngoingOffers = ({ offers, isLoading = true }) => {
  return (
    <div className="ongoingItems">
      <div className="columns ongoingItems__orders columns is-marginless">
        {renderOffers(offers, isLoading)}
      </div>
      <Link to={`${OFFERS}/new`}>
        <button
          disabled={isLoading || offers.length > 1}
          type="button"
          className="button button--cta hvr-grow info__button"
        >
          Create New Ask
        </button>
      </Link>
      {offers.length > 1 && (
        <div className="ongoingItems__disclaimer">
          You can only post up to two asks for each round.
        </div>
      )}
    </div>
  );
};

export default OngoingOffers;
