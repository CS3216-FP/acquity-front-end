import React, { useEffect, useReducer, useState } from 'react';
import pluralize from 'pluralize';
import { useDispatch, useSelector } from 'react-redux';

import { useUser } from 'contexts/userContext';
import ApiService from 'services/apiService';
import {
  updateSecurities,
  setCurrentSelectedBuySecurity
} from 'reducers/SecuritiesDux';
import { isUnapprovedBuyer } from 'utils/userUtils';
import InputDropdownSelect from 'components/inputDropdownSelect';
import AccountApprovalModal from 'components/modal/AccountApprovalModal';
import ErrorMessage from 'components/errorMessage';
import 'assets/scss/modal.scss';

import OngoingBids from './OngoingBids';
import '../containerStyle.scss';
import './OngoingBidsContainer.scss';

const BidWarning = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <article className="bidWarning message is-warning">
      <div className="message-body">
        <div className="bidWarning__message">
          Your bid will not be considered in the round until your account has
          been approved.
        </div>
        <div className="bidWarning__info">
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
      </div>
      <AccountApprovalModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
    </article>
  );
};

const OngoingBidsContainer = () => {
  const user = useUser();

  const dispatch = useDispatch();
  const { securities, currentSelectedBuySecurity } = useSelector(
    state => state.securities
  );

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    isError: false,
    ongoingBids: []
  });

  const handleSelectSecurity = value => {
    dispatch(setCurrentSelectedBuySecurity(value[0]));
  };

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          ApiService.get('buy_order'),
          ApiService.get('security')
        ]);
        if (!didCancel) {
          const ongoingBids = responses[0].data;
          ongoingBids.sort((a, b) => b.updatedAt - a.updatedAt);
          dispatch(updateSecurities(responses[1].data));
          setState({ ongoingBids, isLoading: false });
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
          Ongoing {pluralize('Bid', state.ongoingBids.length)} for&nbsp;
        </span>
        <span className="info__header--company">
          <InputDropdownSelect
            options={securities}
            useDefaultStyles={false}
            valueField="id"
            labelField="name"
            iconField="iconUrl"
            isLoading={state.isLoading}
            values={[currentSelectedBuySecurity]}
            onChange={handleSelectSecurity}
          />
        </span>{' '}
      </div>
      {isUnapprovedBuyer(user) && <BidWarning />}
      <div className="info__content">
        {state.isError && <ErrorMessage />}
        <OngoingBids isLoading={state.isLoading} bids={state.ongoingBids} />
      </div>
      <div className="is-divider main__content__divider" />
    </div>
  );
};

export default OngoingBidsContainer;
