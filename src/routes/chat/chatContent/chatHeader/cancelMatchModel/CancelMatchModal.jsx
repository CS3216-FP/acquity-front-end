import React from 'react';

import Modal from 'react-modal';
import 'assets/scss/modal.scss';

import './CancelMatchModal.scss';

const CancelMatchModal = ({ isModalOpen, handleCloseModal, handleConfirm }) => {
  return (
    <Modal
      className="modal__content"
      overlayClassName="modal__overlay"
      closeTimeoutMS={200}
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Cancel match chat modal"
    >
      <ModalContent />
      <div className="modal__actions">
        <button
          onClick={handleConfirm}
          type="button"
          className="button button--danger"
        >
          Yes, cancel match
        </button>
        <button
          className="as-non-button button cancelMatchModal__button--goBack"
          onClick={handleCloseModal}
          type="button"
          aria-label="cancel"
        >
          Go back
        </button>
      </div>
    </Modal>
  );
};

const ModalContent = () => {
  return (
    <div className="cancelMatchModal">
      <div className="modal__header details__header cancelMatchModal__header">
        Are you sure you want to cancel this match?
      </div>
      <div className="modal__text">
        Note that you will <b>not</b> be able to undo this action and{' '}
        <b>
          will not be matched with this individual again in subsequent rounds.
        </b>
      </div>
    </div>
  );
};

export default CancelMatchModal;
