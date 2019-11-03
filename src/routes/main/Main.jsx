import React from 'react';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import { isSeller, isBuyer } from 'utils/userUtils';
import OngoingOffers from './ongoingItems/ongoingOffers';
import OngoingBids from './ongoingItems/ongoingBids';
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
          {isSeller(user) && <OngoingOffers />}
          {isBuyer(user) && <OngoingBids />}
          <div className="details columns is-gapless is-multiline-desktop">
            <div className="details--left column is-one-third-desktop">
              <RoundDetails />
              <CurrentMarketPrice />
            </div>
            <div className="details--right column is-full is-two-thirds-desktop">
              <PrevRoundSummary />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
