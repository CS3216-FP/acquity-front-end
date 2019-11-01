import React, { useEffect, useReducer, useState } from 'react';
import pluralize from 'pluralize';

import { useUser } from 'contexts/userContext';
import ApiService from 'services/apiService';
import { isUnapprovedBuyer } from 'utils/userUtils';
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
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isLoading: true,
    ongoingItems: []
  });

  useEffect(() => {
    ApiService.get(apiEndpoint).then(res => {
      const ongoingItems = res.data;
      ongoingItems.sort((a, b) => b.updatedAt - a.updatedAt);
      setState({ ongoingItems, isLoading: false });
    });
  }, [type, apiEndpoint]);

  return (
    <div className="info">
      <div className="info__header">
        Ongoing {pluralize(type, 1)} for{' '}
        <span className="info__header--company">Grab</span>{' '}
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
