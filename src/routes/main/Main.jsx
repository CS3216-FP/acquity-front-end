import React from 'react';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import { isSeller, isBuyer } from 'utils/userUtils';
import OngoingItems from './ongoingItems';
import RoundDetails from './roundDetails';
import CurrentMarketPrice from './currentMarketPrice';
import PrevRoundSummary from './prevRoundSummary/PrevRoundSummary';

import './Main.scss';

const renderUserOngoingItems = user => {
  const ongoingItems = [];
  if (isSeller(user)) {
    ongoingItems.push(
      <OngoingItems key="offers" type="offers" apiEndpoint="sell_order" />
    );
    ongoingItems.push(
      <div key="sell-divider" className="is-divider main__content__divider" />
    );
  }
  if (isBuyer(user)) {
    ongoingItems.push(
      <OngoingItems key="bids" type="bids" apiEndpoint="buy_order" />
    );
    ongoingItems.push(
      <div key="buy-divider" className="is-divider main__content__divider" />
    );
  }

  return ongoingItems;
};

const Main = () => {
  const user = useUser();
  const userOngoingItems = renderUserOngoingItems(user);

  return (
    <PageContainer>
      <div className="main page">
        <div className="page__content">
          {userOngoingItems}
          <OngoingItems type="bids" apiEndpoint="buy_order" />
          <div
            key="buy-divider"
            className="is-divider main__content__divider"
          />
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
