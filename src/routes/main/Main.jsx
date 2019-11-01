import React from 'react';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import { isSeller } from 'utils/userUtils';
import OngoingItems from './ongoingItems';
import RoundDetails from './roundDetails';
import CurrentMarketPrice from './currentMarketPrice';
import PrevRoundSummary from './prevRoundSummary/PrevRoundSummary';

import './Main.scss';

const Main = () => {
  const user = useUser();

  return (
    <PageContainer>
      <div className="main page">
        <div className="page__content">
          {isSeller(user) && (
            <>
              <OngoingItems type="offers" apiEndpoint="sell_order" />
              <div className="is-divider main__content__divider" />
            </>
          )}
          <OngoingItems type="bids" apiEndpoint="buy_order" />
          <div className="is-divider main__content__divider" />
          <div className="details columns is-gapless is-multiline">
            <div className="details--left column is-narrow">
              <RoundDetails />
              <CurrentMarketPrice />
            </div>
            <div className="details--right column">
              <PrevRoundSummary />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
