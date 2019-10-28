import React, { useReducer, useEffect } from 'react';

import CurrentMarketPriceGhost from './CurrentMarketPriceGhost';
import './CurrentMarketPrice.scss';

const CurrentMarketPrice = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    marketPrice: null
  });

  // TODO: hook up to backend to get current selected security's current market price.
  useEffect(() => {
    setTimeout(() => {
      setState({ isLoading: false, marketPrice: '6.18' });
    }, 250);
  }, []);

  if (state.isLoading) {
    return <CurrentMarketPriceGhost />;
  }

  return (
    <div className="currentMarketPrice">
      <div className="details__header">Current market price</div>
      <div className="currentMarketPrice__price">
        <span className="currentMarketPrice__price--price">
          SGD {state.marketPrice}
        </span>
        <span className="currentMarketPrice__price--label">/share</span>
      </div>
    </div>
  );
};

export default CurrentMarketPrice;
