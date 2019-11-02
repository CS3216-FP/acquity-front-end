import React from 'react';
import Modal from 'react-modal';

import 'assets/scss/modal.scss';

const LinkedInModal = ({ isOpen, handleClose }) => {
  return (
    <Modal
      className="modal__content"
      overlayClassName="modal__overlay"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Why do we only use LinkedIn to login modal"
    >
      <ModalContent handleClose={handleClose} />
    </Modal>
  );
};

const ModalContent = ({ handleClose }) => {
  return (
    <div className="linkedInModal">
      <div className="modal__header details__header">Why LinkedIn?</div>
      <div className="modal__text">
        Here at Acquity, we are looking to provide a smooth experience for our
        users. As such, we require both buyers and sellers alike to link their
        LinkedIn profiles for greater assurance of identity.
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

export default LinkedInModal;
