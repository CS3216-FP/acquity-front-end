import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './CurrentMarketPrice.scss';

const CurrentMarketPriceGhost = () => {
  return (
    <div className="currentMarketPrice">
      <div className="details__header">Current market price</div>
      <div className="currentMarketPrice__price">
        <span className="currentMarketPrice__price--price">
          <Skeleton />
        </span>
      </div>
    </div>
  );
};

export default CurrentMarketPriceGhost;
