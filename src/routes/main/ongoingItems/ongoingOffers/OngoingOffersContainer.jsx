import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUser } from 'contexts/userContext';
import ApiService from 'services/apiService';
import {
  updateSecurities,
  setCurrentSelectedSellSecurity
} from 'reducers/SecuritiesDux';
import { isUnapprovedSeller, isSeller } from 'utils/userUtils';
import InputDropdownSelect from 'components/inputDropdownSelect';
import ErrorMessage from 'components/errorMessage';
import 'assets/scss/modal.scss';

import OngoingOffers from './OngoingOffers';
import OfferWarning from './OfferWarning';
import NonSellerWarning from './NonSellerWarning';
import '../containerStyle.scss';
import './OngoingOffersContainer.scss';

const OngoingOffersContainer = () => {
  const user = useUser();

  const dispatch = useDispatch();
  const { securities, currentSelectedSellSecurity } = useSelector(
    state => state.securities
  );

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    ongoingOffers: []
  });

  const handleSelectSecurity = value => {
    dispatch(setCurrentSelectedSellSecurity(value[0]));
  };

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      const promises = [ApiService.get('security')];
      if (isSeller(user)) {
        promises.push(ApiService.get('sell_order'));
      }
      try {
        const responses = await Promise.all(promises);
        if (!didCancel) {
          dispatch(updateSecurities(responses[0].data));
          let ongoingOffers = [];
          if (isSeller(user)) {
            ongoingOffers = responses[1].data;
            ongoingOffers.sort((a, b) => b.updatedAt - a.updatedAt);
          }
          setState({ ongoingOffers, isLoading: false });
        }
      } catch (error) {
        if (!didCancel) {
          setState({ isLoading: false, isError: true });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [dispatch, user]);

  const renderContent = () => {
    // Prompt user to switch back to buyer role if they accidentally logged in as Seller
    if (!isSeller(user)) {
      return <NonSellerWarning />;
    }

    if (isUnapprovedSeller(user)) {
      return <OfferWarning />;
    }

    return (
      <OngoingOffers isLoading={state.isLoading} offers={state.ongoingOffers} />
    );
  };

  return (
    <div className="info">
      <div className="info__header">
        <span className="header--pretext">Ongoing Asks for&nbsp;</span>
        <span className="info__header--company">
          <InputDropdownSelect
            options={securities}
            useDefaultStyles={false}
            valueField="id"
            labelField="name"
            iconField="iconUrl"
            isLoading={state.isLoading}
            values={[currentSelectedSellSecurity]}
            onChange={handleSelectSecurity}
          />
        </span>
      </div>
      <div className="info__content">
        {state.isError && <ErrorMessage />}
        {renderContent()}
      </div>
      <div className="is-divider main__content__divider" />
    </div>
  );
};

export default OngoingOffersContainer;
