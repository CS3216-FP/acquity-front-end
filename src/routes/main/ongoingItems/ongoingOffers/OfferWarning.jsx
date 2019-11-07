import React, { useState } from 'react';

import AccountApprovalModal from 'components/modal/AccountApprovalModal';

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

export default OfferWarning;
