import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './OrderItemGhost.scss';

const OrderItemGhost = () => {
  return (
    <div className="item">
      <div className="item__header">
        <span className="item__header__info item__header__info--ghost">
          <Skeleton />
        </span>
        <span className="item__header__timestamp item__header__timestamp--ghost">
          <Skeleton />
        </span>
      </div>
      <div className="columns is-mobile">
        <div className="item__content column">
          <div className="columns">
            <div className="item__details column">
              <span className="item__details__label">Quantity:</span>
              <span className="item__details__value">
                <Skeleton />
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Price:</span>
              <span className="item__details__value">
                <Skeleton />
              </span>
            </div>
            <div className="item__details column">
              <span className="item__details__label">Estimated total:</span>
              <span className="item__details__value">
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-narrow item__actionButton">
          <Skeleton circle height="2rem" width="2rem" />
        </div>
      </div>
    </div>
  );
};

export default OrderItemGhost;
