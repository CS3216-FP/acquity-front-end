import React, { useEffect, useReducer, useState } from 'react';
import pluralize from 'pluralize';
import { useDispatch, useSelector } from 'react-redux';

import { useUser } from 'contexts/userContext';
import ApiService from 'services/apiService';
import {
  updateSecurities,
  setCurrentSelectedBuySecurity,
  setCurrentSelectedSellSecurity
} from 'reducers/SecuritiesDux';
import { isUnapprovedBuyer } from 'utils/userUtils';
import InputDropdownSelect from 'components/inputDropdownSelect';
import AccountApprovalModal from 'components/modal/AccountApprovalModal';
import 'assets/scss/modal.scss';

import Items from './Items';
import './OngoingItemsContainer.scss';

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

const OngoingItemsContainer = ({ type, apiEndpoint }) => {
  const user = useUser();

  const dispatch = useDispatch();
  const {
    securities,
    currentSelectedBuySecurity,
    currentSelectedSellSecurity
  } = useSelector(state => state.securities);

  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingItems: []
  });

  const handleSelectSecurity = value => {
    if (type === 'bids') {
      dispatch(setCurrentSelectedBuySecurity(value[0]));
    } else {
      dispatch(setCurrentSelectedSellSecurity(value[0]));
    }
  };

  useEffect(() => {
    Promise.all([ApiService.get(apiEndpoint), ApiService.get('security/')])
      .then(responses => {
        const ongoingItems = responses[0].data;
        ongoingItems.sort((a, b) => b.updatedAt - a.updatedAt);
        dispatch(updateSecurities(responses[1].data));
        setState({ ongoingItems, isLoading: false });
      })
      .catch(() => {
        setState({ isLoading: false, hasError: true });
      });
  }, [type, apiEndpoint, dispatch]);

  return (
    <div className="info">
      <div className="info__header">
        <span className="header--pretext">
          Ongoing {pluralize(type, 1)} for&nbsp;
        </span>
        <span className="info__header--company">
          <InputDropdownSelect
            options={securities}
            useDefaultStyles={false}
            valueField="id"
            labelField="name"
            iconField="iconUrl"
            isLoading={state.isLoading}
            values={
              type === 'bids'
                ? [currentSelectedBuySecurity]
                : [currentSelectedSellSecurity]
            }
            onChange={handleSelectSecurity}
          />
        </span>{' '}
      </div>
      {isUnapprovedBuyer(user) && type === 'bids' && <BidWarning />}
      <div className="info__content">
        <Items
          type={type}
          loading={state.isLoading}
          ongoingItems={state.ongoingItems}
        />
      </div>
    </div>
  );
};

export default OngoingItemsContainer;
