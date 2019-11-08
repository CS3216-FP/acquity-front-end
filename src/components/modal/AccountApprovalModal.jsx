import React from 'react';
import Modal from 'react-modal';

const AccountApprovalModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      className="modal__content"
      overlayClassName="modal__overlay"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Why does my account need to be approved modal"
    >
      <ModalContent handleClose={handleClose} />
    </Modal>
  );
};

const ModalContent = ({ handleClose }) => {
  return (
    <div className="currentMarketPriceModal">
      <div className="modal__header details__header">
        Why does my account need to be approved?
      </div>
      <div className="modal__text">
        <p>
          Acquity places great emphasis on the trading experience - that means
          little to no time spent on dealing with non-serious buyers and
          sellers. Unfortunately, it also means checks need to be done.
        </p>
        <p>
          Don’t worry, our teams are just confirming that you are a real person!
          You will receive a notification once your account has been approved,
          and any bids you have made will automatically go through.
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

export default AccountApprovalModal;
