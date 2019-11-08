import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import { setUserType } from 'reducers/MiscDux';
import { BUYER } from 'constants/user';

const NonSellerWarning = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSwitchToBuyer = () => {
    dispatch(setUserType(BUYER));
  };

  return (
    <div className="ongoingItems ongoingOffers">
      <div className="ongoingItems__orders is-marginless">
        <div className="ongoingOffers__warning">
          Not a seller. Did you log in as seller accidentally?
        </div>
        <button
          onClick={handleOpenModalClick}
          type="button"
          className="modal__trigger as-non-button"
        >
          <span className="icon">
            <i className="fas fa-question-circle" />
          </span>
          <span className="modal__trigger--text">I signed up as a seller</span>
        </button>
      </div>
      <button
        type="button"
        onClick={handleSwitchToBuyer}
        className="button button--cta hvr-grow info__button ongoingOffers__warning__button"
      >
        Switch back to buyer mode
      </button>
      <NonSellerWarningModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

const NonSellerWarningModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      className="modal__content"
      overlayClassName="modal__overlay"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="I signed up as a seller modal"
    >
      <ModalContent handleClose={handleClose} />
    </Modal>
  );
};

const ModalContent = ({ handleClose }) => {
  return (
    <div className="currentMarketPriceModal">
      <div className="modal__header details__header">
        Why am I not a seller even when I signed up as a seller?
      </div>
      <div className="modal__text">
        <p>
          Acquity is only concentrating on Grab private equity sellers for now.
          The committee team might have rejected your bid to be a seller as they
          could not verify that you are holding on to Grab equity.
        </p>
        <p>
          For now, we have updated your account to be that of a buyer. Feel free
          to put up bids if you want to join the next round!
        </p>
      </div>
      <button
        onClick={handleClose}
        type="button"
        className="delete is-large modal__close"
        aria-label="close"
      />
    </div>
  );
};

export default NonSellerWarning;
