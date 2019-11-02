import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import ApiService from 'services/apiService';
import { addCommasToNumber } from 'utils';
import { toLocaleCurrency } from 'utils/moneyUtils';
import './PrevRoundSummary.scss';
import PrevRoundSummaryChart from './PrevRoundSummaryChart';
import PrevRoundSummaryGhost from './PrevRoundSummaryGhost';

const PrevRoundSummary = () => {
  const { currentSelectedBuySecurity } = useSelector(state => state.securities);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    data: {}
  });

  useEffect(() => {
    // TODO: Get chart timeline from backend when it's available
    if (currentSelectedBuySecurity) {
      ApiService.get(
        `/round/previous/statistics/${currentSelectedBuySecurity.id}`
      ).then(response => {
        setState({
          isLoading: false,
          data: response.data
        });
      });
    }
  }, [currentSelectedBuySecurity]);

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
              {state.data
                ? toLocaleCurrency(state.data.averagePrice)
                : 'No data'}
            </div>
          </div>
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">
              Avg quantity per trade
            </div>
            <div className="prevRoundSummary__data--value">
              {state.data
                ? addCommasToNumber(state.data.averageQuantity)
                : 'No data'}
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
