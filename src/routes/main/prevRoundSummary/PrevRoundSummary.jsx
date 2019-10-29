import React, { useEffect, useReducer } from 'react';

import { addCommasToNumber } from 'utils';
import { toLocaleCurrency } from 'utils/moneyUtils';
import './PrevRoundSummary.scss';
import PrevRoundSummaryChart from './PrevRoundSummaryChart';
import PrevRoundSummaryGhost from './PrevRoundSummaryGhost';

const PrevRoundSummary = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    data: {}
  });

  useEffect(() => {
    setTimeout(() => {
      setState({
        isLoading: false,
        data: { avgPrice: '6.42', avgQuantity: '3000' }
      });
    }, 250);
  }, []);

  if (state.isLoading) {
    return <PrevRoundSummaryGhost />;
  }

  return (
    <div className="prevRoundSummary">
      <div className="details__header">Summary of previous round</div>
      <div className="columns is-gapless">
        <div className="column is-one-third">
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">
              Avg price per share
            </div>
            <div className="prevRoundSummary__data--value">
              {toLocaleCurrency(state.data.avgPrice)}
            </div>
          </div>
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">
              Avg quantity per trade
            </div>
            <div className="prevRoundSummary__data--value">
              {addCommasToNumber(state.data.avgQuantity)}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">Price History</div>
            <PrevRoundSummaryChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevRoundSummary;
