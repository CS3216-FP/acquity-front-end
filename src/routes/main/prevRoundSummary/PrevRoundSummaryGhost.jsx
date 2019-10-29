import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './PrevRoundSummary.scss';
import LoadingChart from './LoadingChart';

const PrevRoundSummaryGhost = () => {
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
              <Skeleton />
            </div>
          </div>
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">
              Avg quantity per trade
            </div>
            <div className="prevRoundSummary__data--value">
              <Skeleton />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="prevRoundSummary__data">
            <div className="prevRoundSummary__data--label">Price History</div>
            <LoadingChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevRoundSummaryGhost;
