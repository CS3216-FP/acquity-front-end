import React, { useState } from 'react';
import Modal from 'react-modal';
import 'assets/scss/modal.scss';

const RevealIdentityDisclaimer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModalClick}
        className="modal__trigger as-non-button"
      >
        <i className="fas fa-question-circle" />
        <span className="modal__trigger--text">Why?</span>
      </button>
      <Modal
        className="modal__content"
        overlayClassName="modal__overlay"
        closeTimeoutMS={200}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Where do we get this value from modal"
      >
        <ModalContent handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

const ModalContent = ({ handleCloseModal }) => {
  return (
    <div className="revealIdentityModal">
      <div className="modal__header details__header">
        Why do I need to reveal my identity?
      </div>
      <div className="modal__text">
        <p>
          Acquity provides a private and effortless matching service for both
          buyers and sellers. Unfortunately, we are unable to facilitate the
          exchange any further than this, and the matched traders would have to
          continue this transaction offline.
        </p>
        <p>
          Once both parties have agreed to reveal their identities, both the
          buyer’s and the seller’s contact details will be revealed to each
          other. This includes the trader’s name and email address.
        </p>
      </div>
      <button
        onClick={handleCloseModal}
        type="button"
        className="delete is-large modal__close"
        aria-label="close"
      />
    </div>
  );
};

export default RevealIdentityDisclaimer;
