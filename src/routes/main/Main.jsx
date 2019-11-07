import React from 'react';
import { useSelector } from 'react-redux';

import PageContainer from 'components/pageContainer';
import { SELLER, BUYER } from 'constants/user';

import OngoingOffers from './ongoingItems/ongoingOffers';
import OngoingBids from './ongoingItems/ongoingBids';
import RoundDetails from './roundDetails';
import CurrentMarketPrice from './currentMarketPrice';
import PrevRoundSummary from './prevRoundSummary/PrevRoundSummary';

import './Main.scss';

const Main = () => {
  const { userType } = useSelector(rootState => rootState.misc);

  return (
    <PageContainer>
      <div className="main page">
        <div className="page__content">
          {userType === SELLER && <OngoingOffers />}
          {userType === BUYER && <OngoingBids />}
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
