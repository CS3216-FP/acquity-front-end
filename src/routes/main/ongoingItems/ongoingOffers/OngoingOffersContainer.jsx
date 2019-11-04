import React, { useEffect, useReducer, useState } from 'react';
import pluralize from 'pluralize';
import { useDispatch, useSelector } from 'react-redux';

import { useUser } from 'contexts/userContext';
import ApiService from 'services/apiService';
import {
  updateSecurities,
  setCurrentSelectedSellSecurity
} from 'reducers/SecuritiesDux';
import { isUnapprovedSeller } from 'utils/userUtils';
import InputDropdownSelect from 'components/inputDropdownSelect';
import AccountApprovalModal from 'components/modal/AccountApprovalModal';
import ErrorMessage from 'components/errorMessage';
import 'assets/scss/modal.scss';

import '../containerStyle.scss';
import './OngoingOffersContainer.scss';
import OngoingOffers from './OngoingOffers';

const OfferWarning = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ongoingItems ongoingOffers">
      <div className="ongoingItems__orders is-marginless">
        <div className="ongoingOffers__warning">
          You cannot place offers until your account has been approved.
        </div>
        <button
          onClick={handleOpenModalClick}
          type="button"
          className="modal__trigger as-non-button"
        >
          <span className="icon">
            <i className="fas fa-question-circle" />
          </span>
          <span className="modal__trigger--text">
            Why does my account need to be approved?
          </span>
        </button>
      </div>
      <button
        disabled
        type="button"
        className="button button--cta hvr-grow info__button ongoingOffers__warning__button"
      >
        Create New Offer
      </button>
      <AccountApprovalModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

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
      try {
        const responses = await Promise.all([
          ApiService.get('sell_order'),
          ApiService.get('security')
        ]);
        if (!didCancel) {
          const ongoingOffers = responses[0].data;
          ongoingOffers.sort((a, b) => b.updatedAt - a.updatedAt);
          dispatch(updateSecurities(responses[1].data));
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
  }, [dispatch]);

  return (
    <div className="info">
      <div className="info__header">
        <span className="header--pretext">
          Ongoing {pluralize('Ask', state.ongoingOffers.length)} for&nbsp;
        </span>
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
        {isUnapprovedSeller(user) ? (
          <OfferWarning />
        ) : (
          <OngoingOffers
            isLoading={state.isLoading}
            offers={state.ongoingOffers}
          />
        )}
      </div>
      <div className="is-divider main__content__divider" />
    </div>
  );
};

export default OngoingOffersContainer;
