import React, { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';

import ApiService from 'services/apiService';
import { addCommasToNumber } from 'utils';
import { toCurrency } from 'utils/moneyUtils';
import './PrevRoundSummary.scss';
import PrevRoundSummaryChart from './PrevRoundSummaryChart';
import PrevRoundSummaryGhost from './PrevRoundSummaryGhost';

const PrevRoundSummary = () => {
  const { currentSelectedBuySecurity } = useSelector(state => state.securities);
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: true,
    data: {}
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const response = await ApiService.get(
          `/round/previous/statistics/${currentSelectedBuySecurity.id}`
        );
        if (!didCancel) {
          setState({
            isLoading: false,
            data: response.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };
    // TODO: Get chart timeline from backend when it's available
    if (currentSelectedBuySecurity) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
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
              {state.data ? toCurrency(state.data.averagePrice) : 'No data'}
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
            <div className="prevRoundSummary__chart">
              <PrevRoundSummaryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevRoundSummary;
