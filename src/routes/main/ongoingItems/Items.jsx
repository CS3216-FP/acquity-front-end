import React from 'react';
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
        <div className="ongoingItems__emptyText">
          You have no ongoing {type}!
        </div>
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
